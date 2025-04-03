document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = "Last modified: " + document.lastModified;

const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
});

const modeButton = document.querySelector("#mode");
const body = document.body;

modeButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        modeButton.textContent = "🔆";
    } else {
        modeButton.textContent = "🕶️";
    }
});

const visitsDisplay = document.getElementById("visits");

let numVisits = Number(localStorage.getItem("visits-ls")) || 0;
numVisits++;
localStorage.setItem("visits-ls", numVisits);
visitsDisplay.textContent = numVisits;

