const projectData = require("../public/data/projectData");
const sectorData = require("../public/data/sectorData");

let projects = [];

function Initialize() {
    return new Promise((resolve, reject) => {

        try {
            projectData.forEach(project => {
                let matchingSector = sectorData.find(sector => sector.id === project.sector_id);

                let newProject = {
                    ...project,
                    sector: matchingSector.sector_name
                };

                projects.push(newProject);
            });

            resolve('Initialize() resolved');

        } catch (error) {
            reject('unable to Initialize()');
        }
    });
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects);
        } else {
            reject('the projects array is empty');
        }
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {

        let projectByID = projects.find(project => Number(projectId) === Number(project.id));

        if (projectByID) {
            resolve(projectByID);
        } else {
            reject('getProjectById(): unable to find requested project');
        }
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {

        let projectBySector = projects.filter(project =>
            project.sector.toUpperCase() === sector.toUpperCase());

        if (projectBySector.length > 0) {
            resolve(projectBySector);
        } else {
            reject('getProjectBySector(): unable to find requested project');
        }
    });
}

module.exports = { Initialize, getAllProjects, getProjectById, getProjectsBySector };