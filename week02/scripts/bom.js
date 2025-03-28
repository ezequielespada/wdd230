const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', () => {
    const myFavChap = input.value.trim();

    if (myFavChap === '') {
        alert('Please, type your favorite chap.'); 
        input.focus(); 
        return; 
    }

    input.value = ''; 

    const listItem = document.createElement('li');
    const listText = document.createElement('span');
    const listBtn = document.createElement('button');

    listItem.appendChild(listText);
    listText.textContent = myFavChap;
    listItem.appendChild(listBtn);
    listBtn.textContent = '❌';

    list.appendChild(listItem);

    listBtn.addEventListener('click', () => {
        list.removeChild(listItem);
    });

    input.focus(); 
});
