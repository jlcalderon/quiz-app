////////* Elements binded to a variable */
const timer = document.getElementById("timer-count");
const startBtn = document.getElementById("start-quiz");
//Divs main containers of this app
const startContainer = document.getElementById("start-container");
const quizConatiner = document.getElementById("quiz-container");
const submitContainer = document.getElementById("submit-results");
//Divs sections of the question container 
const questionsDiv = document.getElementById("questions");
const answersDiv = document.getElementById("answers");
const results = document.getElementById("results");

//Form submit results
const submitFrmEl = document.getElementById("test-taker-results-submit");
const testTakerInitialsEl = document.getElementById("test-taker-initials");
///////



/* Counter variable to handle the timer */
let countdown = 60;

// Questions increment
let countQuestions = 0;

//////////* JSON object array to store questions and their answers */
let questions = [{
        "id": 1,
        "question": "Whats the only way to create a variable in plain JavaScript?",
        "answers": [
            { "id": 1, "text": "const", "flag": false },
            { "id": 2, "text": "let", "flag": false },
            { "id": 3, "text": "var", "flag": false },
            { "id": 4, "text": "All of the above", "flag": true },
        ]
    },
    {
        "id": 2,
        "question": "What is triple equals ' === ' checking for?",
        "answers": [
            { "id": 1, "text": "Compare data type and value", "flag": true },
            { "id": 2, "text": "Assign a new value to a variable", "flag": false },
            { "id": 3, "text": "Compare data type", "flag": false },
            { "id": 4, "text": "Compare for value match", "flag": false },
        ]
    },
    {
        "id": 3,
        "question": "What is the output of console.log(11 + '11')",
        "answers": [
            { "id": 1, "text": "11", "flag": false },
            { "id": 2, "text": "1111", "flag": true },
            { "id": 3, "text": "22", "flag": false },
            { "id": 4, "text": "undefined", "flag": false },
        ]

    },
    {
        "id": 4,
        "question": "Given the following array Fruits = ['Apples', 'Pears', 'Oranges', 'Bananas'] What is the value in the index position 3",
        "answers": [
            { "id": 1, "text": "Pears", "flag": false },
            { "id": 2, "text": "Apples", "flag": false },
            { "id": 3, "text": "Oranges", "flag": false },
            { "id": 4, "text": "Bananas", "flag": true },
        ]
    },
    {
        "id": 5,
        "question": "In javascript what is the array object built in method used to insert a new element into an array?",
        "answers": [
            { "id": 1, "text": "filter", "flag": false },
            { "id": 2, "text": "pop", "flag": false },
            { "id": 3, "text": "splice", "flag": false },
            { "id": 4, "text": "push", "flag": true },
        ]
    },
];
console.log(`JSON array of questions length = ${questions.length}`);
////////////////End of the JSON object array of the questions

/// Variable array to store score results
let testResultsArray = []; //items inside are going to be json objects with the 2 localstorage variables
let testTakerResultLS = localStorage.getItem("test-taker-result");
let testTakerLS = localStorage.getItem("test-taker-name");
/////// Functions Start here //////////////////////////

//////////* Printing questions to the DOM */
function printQuestionsToDOM(index) {
    questionsDiv.innerHTML = `<h1>Question # ${questions[index].id} of ${questions.length}</h1><p>${questions[index].question}</p>`;
    for (let y = 0; y < questions[index].answers.length; y++) {
        // Grabing li element in a variable to insert answer buttons
        let z = document.createElement("li");
        z.innerHTML = `<button id="${questions[index].answers[y].id}" class="btn-answers" data-flag="${questions[index].answers[y].flag}">${questions[index].answers[y].text}</button>`;
        // Adding eventListener click to each answer button rendered
        z.addEventListener("click", (e) => {
            //reading the data-flag of each answer
            let flag = e.target.getAttribute("data-flag");
            //evaluate if the answer clicked is incorrect 
            if (flag === "false") {
                //substract time to the timer
                countdown = countdown - 10;
                // Display result to the user
                results.innerHTML = `<div class="card card-body">
                                        <h1>Your Previous answer was Incorrect -10</h1>
                                    </div>`;
                /*/increment the questions count variable
                 clean html content of divs and 
                 call out the render next with the next question value*/
                countQuestions++;
                answersDiv.innerHTML = "";
                renderNext();
                //Exit the function                    
                return;
            } else { //evaluate if the answer clicked is correct
                //Add time to the timer
                countdown = countdown + 10;
                // Display result to the user
                results.innerHTML = `<div class="card card-body">
                                        <h1>Way to go! your previous answer was Correct +10</h1>
                                    </div>`;
                /*/increment the questions count variable
                 clean html content of divs and 
                 call out the render next with the next question value*/
                countQuestions++;
                answersDiv.innerHTML = "";
                renderNext();
                //Exit this function                                        
                return;
            }

        });
        //Adding answers to the <li> elements
        answersDiv.append(z);

    }
}
///////////

///////// Start the countdown timer.
function startTimer() {
    let interval = setInterval(() => {
        //Evaluate if test taker is done with the test
        if (countQuestions <= (questions.length - 1)) {
            countdown--;
            timer.textContent = `Your time left: ${countdown}`;
        } else {
            clearInterval(interval);
            timer.textContent = `Your time left: ${countdown}`;
            quizConatiner.setAttribute("style", "display:none;");
            submitContainer.setAttribute("style", "display:block;");
            localStorage.setItem("test-taker-result", countdown);
            return;
        }
        //Evaluate if time is over
        if (countdown === 0) {
            clearInterval(interval);
            quizConatiner.setAttribute("style", "display:none;");
            submitContainer.setAttribute("style", "display:block;");
            localStorage.setItem("test-taker-result", countdown);
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
    //Set questions counter to back to 0;
    countQuestions = 0;
    //call out start timer function
    startTimer();
    //hide the start container
    hideStartingContainer();
    //show the questions
    quizConatiner.setAttribute("data-state", "show");
    quizConatiner.setAttribute("style", "display:block;");

    //render first question
    printQuestionsToDOM(countQuestions);
    console.log(`working on question index ${countQuestions}`);
});
/////////

//Render next question function
function renderNext() {
    if (countQuestions < questions.length) {
        console.log(`working on question index ${countQuestions}`);
        printQuestionsToDOM(countQuestions);
    } else {
        quizConatiner.setAttribute("style", "display:none;");
        submitContainer.setAttribute("style", "display:block;");
    }
}

//// Submit results
submitFrmEl.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("test-taker-name", testTakerInitialsEl.value);
    localStorage.setItem("test-taker-result", countdown);
    submitContainer.setAttribute("style", "display:none;");
    startContainer.setAttribute("data-state", "show");
    startContainer.setAttribute("style", "display:block;");
    window.location = "./scoresboard.html";
});