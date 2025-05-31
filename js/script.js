//varibles
const btnStart = document.getElementById("btn-start");
const btnRestart = document.getElementById("btn-restart");
const playerBoardElement = document.getElementById("playerBoard");
const enemyBoardElement = document.getElementById("enemyBoard");
const shipsContainer = document.querySelector(".ships-container");

//import audios
const backgroundMusic = new Audio("sounds/Backgroundmusic.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;

const winSound = new Audio("sounds/Win.mp3");
winSound.volume = 0.3;
const loseSound = new Audio("sounds/Lose.mp3");
loseSound.volume = 0.3;
const hit = new Audio("sounds/medium-explosion-40472.mp3");
hit.volume = 0.5;


let game;

//event listeners
btnStart.addEventListener("click", () => {
    startGame();  
});


btnRestart.addEventListener("click", () => {
    restartGame();

    //start music only if it's not already playing
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch((error) => 
            console.log("Autoplay blocked:", error)
        );
    }
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

