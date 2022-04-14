function valid(a){
    if(a && a!="") return a;
}
let form = document.forms.filmForm,
    container = document.getElementById('container'),
    entry = document.getElementById('entry');
let Collection = [];
function newFilm(){
    let film = {
        name: form.name.value,
        country: form.country.value,
        genre: form.genre.value,
        director: form.director.value,
        script: form.script.value,
        producer: form.producer.value,
        composer: form.composer.value,
        budget: form.budget.value,
        income: form.income.value,
        rating: form.rating.value,
        duration: form.duration.value,
        date: form.date.value,
        poster: form.poster.files[0],
    }
    let flag = 13;
    for (let item in film) {
        if(valid(item)) continue;
        Collection.push(film);
        addCard(film);
    }

    console.log(film);
}
function addCard(film){
    let filmCard = document.createElement("a");
        filmPhoto = document.createElement("img"),
        filmTitle = document.createElement("p");
    filmCard.appendChild(filmPhoto);
    filmCard.appendChild(filmTitle);
    entry.insertBefore(filmCard, document.getElementById('endOfCards'));
    filmPhoto.src = window.URL.createObjectURL(film.poster);
    filmTitle.textContent = film.name;
    filmCard.href = '#';
    filmPhoto.style.width = '150px';
    filmPhoto.style.height = '150px';
}
// document.getElementById('submit').onclick = function(evt){
//     evt.preventDefault();
// }