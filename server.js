/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Gustavo Balardin Chiari Student ID: 122323249 Date: 07/09/2025
*  
*  Published URL: https://a3-black.vercel.app/
*
********************************************************************************/

const projectData = require("./modules/projects");
const sectorData = require('./public/data/sectorData.json');
const express = require('express');
const path = require('path');
require('pg');
const Sequelize = require('sequelize');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

const HTTP_PORT = process.env.PORT || 8080;

app.get('/projects', (req, res) => {
  projectData.getAllProjects()
    .then(projects => res.render("projects", { projects, page: "/solutions/projects" }))
    .catch(err => res.status(500).send("Error loading projects."));
});
projectData.Initialize()
    .then(() => {
        console.log(`Initialize() completed successfully`);
        app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
    })
    .catch(err => {
        console.error("unable to invoke Initialize()", err);
    });

//GET "/"
app.get("/", (req, res) => {
    res.render("home");
});

//GET "/about"
app.get("/about", (req, res) => {
    res.render("about");
});

const sectorMap = sectorData.reduce((map, sector) => {
  map[sector.id] = sector.sector_name;
  return map;
}, {});


// GET "/solutions/projects"
app.get('/solutions/projects', (req, res) => {
    const sector = req.query.sector;
    if (sector) {
        projectData.getProjectsBySector(sector)
            .then(projects => { projects.forEach(p => { 
                p.sector = sectorMap[p.sector_id];
            });
        
            res.render("projects", { projects });
        })
            .catch(err => res.status(404).render("404", {message: `No projects found for sector "${sector}"`}));
    } else {
        projectData.getAllProjects()
            .then(projects => { projects.forEach(p => {
                p.sector = sectorMap[p.sector_id];
        });

        res.render("projects", { projects });
    })      
      .catch(err => res.status(404).render("404", {message: `I'm sorry, no projects found for sector "${sector}"`}));
    }
});

//GET "/solutions/projects/:id"
app.get("/solutions/projects/:id", (req, res) => {
  const projectID = req.params.id;
  projectData.getProjectById(projectID)
    .then((project) => {
      res.render("project", { project, page: "/solutions/projects" });
    })
    .catch(err => {
      res.status(404).render("404", {message: `I'm sorry, no project found with the "${projectID}" ID`});
    });
});

// 404 route
app.use((req, res) => {
    res.status(404).render("404", {message: "I'm sorry, we're unable to find what you're looking for"});
});