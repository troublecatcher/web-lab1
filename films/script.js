let form = document.forms.filmForm,
    filterForm = document.forms.filterForm,
    formDiv = document.getElementById('form');
    container = document.getElementById('container'),
    entry = document.getElementById('entry');

let films = [], filmImgs = [], genres = [], countries = [];
if (JSON.parse(localStorage.films) !== undefined)
    films = JSON.parse(localStorage.films);
if (JSON.parse(localStorage.filmImgs) !== undefined)
    filmImgs = JSON.parse(localStorage.filmImgs);

function showFilter(){
    document.getElementById('showFilterBtn').value = '←';
    document.getElementById('showFilterBtn').onclick = hideFilter;
    filterForm.style.display = 'block';
    setTimeout(() => {
        filterForm.style.opacity = '1';
    }, 100);
}
function hideFilter(){
    document.getElementById('showFilterBtn').value = '→';
    document.getElementById('showFilterBtn').onclick = showFilter;
    filterForm.style.opacity = '0';
    setTimeout(() => {
        filterForm.style.display = 'none';
    }, 200);
}
function filtrate(){
    let filtered = films,
        genreSel = document.getElementById('genreF'),
        countrySel = document.getElementById('countryF'),
        date1 = filterForm.date1.value,
        date2 = filterForm.date2.value;
    entry.innerHTML = '';
    if(filterForm.dateCheck.checked && date1 && date2){
        let d1 = date1.split("-"),
            d2 = date2.split("-");
        let from = new Date(d1[0], parseInt(d1[1])-1, d1[2]),
            to   = new Date(d2[0], parseInt(d2[1])-1, d2[2]);
        filtered = filtered.filter((film) => {
            let c = film.date.split('-'),
            check = new Date(c[0], parseInt(c[1])-1, c[2]);
            return check > from && check < to;
        });
    }
    if(filterForm.genreCheck.checked)
        filtered = filtered.filter((film) => {
            return film.genre == genreSel.options[genreSel.selectedIndex].text;
        });
    if(filterForm.countryCheck.checked)
        filtered = filtered.filter((film) => {
            return film.country == countrySel.options[countrySel.selectedIndex].text;
        });
    refresh(filtered);
}
function genreFilter(){
    for (let item of films) {
        if(genres.includes(item.genre) || item.genre =='')
            continue;
        else genres.push(item.genre);
    }
    document.getElementById('genreF').innerHTML = '';
    for (let i in genres) {
        let opt = document.createElement('option');
        opt.textContent = genres[i];
        document.getElementById('genreF').appendChild(opt);
    }
}
function countryFilter(){
    for (let item of films) {
        if(countries.includes(item.country) || item.country =='')
            continue;
        else countries.push(item.country);
    }
    document.getElementById('countryF').innerHTML = '';
    for (let i in countries) {
        let opt = document.createElement('option');
        opt.textContent = countries[i];
        document.getElementById('countryF').appendChild(opt);
    }
}
genreFilter();
countryFilter();
let butt = document.createElement('input');
    butt.value = '+';
    butt.id = 'newdir';
    butt.setAttribute('type', 'button');
    document.querySelector('label[for="Режиссер"]').appendChild(butt);
let dbutt = document.createElement('input');
    dbutt.value = '-';
    dbutt.id = 'deldir';
    dbutt.setAttribute('type', 'button');
    
    butt.onclick = function(){
        let inp = document.createElement('input');
        inp.setAttribute('type','text');
        inp.setAttribute('class','newdirector');
        document.querySelector('label[for="Режиссер"]').insertBefore(inp, butt);
        document.querySelector('label[for="Режиссер"]').insertBefore(dbutt, butt);
    }

    dbutt.onclick = function(){
        let newdirlist = document.querySelectorAll('.newdirector');
        if(newdirlist.length == 1){
            newdirlist[newdirlist.length - 1].remove();
            dbutt.remove();
        }
        else newdirlist[newdirlist.length - 1].remove();
    }


function addFilm(){
    let otherDirs = document.querySelectorAll('input[name="newdirector"]'),
        allDirs = form.director.value;
    otherDirs.forEach(e => {
        allDirs += ', ' + e.value;  
    });
    let film = {
        name: form.name.value,
        country: form.country.value,
        genre: form.genre.value,
        director: allDirs,
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
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        filmImgs.push(reader.result);
        localStorage.filmImgs = JSON.stringify(filmImgs);
    })
    reader.readAsDataURL(poster.files[0]);

    let count = 0;  
    let list = form.querySelectorAll('input:not(#newdir, #deldir)');
    for (let item of list){
        if(item.value != "" && item.value){
            count++;
        }
    }
    if(count == list.length){
        films.push(film);
        setTimeout(() => {
            addCard(film);
        }, 500);
        form.reset();
        localStorage.setItem('films', JSON.stringify(films));
    }
    // Это костыль, эдакие издержки работы с localStorage.
    // Запись посредством setItem происходит с некоторой задержкой,
    // которая слишком большая, чтобы сразу считать значение.
    // В реальном проекте все равно бы использовал базу данных,
    // где данной проблемы не было бы.
    // Как не было бы и проблемы с ограничением по памяти в localStorage,
    // о которой я так виртуозно хотел умолчать. Упс
    genreFilter();
    countryFilter();
}
function addCard(film){
    
    let filmCard = document.createElement("div");
        filmPhoto = document.createElement("img"),
        filmTitle = document.createElement("p");
    filmCard.appendChild(filmPhoto);
    filmCard.appendChild(filmTitle);
    entry.insertBefore(filmCard, document.getElementById('endOfCards'));

    filmPhoto.src = filmImgs[films.indexOf(film)];
    
    filmTitle.textContent = film.name;
    filmCard.id = `film${films.indexOf(film)}`;
    filmCard.onclick = addModal.bind(null, filmInfo, film);

    filmPhoto.style.width = '150px';
    filmPhoto.style.height = '150px';
    filmPhoto.style.borderRadius = '15px';
}
function callForm(){
    addModal(showForm, form);
}
function showForm(form, modal){
    form.style.display = 'flex';
    modal.appendChild(formDiv);
    
}
function addModal(func, item){
    let overlay = document.createElement('div'),
        modal = document.createElement('div');
    modal.classList.add('modal');
    overlay.classList.add('overlay');

    document.querySelector('body').append(overlay);
    overlay.append(modal);
    
    container.style.filter = 'blur(7px)';
 
    func(item, modal, overlay);

    let close = document.createElement('button');
    close.textContent = 'Закрыть';
    modal.append(close);
    close.onclick = killModal.bind(this,modal,overlay);
}
function killModal(modal, overlay){
    modal.remove();
    overlay.remove();
    container.style.filter = 'none';
};
function filmInfo(film, modal, overlay){
    let img = document.createElement('img');
    img.src = filmImgs[films.indexOf(film)];
    img.classList.add('modalimg');
    modal.append(img);
    for (let item in film) {
        if(item == 'poster') continue;
        let p = document.createElement('p');
        modal.append(p);
        p.textContent = `${form[item].name} - ${film[item]}`;
    }

    let delbut = document.createElement('button');
    delbut.textContent = 'Удалить';
    modal.append(delbut);

    delbut.onclick = function killFilm(){
        let index = films.indexOf(film);
        document.getElementById(`film${index}`).remove();
        filmImgs = filmImgs.filter(function(e){
            return filmImgs.indexOf(e) != index;
        });
        films = films.filter(function(e){
            return films.indexOf(e) != index;
        });
        killModal(modal, overlay);
        localStorage.films = JSON.stringify(films);
        localStorage.filmImgs = JSON.stringify(filmImgs);
        let f = 0;
        document.querySelectorAll('#entry > div').forEach(e => {
            e.id = `film${f++}`;
        });
        genreFilter();
        countryFilter();
    };
}
function refresh(arr){
    arr.forEach(e => {
        addCard(e);
    });
}
refresh(films);