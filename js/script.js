//varibles
const btnStart = document.getElementById("btn-start");
const btnRestart = document.getElementById("btn-restart");
document.getElementById("ships-container");
//import audios
const winSound = new Audio("sounds/Win.mp3");
const loseSound = new Audio("sounds/Lose.mp3");

let game;

//event listeners
btnStart.addEventListener("click", () => {
    startGame();
});

btnRestart.addEventListener("click", () => {
    restartGame();
});

//functions
function startGame() {
    console.log("starting the game");
    game = new Game()
    game.start()
}



function restartGame() {
    console.log("restart the game");
    game.restart();
}

