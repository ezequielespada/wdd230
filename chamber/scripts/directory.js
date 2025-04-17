const url = "data/members.json";
const container = document.getElementById("membersContainer");
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");

fetch(url)
  .then(response => response.json())
  .then(data => displayMembers(data.members));

function displayMembers(members) {
  container.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visitar sitio</a>
      <p class="membership">${member.membership} Member</p>
      <p>${member.description}</p>
    `;

    container.appendChild(card);
  });
}

function displayListView(members) {
    container.innerHTML = "";
  
    const table = document.createElement("table");
    table.classList.add("member-table");
  
    // Cabecera
    const header = document.createElement("thead");
    header.innerHTML = `
      <tr>
        <th>Nombre</th>
        <th>Dirección</th>
        <th>Teléfono</th>
        <th>Sitio Web</th>
      </tr>
    `;
    table.appendChild(header);
  
    // Cuerpo de tabla
    const tbody = document.createElement("tbody");
  
    members.forEach((member, index) => {
      if (!member.name) return;

      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${member.name}</td>
        <td>${member.address}</td>
        <td>${member.phone}</td>
        <td><a href="${member.website}" target="_blank">Visitar</a></td>
      `;
  
      tbody.appendChild(row);
    });
  
    table.appendChild(tbody);
    container.appendChild(table);
}
  

// Toggle de vistas
gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
    fetch(url)
      .then(response => response.json())
      .then(data => displayMembers(data.members));
  });
  
  listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
    fetch(url)
      .then(response => response.json())
      .then(data => displayListView(data.members));
  });
  