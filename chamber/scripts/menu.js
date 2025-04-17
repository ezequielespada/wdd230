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

    // Verificacion CALENDARIO
	const calendarEl = document.getElementById("calendar");

	if (calendarEl) {
		dayNames.forEach(day => {
			const dayEl = document.createElement('li');
			dayEl.textContent = day;
			dayEl.classList.add('day-name');
			calendarEl.appendChild(dayEl);
		});
	
	    // código del calendario...
	
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
	}

	const currentTemp = document.querySelector('#current-temp');
	const weatherIcon = document.querySelector('#weather-icon');
	const captionDesc = document.querySelector('figcaption');

	const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-34.84&lon=-58.38&units=metric&appid=c90e5232f5eb9f25193687186a14f7bc';

	async function apiFetch() {
	    try {
	        const response = await fetch(url);
	        if (response.ok) {
	          const data = await response.json();
	          console.log(data); // ver en consola
	          displayResults(data);
			} else {
			  throw Error(await response.text());
			}
		} catch (error) {
		  console.log(error);
		}
	}

	function displayResults(data) {
		console.log("Ejecutando displayResults...");
		console.log("Temperatura:", data.main.temp);
	
		const temp = data.main.temp.toFixed(1);
		document.querySelector('#current-temp').innerHTML = `${temp}&deg;C`;
	
		const icon = data.weather[0].icon;
		const desc = data.weather[0].description;
		console.log("Icon:", icon);
		console.log("Descripción:", desc);
	
		const iconsrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
		console.log("Icon src:", iconsrc);
	
		const weatherIcon = document.querySelector('#weather-icon');
		const captionDesc = document.querySelector('#weather-desc');
	
		weatherIcon.setAttribute('src', iconsrc);
		weatherIcon.setAttribute('alt', desc);
		captionDesc.textContent = desc;
	}
	

	apiFetch();


	document.getElementById("timestamp").value = new Date().toISOString();
	
});

