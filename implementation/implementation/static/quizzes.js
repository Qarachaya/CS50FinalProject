// Questions
quiz = information.quiz;
qnumVal = information.qnumVal;

// Points counter
let p = 0;

// Question number counter
let qn = 1;

function main() {

    // Display elements: quiz number, question number, question prompt, points display, and exit button
    qnumber = document.querySelector('#qnumber');
    number = document.querySelector('#number');
    prompt = document.querySelector('#prompt');
    points = document.querySelector('#points');
    exit = document.querySelector('#exit');

    // Submit answer elements: response form, next button form, submit button,
    // 'Your answer', user input, correctness display, and next question button
    askQuestion = document.querySelector('#askQuestion');
    switchQuestion = document.querySelector('#switchQuestion');
    submission = document.querySelector('#submission');
    text = document.querySelector('#text');
    response = document.querySelector('#response');
    iscorrect = document.querySelector('#iscorrect');
    next = document.querySelector('#next');

    // Quiz structure elements: finish button, header element, main quiz (footer),
    // results block, percent score display, restart quiz button, and
    // back to lesson button
    finish = document.querySelector('#finish');
    header = document.querySelector('#header');
    footer = document.querySelector('#footer');
    results = document.querySelector('#results');
    percent = document.querySelector('#percent');
    restart = document.querySelector('#restart');
    back = document.querySelector('#back');

    // Keyboard toggler
    keyboardToggle = document.querySelector('#keyboardToggle');
    keyboard = document.querySelector('#keyboard');

    // Update UI
    updateUI();

    // Listen for submission
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        return false;
    });
}

// Update UI function
function updateUI() {
    // Set quiz number
    qnumber.innerHTML = qnumVal;

    // Randomly assign question/answer between Assyrian and English
    let part = quiz[qn - 1];
    let q = Math.round(Math.random());
    if (q == 0) {
        question = part.english;
        answer = part.assyrian;
    }
    else {
        question = part.assyrian;
        answer = part.english;
    }

    // Update quiz headers
    number.innerHTML = qn;
    prompt.innerHTML = question;
    points.innerHTML = p;
}


// Toggle Assyrian keyboard
function toggler() {
    if(keyboard.style.display == 'none') {
        keyboard.classList.add('d-flex');
        keyboard.style.display = 'block';
    }
    else {
        keyboard.classList.remove('d-flex');
        keyboard.style.display = 'none';
    }
}

// Press key: this function is inspired by assyrianlanguages.org/sureth's keyboard
function press(key) {
    response.focus();
    response.value = response.value + key;
}


// Check functions
function check() {
    // Check answer
    if (response.value == answer) {
        correct();
    }
    else {
        incorrect();
    }

    // Update points and reveal next button
    points.innerHTML = p;
    nextButton();
}

function correct() {
    iscorrect.innerHTML = 'Correct!';
    p++;
}

function incorrect() {
    iscorrect.innerHTML = 'Incorrect! Correct answer is '+answer;
}


// Next question functions
function nextButton() {
    if(qn == quiz.length) {
        // If last question, show complete quiz button
        finish.style.display = 'inline';

        // Hide response block
        askQuestion.style.display = 'none';
        text.style.display = 'none';
        response.style.display = 'none';
        submission.style.display = 'none';
    }
    else {
        // Show next button
        switchQuestion.style.display = 'block';
        next.style.display = 'block';

        // Hide response block
        askQuestion.style.display = 'none';
        text.style.display = 'none';
        response.style.display = 'none';
        submission.style.display = 'none';
    }
}

function nextQuestion() {
    // When next button clicked, update question
    qn++;
    updateUI();
    resetButtons();
}

function resetButtons() {
    // Hide switch block, finish button, and iscorrect
    switchQuestion.style.display = 'none';
    next.style.display = 'none';
    finish.style.display = 'none';
    iscorrect.innerHTML = '';

    // Show response block
    askQuestion.style.display = 'block';
    text.style.display = 'block';
    response.style.display = 'block';
    submission.style.display = 'block';
}


// Finish and restart quiz functions
function finishQuiz() {
    // Hide quiz
    footer.style.display = 'none';

    // Show results
    results.style.display = 'block';

    // Show percentage of total questions correct
    percent.innerHTML = (p / (quiz.length)) * 100 + '%';
}

function restartQuiz() {
    // Show quiz
    footer.style.display = 'block';

    // Hide results
    results.style.display = 'none';

    // Reset
    resetButtons();
    p = 0;
    qn = 1;

    // Rerun main
    main();
}

document.addEventListener('DOMContentLoaded', main);