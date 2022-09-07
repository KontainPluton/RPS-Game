let listObjects = document.getElementById('list-objects');
let selectsObjects = document.getElementsByClassName('object-choice')

let player2Choice = document.getElementById('player2-choice');
let player1Choice = document.getElementById('player1-choice');

initPage();

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

    divObject.innerHTML =  '<div class="card"><div class="card-body text-center" style="margin: 1px;padding: 10px;">'
    + '<img src="assets/img/' + object + '.png" style="width: 53px;">'
    + '<input type="checkbox" id="' + object + '" + onchange="eventCheckbox(this)">'
    + '<h4 class="card-title">&nbsp;' + object + '</h4></div></div>';

    return divObject;
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