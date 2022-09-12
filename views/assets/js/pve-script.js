let select = document.getElementById('choice');
let sendButon = document.getElementById('sendButton');
let winnerText = document.getElementById('winnerText');
let resultText = document.getElementById('resultText');
let listObjects = document.getElementById('list-objects');

function searchObject(){
    let url = 'api/objects/'

    fetch(url)
    .then(function(response){
        if(response.status !== 200){
            throw Error(response.statusText);
        } else return response.json();
    })
    .then(function(data){
        for(const element of data){
            let opt = document.createElement('option');
            opt.value = element;
            opt.innerHTML = element;
            select.appendChild(opt);
        }
    })
    .catch(error => console.log(error));
}

sendButon.addEventListener('click', function(){
    let value = select.options[select.selectedIndex].value;

    let url = 'api/game?object_one=' + value;

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

        if(winner === value){
            winnerText.innerHTML = 'Tu as gagné !';
        } 
        else if(loser === value){
            winnerText.innerHTML = 'Windows VISTA (Ordinateur) a gagné !';
        }
        else{
            winnerText.innerHTML = 'Egalité !';
        }

        listObjects.innerHTML = '';

        listObjects.appendChild(generatePicture(winner));
        listObjects.appendChild(generatePicture(loser));
    })
    .catch(error => console.log(error));
})

function generatePicture(object) {

    let divObject = document.createElement('div');
    divObject.className = "col";

    let ext = ".png";

    if(!checkFileExist("assets/images/"+object+".png")) {
        ext = ".gif";
    }

    divObject.innerHTML =  '<div class="card"><div class="card-body text-center" style="margin: 1px;padding: 10px;">'
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

searchObject();


