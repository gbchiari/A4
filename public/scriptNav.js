document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/sectorData.json')
    .then(response => response.json())
    .then(sectors => {
      const dropdown = document.getElementById('sectorDropdownList');
      if (!dropdown) return;
      sectors.slice(1, 4).forEach(sector => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `/projects?sector=${sector.sector_name.replace(/\s+/g, '-').toLowerCase()}`;
        a.textContent = sector.sector_name;
        li.appendChild(a);
        dropdown.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error trying to access sectorData.json:', error);
    });
});