////////* Elements binded to a variable */
const timer = document.getElementById("timer-count");
const startBtn = document.getElementById("start-quiz");
const startContainer = document.getElementById("start-container");
const quizConatiner = document.getElementById("quiz-container");
const results = document.getElementById("results");
///////

/* Counter variable to handle the timer */
let countdown = 60;

//////////* JSON object to store questions and their answers */
let questions = {
    "id": 1,
    "question": "Whats the only way to create a variable in plain JavaScript?",
    "answers": [
        { "id": 1, "text": "const", "flag": false },
        { "id": 2, "text": "let", "flag": false },
        { "id": 3, "text": "var", "flag": false },
        { "id": 4, "text": "All of the above", "flag": true },
    ]
}

/* let question2 = {
    "id": 2,
    "question": "What is triple equals ' === ' checking for?",
    "answers": [
        { "id": 1, "text": "Compare data type and value", "flag": true },
        { "id": 2, "text": "Assign a new value to a variable", "flag": false },
        { "id": 3, "text": "Compare data type", "flag": false },
        { "id": 4, "text": "Compare for value match", "flag": false },
    ]
} */

/* let question3 = {
    "id": 3,
    "question": "What is the output of console.log(11 + "11")",
    "answers": [
        { "id": 1, "text": "11", "flag": false },
        { "id": 2, "text": "1111", "flag": true },
        { "id": 3, "text": "22", "flag": false },
        { "id": 4, "text": "undefined", "flag": false },
    ]
} */

/* let question4 = {
    "id": 4,
    "question": "Given the following array Fruits = ['Apples', 'Pears', 'Oranges', 'Bananas'] What is the value in the index position 3",
    "answers": [
        { "id": 1, "text": "Pears", "flag": false },
        { "id": 2, "text": "Apples", "flag": false },
        { "id": 3, "text": "Oranges", "flag": false },
        { "id": 4, "text": "Bananas", "flag": true },
    ]
} */

/* let question5 = {
    "id": 5,
    "question": "In javascript what is the array object built in method used to insert a new element into an array?",
    "answers": [
        { "id": 1, "text": "filter", "flag": false },
        { "id": 2, "text": "pop", "flag": false },
        { "id": 3, "text": "splice", "flag": false },
        { "id": 4, "text": "push", "flag": true },
    ]
} */
//////////

//////////* Printing questions to the console */
function printQuestionsToConsole() {
    console.log(questions.id);
    console.log(questions.question);
    for (let y = 0; y < questions.answers.length; y++) {
        console.log(JSON.stringify(questions.answers[y]));
    }
}
///////////

//////////* Printing questions to the DOM */
function printQuestionsToDOM() {
    quizConatiner.setAttribute("data-state", "show");
    quizConatiner.setAttribute("style", "display:block;")
    document.getElementById("questions").innerHTML = `<h1>Question # ${questions.id}</h1><p>${questions.question}</p>`;
    for (let y = 0; y < questions.answers.length; y++) {
        let z = document.createElement("li");
        z.innerHTML = `<button id="${questions.answers[y].id}" class="btn-answers" data-flag="${questions.answers[y].flag}">${questions.answers[y].text}</button>`;
        z.addEventListener("click", (e) => {
            let flag = e.target.getAttribute("data-flag");
            if (flag === "false") {
                countdown = countdown - 10;
                results.innerHTML = `<div class="card card-body">
                                        <h1>Incorrect</h1>
                                    </div>`;
                return;
            } else {
                countdown = countdown + 10;
                results.innerHTML = `<div class="card card-body">
                                        <h1>Correct</h1>
                                    </div>`;
                return;
            }
        })
        document.getElementById("answers").append(z);
    }
}
///////////




///////// Start the countdown timer.
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
//////////

//////////hide the starting container
function hideStartingContainer() {
    startContainer.setAttribute("data-state", "hide");
    if (startContainer.getAttribute("data-state") === "hide") {
        startContainer.setAttribute("style", "display:none;");
    }
}
////////

///////// Start test by the button click
startBtn.addEventListener("click", (e) => {
    //call out start timer function
    startTimer();
    //hide the start container
    hideStartingContainer();
    //Present/show the questions
    printQuestionsToDOM();
});
/////////