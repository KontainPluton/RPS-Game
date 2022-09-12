let select = document.getElementById('choice');
let sendButon = document.getElementById('sendButton');
let tableObjects = document.getElementById('table-objects');

initPage();

function initPage(){

    fetch('/api/objects/')
    .then(function(response) {
        if(response.status !== 200){
            throw Error(response.statusText);
        } else return response.json();
    })
    .then(function(data) {

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

    tableObjects.innerHTML = '';

    let value = select.options[select.selectedIndex].value;

    let url = 'api/objects/' + value;

    fetch(url)
    .then(function(response){
        if(response.status !== 200){
            throw Error(response.statusText);
        } else return response.json();
    })
    .then(function(data){
        for(const element of data["winning outcomes"]){
            let line = generateLine(element);
            tableObjects.appendChild(line);
        }
    })
    .catch(error => console.log(error));
})

function generateLine(object) {

    let line = document.createElement('tr');
    line.innerHTML = '<td>' + object[0] + '</td>' +
        '<td>' + object[1]  + '</td>';

    return line;
}
