//varibles
const startScreen = document.querySelector("#start-screen");
const btnStart = document.getElementById("btn-start");
const gameScreen = document.querySelector("#game-screen");
const btnRestart = document.getElementById("btn-restart");


//event listeners
btnStart.addEventListener("click", () => {
    startGame();
});

document.addEventListener("DOMContentLoaded", () => {
    const playerBoard = new Board(10, "playerBoard");
    playerBoard.generateBoard();
    playerBoard.placeShips();

    const enemyBoard = new Board(10, "enemyBoard");
    enemyBoard.generateBoard();
    enemyBoard.placeShips();
})


btnRestart.addEventListener("click", () => {
    restartGame();
});

//functions
function startGame() {
    console.log("starting the game");
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
}

