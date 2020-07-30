//Scores Dashboard
const scoresDashboardText = document.getElementById("scores-board");

//get array of results from localstorage
let resulstArray = localStorage.getItem("results");
//Render scores dashboard
console.log(resulstArray.testtaker);
renderScores();

function renderScores() {
    for (let i = 0; i < resulstArray.length; i++) {
        scoresDashboardText.append(resulstArray[i]);
    }
}