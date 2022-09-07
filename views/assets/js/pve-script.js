let select = document.getElementById('choice');
let sendButon = document.getElementById('sendButton');
let winnerText = document.getElementById('winnerText');
let resultText = document.getElementById('resultText');

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
    })
})

searchObject();


