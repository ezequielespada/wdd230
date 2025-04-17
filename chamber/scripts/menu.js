document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("lastModified").textContent = document.lastModified;

	const banner = document.getElementById("banner");
	const closeBtn = document.getElementById("close-banner");
	
	// Solo mostrar el banner Lunes (1), Martes (2) y Miércoles (3)
	const currentDay = new Date().getDay(); // 0=Domingo, 1=Lunes, ..., 6=Sábado
	
	if (banner && closeBtn) {
		if (currentDay >= 1 && currentDay <= 3) {
			banner.classList.remove("banner-hidden");
		} else {
			banner.classList.add("banner-hidden");
		}
	
		closeBtn.addEventListener("click", () => {
			banner.classList.add("banner-hidden");
		});
	}

	console.log("Día actual:", currentDay);
	console.log("Se debería mostrar el banner?", currentDay >= 1 && currentDay <= 3);

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
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

        dayNames.forEach(day => {
            const dayEl = document.createElement('li');
            dayEl.textContent = day;
            dayEl.classList.add('day-name');
            calendarEl.appendChild(dayEl);
        });

        // código del calendario...

        const today = new Date();
        const currentDate = today.getDate();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        // Día de la semana del 1° del mes
        const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 (Dom) a 6 (Sáb)
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

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
            if (day === currentDate) {
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

        if (icon) {
            const iconsrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            console.log("Icon src:", iconsrc);
    
            const weatherIcon = document.querySelector('#weather-icon');
            const captionDesc = document.querySelector('#weather-desc');
    
            weatherIcon.setAttribute('src', iconsrc);
            weatherIcon.setAttribute('alt', desc);
            captionDesc.textContent = desc;
        } else {
            // Asignar una imagen predeterminada en caso de error
            document.querySelector('#weather-icon').setAttribute('src', 'images/default-icon.png');
            document.querySelector('#weather-icon').setAttribute('alt', 'No icon available');
        }
    }

    const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=-34.84&lon=-58.38&units=metric&appid=c90e5232f5eb9f25193687186a14f7bc';

    apiFetch();
    getForecast();

    async function getForecast() {
        try {
            const response = await fetch(forecastURL);
            if (response.ok) {
                const data = await response.json();
                displayForecast(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.error("Error loading forecast:", error);
        }
    }

    function displayForecast(data) {
        const forecastContainer = document.createElement("div");
        forecastContainer.classList.add("forecast");

        const forecastDays = {};

        data.list.forEach(item => {
            const date = item.dt_txt.split(" ")[0];
            const hour = item.dt_txt.split(" ")[1];

            if (hour === "12:00:00" && !forecastDays[date]) {
                forecastDays[date] = {
                    temp: item.main.temp.toFixed(1),
                    icon: item.weather[0].icon,
                    description: item.weather[0].description
                };
            }
        });

        let count = 0;
        for (const [date, forecast] of Object.entries(forecastDays)) {
            if (count >= 3) break;

            const card = document.createElement("div");
            card.classList.add("forecast-day");

            const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "short" });

            card.innerHTML = `
                <h4>${dayName}</h4>
                <img src="https://openweathermap.org/img/wn/${forecast.icon}@2x.png" alt="${forecast.description}">
                <p>${forecast.temp} °C</p>
            `;
            forecastContainer.appendChild(card);
            count++;
        }

        document.querySelector("#weather-card").appendChild(forecastContainer);
    }

    document.getElementById("timestamp").value = new Date().toISOString();

    // Cargar los datos de los miembros desde el archivo JSON
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {
            // Acceder al array de miembros
            const members = data.members;

            // Filtrar miembros con nivel "Silver" o "Gold"
            const qualifiedMembers = members.filter(member =>
                member.membership === 'Gold' || member.membership === 'Silver'
            );

            // Seleccionar aleatoriamente entre 2 y 3 miembros para los spotlights
            const randomMembers = [];
            while (randomMembers.length < 3 && qualifiedMembers.length > 0) {
                const randomIndex = Math.floor(Math.random() * qualifiedMembers.length);
                randomMembers.push(qualifiedMembers.splice(randomIndex, 1)[0]);
            }

            // Mostrar los miembros en el HTML
            const spotlightContainer = document.getElementById('spotlight-container');
            randomMembers.forEach(member => {
                const spotlightDiv = document.createElement('div');
                spotlightDiv.classList.add('spotlight');

                spotlightDiv.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.description}</p>
                    <a href="${member.website}" target="_blank">Learn More</a>
                `;

                spotlightContainer.appendChild(spotlightDiv);
            });
        })
        .catch(error => {
            console.error('Error al cargar los miembros:', error);
        });
});