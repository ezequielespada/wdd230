document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("lastModified").textContent = document.lastModified;
});

const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
});
