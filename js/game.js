class Game {
    constructor() {
        this.startScreen = document.querySelector("#start-screen");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameoverScreen = document.querySelector("#gameover-screen");

        this.playerBoard = new Board(8, "playerBoard");
        this.enemyBoard = new Board(8, "enemyBoard");

        this.isPlayerTurn = true;
    }


 start() {
    console.log("game is running");

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    //creates and stores the boards
    this.playerBoard.generateBoard();
    this.playerBoard.placeShips();
    this.shipsIcons("player-ships", 10);
    this.playerBoard.onShipHit = (boardId) => {
        this.removeShipIcon("player-ships");
    };

    
    this.enemyBoard.generateBoard();
    this.enemyBoard.placeShips();
    this.shipsIcons("enemy-ships", 10);
        this.enemyBoard.onShipHit = (boardId) => {
            this.removeShipIcon("enemy-ships");
    };

    this.enemyBoard.onCellClick = (cell)  => {    // callback function to the enemy board
        this.playerShot(cell);
    };
 }


 //set game turns
 playerShot(cell) {
    if (!this.isPlayerTurn)
        return; //do not allow shooting if it's not the player's turn

    this.isPlayerTurn = false; //disable player turn

    this.enemyBoard.handleShot(cell);  //player shoots at the enemy

    if (this.enemyBoard.allShipsSunk()) {
        this.showGameOver("player");
        return;
    }

    setTimeout(() => {
        this.enemyShot();  //enemy shoots at the player
        this.isPlayerTurn = true;
    }, 1000);
 }


 enemyShot() {
    const row = Math.floor(Math.random() * this.playerBoard.size);
    const col = Math.floor(Math.random() * this.playerBoard.size);

    //select the cell on the player's board corresponding to the random row and column
    const cell = this.playerBoard.board.querySelector(`[data-row='${row}'][data-col='${col}']`);
    console.log(cell);

    //check if the cell has not already been targered
    if(!cell.classList.contains("strike") && !cell.classList.contains("water")) {
        this.playerBoard.handleShot(cell);
        this.isPlayerTurn = true;
        if (this.playerBoard.allShipsSunk()) {
            this.showGameOver("enemy");
        }
    } else {
        this.enemyShot();
    }
 }

 shipsIcons(containerId, number) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; 
    for (let i = 0; i < number; i++) {
        const ship = document.createElement("div");
        ship.classList.add("ship-icon");
        container.appendChild(ship);
    }
 }

 removeShipIcon(containerId) {
    const container = document.getElementById(containerId);
    if (container && container.firstChild) {
        container.removeChild(container.firstChild);//remove ships from left to right (firsChild)
    } 
 }


 showGameOver(winner) {
    this.gameScreen.style.display = "none";
    this.gameoverScreen.style.display = "block";

    //shows result in the gameover screen
    this.gameoverScreen.querySelector("h1").textContent = winner = "player" ? "You Win!" : "You Lose!";

    //play sound according to result
    const audioPath = winner === "player" ? "sounds/Win.mp3" : "sounds/Lose.mp3";
    const audio = new Audio(audioPath);
    audio.play();
 }


 restart() {
    console.log("Restarting game");
    this.gameoverScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    
    //restart boards
    this.playerBoard.reset();
    this.enemyBoard.reset();

    //places ships again
    this.start();
 }
}