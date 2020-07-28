const timer = document.getElementById("timer-count");
const startBtn = document.getElementById("start-quiz");
const startContainer = document.getElementById("start-container");
let countdown = 60;

// Start the countdown timer.
function startTimer() {
    let interval = setInterval(() => {
        countdown--;
        timer.textContent = `Your time left: ${countdown}`;
        if (countdown === 0) {
            clearInterval(interval);
            //finishTest()
            return;
        }
    }, 1000);
}

//hide the starting container
function hideStartingContainer() {
    startContainer.setAttribute("data-state", "hide");
    if (startContainer.getAttribute("data-state") === "hide") {
        startContainer.setAttribute("style", "display:none;");
    }
}

startBtn.addEventListener("click", (e) => {
    //call out start timer function
    startTimer();
    //hide the start container
    hideStartingContainer();
    //Present/show the questions
});