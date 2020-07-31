//Scores Dashboard
const scoresDashboardText = document.getElementById("scores-board");
//Dashboard options
const gobackBtn = document.getElementById("btn-back");
const clearBtn = document.getElementById("btn-clear");

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
    if (jsonResult.testtaker != null && jsonResult.testscore != null) {
        scoresDashboardText.innerHTML =
            `<div class="row">
                <div class="col-sm-6 col-md-6">
                    <p>Test Taker Initials: ${jsonResult.testtaker}</p>
                </div>
                <div class="col-sm-6 col-md-6">
                    <p>Scores obtained: ${jsonResult.testscore}</p>
                </div>
            </div>
            <hr>`;
    } else {
        scoresDashboardText.innerHTML = `<div class="row">
                                        <div class="col-sm-12 col-md-12">
                                            <p>No results to display, try going back and complete the test to submit your scores.</p>                  
                                        </div>
                                    </div>`;
    }
}

// Go Back option
gobackBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location = "./index.html";
});

// Clear scores option
clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("test-taker-result");
    localStorage.removeItem("test-taker-name");
    renderScores();
    location.reload();
})