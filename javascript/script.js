//pointers
var homeBody = document.querySelector("#home-body");
var startBtn = document.querySelector("#start-btn");
var timeLeft = document.querySelector("#time-left");
var scoresList = document.querySelector("#scores-list");

var questionIndex = 0; //stores the index of the questions[] array
var totalSeconds = questions.length * 15; // stores the total seconds alloted, will be updated upon wrong answer
var secondsRemaining = totalSeconds; //stores the seconds displayed on the screen
var storedHighscores = [];
if(localStorage.getItem("highscores") !== null){
    storedHighscores = JSON.parse(localStorage.getItem("highscores"));
}
//launches the program
function startQuiz(){
    homeBody.setAttribute("style","display:none");
    generateQuestion();
    startTimer();
}

//starts the timer and updates the timer display
function startTimer(){
    var secondsElapsed = 1;
    var secondAdjuster;
    timeLeft.textContent = secondsRemaining;
    
        setInterval(function(){
            if (secondsElapsed <= totalSeconds && questionIndex < questions.length){
                secondsRemaining = totalSeconds - secondsElapsed;
                if(secondsRemaining <= 0){
                    secondsRemaining = 0;
                }
                timeLeft.textContent = secondsRemaining;
                secondsElapsed++;
                secondAdjuster = secondsElapsed + 1; 
            }
            //this is to so that the timer runs for one more second after the last question is answered
            //and the correct remaining time is reflected on the display
            else if (questionIndex === questions.length){
                if (secondsElapsed < secondAdjuster){
                    secondsRemaining = (totalSeconds - secondsElapsed) + 1;
                    if(secondsRemaining <= 0){
                        secondsRemaining = 0;
                    }
                    timeLeft.textContent = secondsRemaining;
                    secondsElapsed++;
                }
            }
        },1000);
}

//generates the questions and fills in the text with values taken form questions[] array
function generateQuestion(){
    var container = document.createElement("div");
    container.setAttribute("class","container");
    document.body.appendChild(container);

    var questionEl = document.createElement("h2");
    var choicesList = document.createElement("ol");

    questionEl.textContent = questions[questionIndex].title;
    questionEl.setAttribute("class", "question-title");
    container.appendChild(questionEl);
    container.appendChild(choicesList);

    //grabs each element with the key of 'choices' from the questions[] array
    //and writes it to a list of buttons
    for(var i = 0; i < questions[questionIndex].choices.length; i++){
        var choiceEl = document.createElement("li");
        choicesList.appendChild(choiceEl);

        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("type","button");
        choiceBtn.setAttribute("class", "btn btn-lg btn-danger mb-2");
        choiceBtn.setAttribute("id" , i);
        choiceBtn.textContent = questions[questionIndex].choices[i];
        choiceEl.appendChild(choiceBtn);
    }
    var finalScore = document.createElement("h3");
    finalScore.textContent = "";
    finalScore.setAttribute("style", "display: none");
    container.appendChild(finalScore);

    var form = document.createElement("form");
    form.setAttribute("action","highscores.html")
    form.setAttribute("class","mt-3");
    form.setAttribute("style", "display: none");
    container.appendChild(form);

    var formRow = document.createElement("div");
    formRow.setAttribute("class", "form-row");
    form.appendChild(formRow);

    var labelDiv = document.createElement("div");
    labelDiv.setAttribute("class","col-12 col-lg-2 mb-n1");
    formRow.appendChild(labelDiv);
    var label = document.createElement("label");
    label.setAttribute("style","font-size: 25px");
    label.textContent = "Enter initials: ";
    labelDiv.appendChild(label);

    var inputDiv = document.createElement("div");
    inputDiv.setAttribute("class", "col-12 col-lg-6 mb-2");
    formRow.appendChild(inputDiv);
    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("class", "form-control");
    inputDiv.appendChild(input);

    var buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", "col-12 col-lg-4");
    formRow.appendChild(buttonDiv);
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "btn btn-danger");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Submit";
    buttonDiv.appendChild(submitBtn);

    var hr = document.createElement("hr");
    container.appendChild(hr);
    hr.setAttribute("style", "display: none");

    var result = document.createElement("h4");
    result.textContent = "";
    result.setAttribute("style", "display: none");
    container.appendChild(result);

    //sets what happens when an answer is chosen depending if it's
    //correct or incorrect
    choicesList.addEventListener("click", function(event){
        if(event.target.matches("button")){

            if(event.target.textContent === questions[questionIndex].answer){
                result.textContent = "Correct!";
            }
            else if(event.target.textContent !== questions[questionIndex].answer){
                result.textContent = "Wrong!";
                totalSeconds -= 15;
            }

            questionIndex++;

            if(questionIndex < questions.length){
                questionEl.textContent = questions[questionIndex].title;
                for(i = 0 ; i < questions[questionIndex].choices.length; i++){
                    document.getElementById(i).textContent = questions[questionIndex].choices[i];
                }
            }
            //sets what happens after the final question is answered
            else if(questionIndex >= questions.length){
                questionEl.textContent = "All done!";
                choicesList.setAttribute("style", "display: none");

                if (result.textContent === "Wrong!" && secondsRemaining >= 15){
                    finalScore.textContent = "Your final score is " + (secondsRemaining-15) + ".";
                }
                else if(result.textContent === "Wrong!" && secondsRemaining < 15){
                    finalScore.textContent = "Your final score is " + 0 + ".";
                }
                else{
                    finalScore.textContent = "Your final score is " + secondsRemaining + ".";
                }
                finalScore.setAttribute("style", "display: block");

                form.setAttribute("style", "display: block");

                form.addEventListener("submit",function(event){
                    event.preventDefault;

                    var highscore = {initial: input.value, score: secondsRemaining};
                    storedHighscores.push(highscore);
                    localStorage.setItem("highscores",JSON.stringify(storedHighscores));

                });
            }

            hr.setAttribute("style", "display: block");
            result.setAttribute("style","display: block");

            var resultTimer = 2;
            setInterval(function(){
                if (resultTimer > 0){
                    resultTimer--;
                    if(resultTimer === 0){
                        hr.setAttribute("style","display: none");
                        result.setAttribute("style", "display: none");
                    }
                }
            },1000);
        }
    });
}


function generateScoresList(){
    //sorts the array from highest score to lowest score
    storedHighscores.sort(compare);

    for(var i = 0; i < storedHighscores.length; i++){
        var scoreListEl = document.createElement("li");
        scoreListEl.setAttribute("class" , "bg-secondary text-white mb-2 score-element");
        scoresList.appendChild(scoreListEl);
        var scoreEl = document.createElement("span");
        scoreEl.textContent = (i+1) + ". " +  storedHighscores[i].initial + "-" + storedHighscores[i].score;
        scoreListEl.appendChild(scoreEl);
    }

}

//used to sort object array
function compare(a, b) {

    const scoreA = a.score;
    const scoreB = b.score;
  
    let comparison = 0;

    if (scoreA < scoreB) {
      comparison = 1;
    } else if (scoreA > scoreB) {
      comparison = -1;
    }
    return comparison;
}

function clearScoresList(){
    localStorage.clear();

    while (scoresList.hasChildNodes()) {  
        scoresList.removeChild(scoresList.firstChild);
      }
}