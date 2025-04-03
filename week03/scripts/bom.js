// Obtener referencias a los elementos del DOM
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Obtener la lista de capítulos desde localStorage o inicializar un array vacío
let chaptersArray = getChapterList() || [];

// Mostrar los capítulos almacenados al cargar la página
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

// Manejar el clic en el botón para agregar un capítulo
button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList();
        input.value = ''; 
        input.focus(); 
    }
});

// Función para mostrar un capítulo en la lista
function displayList(item) {
    let li = document.createElement('li');
    let deleteButton = document.createElement('button');
    
    li.textContent = item;
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete');
    
    li.append(deleteButton);
    list.append(li);
    
    deleteButton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent);
        input.focus();
    });
}

// Función para guardar la lista en localStorage
function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Función para obtener la lista de localStorage
function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// Función para eliminar un capítulo de la lista y actualizar localStorage
function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1); 
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}
