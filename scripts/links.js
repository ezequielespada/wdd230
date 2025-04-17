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
      const p = document.createElement("p"); 
      const strong = document.createElement("strong");
      strong.textContent = `${week.week}: `;
      p.appendChild(strong);
  
      week.links.forEach((link, index) => {
        const a = document.createElement("a");
        a.href = baseURL + link.url;
        a.textContent = link.title;
        a.target = "_blank";
        a.classList.add("activity-link");
        p.appendChild(a);
  
        if (index < week.links.length - 1) {
          p.appendChild(document.createTextNode(", "));
        }
      });
  
      activitySection.appendChild(p);
    });
  }
  

getLinks();
