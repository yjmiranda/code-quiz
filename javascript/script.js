//pointers
var homeBody = document.querySelector("#home-body");
var startBtn = document.querySelector("#start-btn");
var timeLeft = document.querySelector("#time-left");

var questionIndex = 0; //stores the index of the questions[] array
var totalSeconds = questions.length * 15; // stores the total seconds alloted, will be updated upon wrong answer
var secondsRemaining = totalSeconds; //stores the seconds displayed on the screen
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
                timeLeft.textContent = secondsRemaining;
                secondsElapsed++;
                secondAdjuster = secondsElapsed + 1; 
            }
            //this is to so that the timer runs for one more second after the last question is answered
            //and the correct remaining time is reflected on the display
            else if (questionIndex === questions.length){
                if (secondsElapsed < secondAdjuster){
                    secondsRemaining = (totalSeconds - secondsElapsed) + 1;
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

    var questionEl = document.createElement("h4");
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
        choiceBtn.setAttribute("class", "btn mb-2");
        choiceBtn.setAttribute("id" , i);
        choiceBtn.textContent = questions[questionIndex].choices[i];
        choiceEl.appendChild(choiceBtn);
    }
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
            else if(questionIndex >= questions.length){
                questionEl.setAttribute("style", "display: none");
                choicesList.setAttribute("style", "display: none");
            }

            hr.setAttribute("style", "display: block");
            result.setAttribute("style","display: block");

            var resultTimer = 3;
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

startBtn.addEventListener("click",startQuiz);