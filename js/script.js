//varibles
const btnStart = document.getElementById("btn-start");
const btnRestart = document.getElementById("btn-restart");

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

