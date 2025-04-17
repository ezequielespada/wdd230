const baseURL = "https://ezequielespada.github.io/wdd230/";
const linksURL = `${baseURL}data/links.json`;

async function getLinks() {
  const response = await fetch(linksURL);
  const data = await response.json();
  displayLinks(data.weeks); 
}

function displayLinks(weeks) {
  const activitySection = document.querySelector("#activity-links");
  if (!activitySection) return;

  weeks.forEach(week => {
    const weekTitle = document.createElement("h3");
    weekTitle.textContent = week.week;

    const ul = document.createElement("ul");

    week.links.forEach(link => {
      const li = document.createElement("li");
      const a = document.createElement("a");

      // Verifica si la URL es absoluta
      a.href = link.url.startsWith("http") ? link.url : baseURL + link.url;
      a.textContent = link.title;
      a.target = "_blank";
      li.appendChild(a);
      ul.appendChild(li);
    });

    activitySection.appendChild(weekTitle);
    activitySection.appendChild(ul);
  });
}

getLinks();
