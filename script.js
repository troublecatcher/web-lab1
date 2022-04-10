let localName = localStorage.getItem('name');
document.getElementById('namebox').textContent = localName;

function greet(){
    let promptName = document.getElementById("name").value;
    if(promptName){
        alert(`Привет, ${promptName})))`);
        localStorage.setItem('name', promptName);
        document.getElementById('namebox').textContent = promptName;
    }
}

function calc(){
    let a = document.getElementById("a").value;
    let h = document.getElementById("h").value;
    let S = (a*h)/2;
    if(S>0) alert(S);
}

function compare(){
    let str1 = document.getElementById("str1").value.length;
    let str2 = document.getElementById("str2").value.length;
    if(str1 == str2) alert(true);
    else return alert(false);
}

function minmax(){
    let array = JSON.parse("[" + document.getElementById("array").value + "]");
    alert(Math.min.apply(Math, array) + " " + Math.max.apply(Math, array));
}

function add(){
    var timer = document.getElementById('timer');
    timer.value = parseInt(timer.value)+1;
}
function start(){
    window.TimerId = window.setInterval(add, 1000);
} 
function stop(){
    window.clearInterval(window.TimerId);
}
function look(){
    var elem = document.getElementById('timer');
    alert(elem.value);
 }

list = document.querySelectorAll('.correct');
function check(){
    if(document.querySelectorAll('input[type="radio"]:checked').length == 10){
        let arr = [];
        let correct = 0, wrong = 0;

        list.forEach(e => {
            arr.push(e.checked);
        });
        arr.forEach(e => {
            if(e === true) correct ++;
            else wrong ++;
        });
        allOptions = listButtons = document.querySelectorAll('input[type="radio"] + label');
        allOptions.forEach(e => {
            e.style.color = "black";
        });
        if(arr.includes(false)) alert(`Ваш результат: верных ответов - ${correct}, неверных - ${wrong}`);
        listButtons = document.querySelectorAll('input[type="radio"]:checked');
        listLabels = document.querySelectorAll('input[type="radio"]:checked + label');
        for (let i = 0; i < listButtons.length; i++) {
            if(listButtons[i].classList.contains('correct'))
                listLabels[i].style.color = 'green';
            else listLabels[i].style.color = 'red';
        
        }
    } else alert('вы ответили не на все вопросы!');
}

let container = document.getElementById('container');
let hidden = document.getElementById('hidden');
function beautify(){
    hidden.style.display = 'block';
    setTimeout(() => {
        hidden.style.opacity = '100%';
    }, 500);
    document.getElementById('namebox').style.color = 'white';
    container.style.opacity = '0%';
    setTimeout(() => {
        container.style.display = 'none';
    }, 500);

    document.getElementById('username').textContent = localStorage.getItem('name');
    let d = new Date().toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    document.getElementById('date').textContent = d;
}
hidden.addEventListener('click', 
function restore(){
    container.style.display = 'block';
    setTimeout(() => {
        container.style.opacity = '100%';
    }, 500);
    document.getElementById('namebox').style.color = 'black';
    hidden.style.opacity = '0%';
    setTimeout(() => {
        hidden.style.display = 'none';
    }, 500);
});

let menu = document.getElementById('menu');
let overlay = document.getElementById('overlay');
function openModal(){
    container.style.filter = 'blur(5px)';
    overlay.style.display = 'block';
    menu.style.display = 'block';
}
overlay.addEventListener('click',
function closeModal(){
    container.style.filter = 'none';
    overlay.style.display = 'none';
    menu.style.display = 'none';
});



function wtf(){
    alert('Не совсем понял, что имелось в виду в задании под "кнопка для запуска функции". Какой функции?');
}