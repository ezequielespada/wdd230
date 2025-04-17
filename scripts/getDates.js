document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = "Last modified: " + document.lastModified;

const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
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

// Mostrar valor del rango en vivo
const range = document.getElementById("rating");
const output = document.getElementById("ratingValue");
range.addEventListener("input", () => {
  output.textContent = range.value;
});
// Validar contraseñas iguales
const form = document.getElementById("mainForm");
form.addEventListener("submit", (e) => {
  const pwd = document.getElementById("password");
  const confirm = document.getElementById("confirm");
  if (pwd.value !== confirm.value) {
    e.preventDefault();
    alert("Las contraseñas no coinciden. Intenta nuevamente.");
    pwd.value = "";
    confirm.value = "";
    pwd.focus();
  }
});