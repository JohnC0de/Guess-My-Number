let wonGame = false;
let lostGame = false;
let hiddenRandomNumber;
let tries = 0;
let hearts = 5;
const displayedRandomNumber = document.querySelector("#displayedRandomNumber");
const inputValue = document.querySelector("#inputValue");
const inputButton = document.querySelector("#inputButton");
const outputMessage = document.querySelector("#outputMessage");
const tryAgain = document.querySelector("#tryAgain");
const gameOver = document.querySelector("#gameOver");
const winner = document.querySelector("#winner");
const displayedScore = document.querySelector("#tries");
const displayedHighscore = document.querySelector("#highscore");

function generateRandomNumber() {
  hiddenRandomNumber = Math.floor(Math.random() * 20) + 1;
}

function rightAnswer() {
  displayedRandomNumber.textContent = hiddenRandomNumber;
  tries == 1
    ? (displayedHighscore.textContent = `Highscore: ${tries} Try`)
    : (displayedHighscore.textContent = `Highscore: ${tries} Tries`);
  wonGame = 1;
}

function wrongAnswer() {
  document.querySelector(`#heart${hearts}`).style.fill = "white";
  --hearts;
  outputMessage.textContent =
    inputValue.value > hiddenRandomNumber
      ? "📈 Wrong answer, number too high!"
      : "📉 Wrong answer, number too low!";
  if (hearts === 0) lostGame = 1;
}

function resetGame() {
  hearts = 5;
  wonGame = 0;
  lostGame = 0;
  for (let i = 1; i <= hearts; i++) {
    document.querySelector(`#heart${i}`).style.fill = "#FF1929";
  }
  tries = 0;
  displayedScore.textContent = `Tries: ${tries}`;
  generateRandomNumber();
  winner.style.display = "none";
  gameOver.style.display = "none";
  tryAgain.style.display = "none";
  outputMessage.style.display = "block";
  outputMessage.textContent = "Choose a number!";
  displayedRandomNumber.textContent = "?";
  inputValue.placeholder = "Ex:15";
  console.log("resetted", wonGame, lostGame);
}

function getAnswer() {
  console.log("click 1");
  console.log(wonGame, lostGame);
  if (!wonGame && !lostGame) {
    console.log("click 3");
    if (!hiddenRandomNumber) generateRandomNumber();
    console.log("click 2");
    if (inputValue.value > 0 && inputValue.value < 21) {
      ++tries;
      displayedScore.textContent = `Tries: ${tries}`;
      console.log("click 3");

      if (inputValue.value == hiddenRandomNumber) {
        rightAnswer();
      } else {
        wrongAnswer();
      }
      inputValue.value = "";
      if (wonGame) {
        winner.style.display = "block";
        tryAgain.style.display = "block";
        inputValue.placeholder = "👑";
        outputMessage.style.display = "none";
      } else if (lostGame) {
        gameOver.style.display = "block";
        tryAgain.style.display = "block";
        inputValue.placeholder = "💣";
        displayedRandomNumber.textContent = "❌";
        outputMessage.style.display = "none";
      }
    } else
      outputMessage.textContent =
        "❗️ Please, insert only numbers between 1 and 20!";
  }
}

inputButton.addEventListener("click", getAnswer);
inputValue.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getAnswer();
  }
});
tryAgain.addEventListener("click", resetGame);
