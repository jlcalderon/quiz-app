//Scores Dashboard
const scoresDashboardText = document.getElementById("scores-board");
//get results from localstorage variables and push it into an array
let testTakerResultLS = localStorage.getItem("test-taker-result");
let testTakerLS = localStorage.getItem("test-taker-name");
let jsonResult = {
    testtaker: testTakerLS,
    testscore: testTakerResultLS,
};

//Render scores dashboard
renderScores();

function renderScores() {
    scoresDashboardText.innerHTML =
        `<div class="row">
            <div class="col-sm-6 col-md-6">
                <p>${jsonResult.testtaker}</p>
            </div>
            <div class="col-sm-6 col-md-6">
                <p>${jsonResult.testscore}</p>
            </div>
        </div>
        <hr>`;
}