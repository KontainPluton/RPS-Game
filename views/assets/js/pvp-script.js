let listObjects = document.getElementById('list-objects');
let selectsObjects = document.getElementsByClassName('object-choice')

let player2Choice = document.getElementById('player2-choice');
let player1Choice = document.getElementById('player1-choice');

let winnerText = document.getElementById('winnerText');
let resultText = document.getElementById('resultText');

initPage();

function onSend()
{
    let url = "/api/game?object_one=" + player1Choice.value + "&object_two=" + player2Choice.value;

    if(player1Choice.value != '' && player2Choice.value != ''){

        fetch(url)
        .then(function(response){
            if(response.status !== 200){
                throw Error(response.statusText);
            } else return response.json();
        })
        .then(function(data){
            let winner = data.winner;
            let outcome = data.outcome;
            let loser = data.loser;
    
            resultText.innerHTML = winner + ' ' + outcome + ' ' + loser;
    
            if(winner == player1Choice.value){
                winnerText.innerHTML = 'Joueur 1 a gagné !';
            } 
            else if(loser == player1Choice.value){
                winnerText.innerHTML = 'Joueur 2 a gagné !';
            }
            else{
                winnerText.innerHTML = 'Egalité !';
            }
        })
        .catch(error => console.log(error));

    }
}

function initPage(){

    fetch('/api/objects/')
    .then(function(response) {
        if(response.status !== 200){
            throw Error(response.statusText);
        } else return response.json();
    })
    .then(function(data) {

        for(const element of data) {
            let bloc = generateBloc(element);
            listObjects.appendChild(bloc);
        }
    })
    .catch(error => console.log(error));

}

function generateBloc(object) {

    let divObject = document.createElement('div');
    divObject.className = "col";

    let ext = ".png";

    if(!checkFileExist("assets/images/"+object+".png")) {
        ext = ".gif";
    }

    divObject.innerHTML =  '<div class="card"><div class="card-body text-center" style="margin: 1px;padding: 10px;">'
    + '<input type="checkbox" id="' + object + '" + onchange="eventCheckbox(this)"></br>'
    + '<img src="assets/images/' + object + ext + '" style="width: 53px;">'
    + '<h4 class="card-title">&nbsp;' + object + '</h4></div></div>';

    return divObject;
}

function checkFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
     
    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}

function eventCheckbox(checkboxElem) {
    
    let idObject = checkboxElem.id;
    
    if (checkboxElem.checked) {

        for(let element of selectsObjects) {
            let opt = document.createElement('option');
            opt.value = idObject;
            opt.innerHTML = idObject;
            element.appendChild(opt);
        }
    }
    else {
        for(let element of selectsObjects) {
            removeOptions(element,idObject)
        }
    }
}

function removeOptions(selectElement,optionName) {
    let i, L = selectElement.options.length - 1;

    for(i = L; i >= 0; i--) {
       if(selectElement.options[i].innerHTML == optionName) {
        selectElement.remove(i);
       }
    }
 }