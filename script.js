let questions = [
    {
        "question": "Wie heißt die Hauptstadt von Ungarn ?",
        "answer_1": "Budapest",
        "answer_2": "Bukarest",
        "answer_3": "Zagreb",
        "answer_4": "Prag",
        "right_answer": 1
    },
    {
        "question": "Mit welcher Tiergruppe sind Dinosaurier am engsten verwandt ?",
        "answer_1": "Vögel",
        "answer_2": "Affen",
        "answer_3": "Eidechsen",
        "answer_4": "Alligatoren",
        "right_answer": 1
    },
    {
        "question": "Wie heißt die Schicht der Atomosphäre die der Erde am nächsten ist ?",
        "answer_1": "Stratosphäre",
        "answer_2": "Mesosphäre",
        "answer_3": "Troposhäre",
        "answer_4": "Thermosphäre",
        "right_answer": 3
    },
    {
        "question": "Wie hoch ist der Eiffelturm ?",
        "answer_1": "150m",
        "answer_2": "176m",
        "answer_3": "220m",
        "answer_4": "300m",
        "right_answer": 4
    },
    {
        "question": "Wie lang ist die Strecke eines Marathons ?",
        "answer_1": "10km",
        "answer_2": "12,195km",
        "answer_3": "42,195km",
        "answer_4": "45,195km",
        "right_answer": 3
    },
    {
        "question": "Welche Insel gehört nicht zu den Balearischen Inseln ?",
        "answer_1": "Ibiza",
        "answer_2": "Gran Canaria",
        "answer_3": "Formentera",
        "answer_4": "Cabrera",
        "right_answer": 2
    }
];

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_RIGHT = new Audio('sounds/right.mp3');
let AUDIO_WRONG = new Audio('sounds/wrong.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {

    if (TheGameIsOfer()) {
        showEndScreen();
    }else{
       updateProgressBar();
       updaytTonextQuestion();
    }
}

function TheGameIsOfer() {
    return currentQuestion >= questions.length;
  }

  function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('img-quiz').style = 'display: none';
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-img'). src = "img/trophy-gbad317d35_1280.jpg";
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}

   function updaytTonextQuestion() {
     let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion +1;
    document.getElementById('qustion-text').innerHTML = question['question'];
     document.getElementById('answer_1').innerHTML = question['answer_1'];
     document.getElementById('answer_2').innerHTML = question['answer_2'];
     document.getElementById('answer_3').innerHTML = question['answer_3'];
     document.getElementById('answer_4').innerHTML = question['answer_4'];
   }

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idofRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        console.log('Richtige Antwort!');
    document.getElementById(selection).parentNode.classList.add('bg-success');
    AUDIO_RIGHT.play();
    rightQuestions++;
    }else{
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idofRightAnswer).parentNode.classList.add('bg-success');
    AUDIO_WRONG.play();
    }
    document.getElementById('next-button').disabled = false;
    manageAnswerButtons('none');
}

function manageAnswerButtons(param) {
    for (let i = 1; i < 5; i++) {
        let answer = document.getElementById(`answer_${i}`).parentNode;
        answer.style.pointerEvents = param;}}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
    manageAnswerButtons('');
}

function  resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('img-quiz').style = '';
    document.getElementById('header-img'). src = "img/quiz-g7a3065f59_1920.png";
    document.getElementById('questionBody').style = '';  //anzeigen
    document.getElementById('endScreen').style = 'display: none'; //ausblenden

    rightQuestions = 0;
    currentQuestion = 0;  
    init();
}