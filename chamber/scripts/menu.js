document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("lastModified").textContent = document.lastModified;

    const mainnav = document.querySelector('.navigation');
    const hambutton = document.querySelector('#menu');

    hambutton.addEventListener('click', () => {
        mainnav.classList.toggle('show');
        hambutton.classList.toggle('show');
    });

    // VISITA ANTERIOR - localStorage
    const messageEl = document.getElementById("visitMessage");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        messageEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const difference = now - lastVisit;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        if (days === 0) {
            messageEl.textContent = "Back so soon! Awesome!";
        } else if (days === 1) {
            messageEl.textContent = "You last visited 1 day ago.";
        } else {
            messageEl.textContent = `You last visited ${days} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);

    // CALENDARIO
	const calendarEl = document.getElementById("calendar");
	const today = new Date();
	const currentDay = today.getDate();
	const currentMonth = today.getMonth();
	const currentYear = today.getFullYear();
	
	// Día de la semana del 1° del mes
	const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 (Dom) a 6 (Sáb)
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	
	// Opcional: nombres de días
	const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
	dayNames.forEach(day => {
	  const dayEl = document.createElement('li');
	  dayEl.textContent = day;
	  dayEl.classList.add('day-name');
	  calendarEl.appendChild(dayEl);
	});
	
	// Espacios en blanco para alinear el primer día
	for (let i = 0; i < firstDay; i++) {
	  const emptyCell = document.createElement('li');
	  emptyCell.classList.add('empty');
	  calendarEl.appendChild(emptyCell);
	}
	
	// Generar los días
	for (let day = 1; day <= daysInMonth; day++) {
	  const li = document.createElement('li');
	  li.textContent = day;
	  if (day === currentDay) {
		li.classList.add('today');
	  }
	  calendarEl.appendChild(li);
	}
	
	
});

document.getElementById("timestamp").value = new Date().toISOString();

