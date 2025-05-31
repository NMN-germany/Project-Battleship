class Game {
    constructor() {
        this.startScreen = document.querySelector("#start-screen");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameoverScreen = document.querySelector("#gameover-screen");

        this.playerBoard = new Board(8, "playerBoard");
        this.enemyBoard = new Board(8, "enemyBoard");

        this.isPlayerTurn = true;
        this.playerShipsLeft = 10;
        this.enemyShipsLeft = 10;
    }


 start() {
    console.log("game is running");

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    //reset the counters
    this.playerShipsLeft = 10;
    this.enemyShipsLeft = 10;

    //creates and stores the boards
    this.playerBoard.generateBoard();
    this.playerBoard.placeShips();
    this.shipsIcons("player-ships", this.playerShipsLeft);
    this.playerBoard.onShipHit = (boardId) => {
    this.removeShipIcon("player-ships");
    };

    
    this.enemyBoard.generateBoard();
    this.enemyBoard.placeShips();
    this.shipsIcons("enemy-ships", this.enemyShipsLeft);
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

      //check if the game is over
    if (this.enemyBoard.allShipsSunk()) {
        this.showGameOver("player");
    } else if (this.playerBoard.allShipsSunk()) {
        this.showGameOver("enemy");
    }

    setTimeout(() => {
        this.enemyShot();  //enemy shoots at the player
    }, 1000);
 }


 enemyShot() {

    //generates a random position on the player's board
    const row = Math.floor(Math.random() * this.playerBoard.size);
    const col = Math.floor(Math.random() * this.playerBoard.size);

    //select the cell on the player's board corresponding to the random row and column
    const cell = this.playerBoard.board.querySelector(`[data-row='${row}'][data-col='${col}']`);
    console.log(cell);


    //check if the cell has not already been targered
    if(!cell.classList.contains("strike") && !cell.classList.contains("water")) {
        this.playerBoard.handleShot(cell);  //handleShot return true if it's sucessful
        
        this.isPlayerTurn = true;
        
        if (this.enemyBoard.allShipsSunk()) {
            this.showGameOver("player");
        } else if (this.playerBoard.allShipsSunk()) {
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
    const resultText = winner === "player" ? "You Win!" : "You Lose!";
    document.getElementById("winner-message").textContent = resultText;

    //play sound according to result
    if (winner === "player") {
        winSound.play();
    } else {
        loseSound.play();
    }
 }


 restart() {
    console.log("Restarting game");
    this.gameoverScreen.style.display = "none";
    this.startScreen.style.display = "block";
    
    //restart boards
    this.playerBoard.reset();
    this.enemyBoard.reset();

    //places ships again
    this.start();
 }
}