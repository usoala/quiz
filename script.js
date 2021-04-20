//VARIABLES DOM 
var quiz = document.getElementById("quiz"),
    timer = document.getElementById("countdown"),
    questionArea,
    answerArea,
    checkAnswers,
    correct,
    checker,
    rankingArea;
var pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9, pos10;

//VARIABLES QUIZ
var allQuestions = {
    "How do you write 'Hello World' in an alert box?": ["msg('Hello World')", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');", 3],
    "How to empty an array in JavaScript?": ["arrayList[]", "arrayList(0)", "arrayList.length=0", "arrayList.len(0)", 2],
    "What function to add an element at the begining of an array and one at the end?": ["push,unshift", "unshift,push", "first,push", "unshift,last", 1],
    "What will this output? var a = [1, 2, 3]; console.log(a[6]); ": ["undefined", "0", "prints nothing", "Syntax error", 0],
    "What would following code return? console.log(typeof typeof 1); ": ["string", "number", "Syntax error", "undefined", 0],
    "Which software company developed JavaScript?": ["Mozilla", "Netscape", "Sun Microsystems", "Oracle", 1],
    "What would be the result of 3+2+'7'?": ["327", "12", "14", "57", 3],
    "Look at the following selector: $('div'). What does it select?": ["The first div element", "The last div element", "All div elements", "Current div element", 2],
    "How can a value be appended to an array?": ["arr(length).value;", "arr[arr.length]=value;", "arr[]=add(value);", "None of these", 1],
    "What will the code below output to the console? console.log(1 +  +'2' + '2');": ["'32'", "'122'", "'13'", "'14'", 0]
};

var remainingTime,
    msLeft,
    quizRunning = false,
    availables = [],
    current = 0,
    totalQuestions = 1,
    correctAnswers = 0,
    numQuestions,
    initials = "";

//FUNCIONES

function countdown(minutes, seconds) {


    function twoDigits(n) {
        //return (n <= 9 ? "0" + n : n);
        if (n <= 9) {
            return "0" + n;
        } else {
            return n;
        }
    }

    function updateTimer() {
        msLeft = endTime - (+new Date);
        if (msLeft < 1000) {
            timer.innerHTML = "Time is up!";
            endQuiz();
        } else {
            let time = new Date(msLeft);
            let mins = time.getUTCMinutes();
            remainingTime = mins + ':' + twoDigits(time.getUTCSeconds());
            timer.innerHTML = remainingTime;
            if (quizRunning) {
                setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
            } else {
                timer.innerHTML = "";
            }
        }

    }

    var endTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500;
    updateTimer();
}

function loadQuestion(choices) {

    let cont = true;
    do {
        let r = Math.floor(Math.random() * Object.keys(allQuestions).length);

        if (choices.includes(r)) {
            current = r;
            availables = choices.filter(function(value) {
                return value != r;
            });

            cont = false;
        }
    } while (cont);


    var question = Object.keys(allQuestions)[current];

    questionArea.innerHTML = question;

    var answers = allQuestions[Object.keys(allQuestions)[current]];

    answerArea.innerHTML = '';

    for (var i = 0; i < answers.length - 1; i += 1) {
        var createDiv = document.createElement('div'),
            text = document.createTextNode(answers[i]);

        createDiv.appendChild(text);
        createDiv.addEventListener("click", checkAnswer(i, answers));


        answerArea.appendChild(createDiv);
    }
}

function checkAnswer(i, arr) {

    return function() {
        var givenAnswer = i,
            correctAnswer = arr[arr.length - 1];

        if (givenAnswer === correctAnswer) {
            correctAnswers += 1;
            addChecker(true);
        } else {
            addChecker(false);
        }

        if (totalQuestions < numQuestions) {
            totalQuestions += 1;

            loadQuestion(availables);

        } else {
            endQuiz();
        }


    };
}

function addChecker(bool) {

    var createDiv = document.createElement('div'),
        txt = document.createTextNode(totalQuestions);

    createDiv.appendChild(txt);

    if (bool) {

        createDiv.className += 'correct';
        checker.appendChild(createDiv);
    } else {
        createDiv.className += 'false';
        checker.appendChild(createDiv);
    }
}

function endQuiz() {
    quizRunning = false;
    questionArea.innerHTML = '';
    var p1 = document.createElement('p'),
        p2 = document.createElement('p');
    p1.innerHTML = "Results: " + correctAnswers + "/" + numQuestions;
    p2.innerHTML = "Remaining time: " + remainingTime + " sec";
    questionArea.appendChild(p1);
    questionArea.appendChild(p2);

    answerArea.innerHTML = '';

    var btn = document.createElement("button");
    btn.id = "goToRanking";
    btn.innerHTML = "Go to Ranking!";
    questionArea.appendChild(btn);

    btn.addEventListener("click", function() {
        initials = prompt("Enter your initials");
        prepareRankingArea();
        datosLocal();
    });


}

function prepareQuizArea() {
    numQuestions = document.getElementById("numQuestions").value;
    quiz.removeChild(form);

    questionArea = document.createElement('p');
    questionArea.className = 'questions';
    answerArea = document.createElement('div');
    answerArea.className = "answers";
    checkAnswers = document.createElement('div');
    checkAnswers.className = "checkAnswers";
    correct = document.createElement('h3');
    correct.innerHTML = "Correct?";
    checker = document.createElement('div');
    checker.className = "checker";
    quiz.appendChild(questionArea);
    quiz.appendChild(answerArea);
    quiz.appendChild(checkAnswers);
    checkAnswers.appendChild(correct);
    checkAnswers.appendChild(checker);


}

function startQuiz() {
    prepareQuizArea();
    for (let i = 0; i < Object.keys(allQuestions).length; i++) { availables.push(i); }
    loadQuestion(availables);
    quizRunning = true;
    countdown(numQuestions * 0.5, 0);
}

function prepareRankingArea() {
    quiz.removeChild(questionArea);
    quiz.removeChild(answerArea);
    quiz.removeChild(checkAnswers);

    rankingArea = document.createElement('div');
    pos1 = document.createElement('h1');
    pos2 = document.createElement('h2');
    pos3 = document.createElement('h3');
    pos4 = document.createElement('h4');
    pos5 = document.createElement('h4');
    pos6 = document.createElement('h4');
    pos7 = document.createElement('h4');
    pos8 = document.createElement('h4');
    pos9 = document.createElement('h4');
    pos10 = document.createElement('h4');
    quiz.appendChild(rankingArea);
    rankingArea.appendChild(pos1);
    rankingArea.appendChild(pos2);
    rankingArea.appendChild(pos3);
    rankingArea.appendChild(pos4);
    rankingArea.appendChild(pos5);
    rankingArea.appendChild(pos6);
    rankingArea.appendChild(pos7);
    rankingArea.appendChild(pos8);
    rankingArea.appendChild(pos9);
    rankingArea.appendChild(pos10);
}

function datosLocal() {
    var obj = {
        ranking: []
    };

    var score = correctAnswers / numQuestions * 100 + msLeft / 100000 * correctAnswers; //por poner algo

    var result = {
        "initials": initials,
        "numQuestions": numQuestions,
        "correctAnswers": correctAnswers,
        "remaining time": msLeft,
        "score": score
    };

    if (!localStorage.getItem('ranking')) {

        localStorage.setItem('ranking', JSON.stringify(obj));
        var leer = localStorage.getItem('ranking');
        leer = JSON.parse(leer);
    }

    try {
        var guardado = localStorage.getItem('ranking');
        guardado = JSON.parse(guardado);
        guardado.ranking.push(result);
        var ordenado = ordenarRanking(guardado);
        console.log(ordenado);
        localStorage.setItem("ranking", JSON.stringify(ordenado));
        mostrarRanking(ordenado);
    } catch (err) {
        console.log(err);
        console.log("no se ha podido acceder al ranking");
        pos1.innerHTML = "1st " + result.initials.slice(0, 4) + " - " + result.score.toString().slice(0, 3) + " pts";

    }
}

function ordenarRanking(rankingArray) {
    var rankingOrdenado = {
        ranking: []
    }
    rankingOrdenado.ranking = rankingArray.ranking.sort(function(a, b) {
        return (b.score - a.score)
    })
    return rankingOrdenado;
}

function mostrarRanking(rankingOrdenado) {
    try {
        pos1.innerHTML = "1st " + rankingOrdenado.ranking[0].initials.slice(0, 5) + " - " + rankingOrdenado.ranking[0].score.toString().slice(0, 5) + " pts";
        pos2.innerHTML = "2nd " + rankingOrdenado.ranking[1].initials.slice(0, 5) + " - " + rankingOrdenado.ranking[1].score.toString().slice(0, 5) + " pts";
        pos3.innerHTML = "3rd " + rankingOrdenado.ranking[2].initials.slice(0, 5) + " - " + rankingOrdenado.ranking[2].score.toString().slice(0, 5) + " pts";
        pos4.innerHTML = "4th " + rankingOrdenado.ranking[3].initials.slice(0, 5) + " - " + rankingOrdenado.ranking[3].score.toString().slice(0, 5) + " pts";
        pos5.innerHTML = "5th " + rankingOrdenado.ranking[4].initials.slice(0, 5) + " - " + rankingOrdenado.ranking[4].score.toString().slice(0, 5) + " pts";
        pos6.innerHTML = "6th " + rankingOrdenado.ranking[5].initials.slice(0, 5) + " - " + rankingOrdenado.ranking[5].score.toString().slice(0, 5) + " pts";
        pos7.innerHTML = "7th " + rankingOrdenado.ranking[6].initials.slice(0, 5) + " - " + rankingOrdenado.ranking[6].score.toString().slice(0, 5) + " pts";
        pos8.innerHTML = "8th " + rankingOrdenado.ranking[7].initials.slice(0, 5) + " - " + rankingOrdenado.ranking[7].score.toString().slice(0, 5) + " pts";
        pos9.innerHTML = "9th " + rankingOrdenado.ranking[8].initials.slice(0, 5) + " - " + rankingOrdenado.ranking[8].score.toString().slice(0, 5) + " pts";
        pos10.innerHTML = "10th " + rankingOrdenado.ranking[9].initials.slice(0, 5) + " - " + rankingOrdenado.ranking[9].score.toString().slice(0, 5) + " pts";
    } catch (err) {
        console.log(err);
    }
}