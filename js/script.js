//varibles
const startScreen = document.querySelector("#start-screen");
const btnStart = document.getElementById("btn-start");
const btnReveal = document.getElementById("btn-reveal");
const btnRestart = document.getElementById("btn-restart");


//event listeners
btnStart.addEventListener("click", () => {
    startGame();
})

btnReveal.addEventListener("click", (e) => {
    revealBoard();
})

btnRestart.addEventListener("click", (e) => {
    restartGame();
})

//functions
function startGame() {
    console.log("starting the game");
}