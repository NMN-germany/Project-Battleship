const btnStart = document.getElementById("btn-start");
const btnReveal = document.getElementById("btn-reveal");
const btnRestart = document.getElementById("btn-restart");



btnStart.addEventListener("click", function(e) {
    startGame();
})

btnReveal.addEventListener("click", (e) => {
    revealBoard();
})

btnRestart.addEventListener("click", (e) => {
    restartGame();
})