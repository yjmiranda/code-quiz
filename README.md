# Code Quiz

## Description

The website generates a multiple choice quiz with a timer and stores the results. The user launches the quiz and starts the timer by pressing the Start Quiz button. Each question is displayed individually and consists of the question and four multiple choice answers. Once the user selects an answer, the next question is displayed. When the user answers the final question, the timer stops. The score is the same as the time remaining. The user can then save their score to local storage along with their initials. The highscores are displayed in a separate page accessible through the navbar. The highscores are displayed in descending order.

## Technologies Used

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Bootstrap](https://getbootstrap.com/)
* [Git](https://git-scm.com/)
* [GitHub](https://github.com/)
* [VSCode](https://code.visualstudio.com/)

## Deployed Link

* [https://yjmiranda.github.io/code-quiz/]

## Code Snipet

```
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
```
The timer would not display the correct final time if the

## Author

**Yalí Miranda** 

* [Github](https://github.com/yjmiranda)