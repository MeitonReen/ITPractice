var guessNumber = Math.ceil(Math.random() * 100);

var guesses = document.querySelector(".guesses");
var lastResult = document.querySelector(".lastResult");
var lowOrHi = document.querySelector(".lowOrHi");

var guessSubmit = document.querySelector(".guessSubmit");
var guessField = document.querySelector(".guessField");

var guessCount = 1;
var resetButton;

function resetGame() {
    guessCount = 1;
  
    var resetParas = document.querySelectorAll('.resultParas p');
    for (var i = 0 ; i < resetParas.length ; i++) {
      resetParas[i].textContent = '';
    }
  
    resetButton.parentNode.removeChild(resetButton);
  
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
  
    lastResult.style.backgroundColor = 'white';
  
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;

    resetButton = document.createElement('button');
    resetButton.textContent = 'Начать новую игру';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
  }

function checkGuess() {
    var userGuess = Number(guessField.value);
    if (guessCount === 1)
    {
        guesses.textContent = "История отгадок:";
    }
    guesses.textContent += " " + userGuess;
   
    if (userGuess === guessNumber) {
      lastResult.textContent = "Поздравляем! Вы угадали число.";
      lastResult.style.backgroundColor = "green";
      lowOrHi.textContent = "";
      setGameOver();
    } else if (guessCount === 10) {
      lastResult.textContent = "Попытки отгадать закончены, вы проиграли.";
      lastResult.style.backgroundColor = "red";
      setGameOver();
    } else {
      lastResult.textContent = "Неверно.";
      lastResult.style.backgroundColor = "red";
      if (userGuess < guessNumber) {
        lowOrHi.textContent = "Больше";
      } else if(userGuess > guessNumber) {
        lowOrHi.textContent = "Меньше";
      }
    }
   
    guessCount++;
    guessField.value = "";
    guessField.focus();
    guesses.textContent.toUpperCase();
  }

  guessSubmit.addEventListener("click", checkGuess);