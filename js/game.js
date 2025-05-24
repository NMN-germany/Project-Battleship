class Game {
    constructor() {
        this.startScreen = document.querySelector("#start-screen");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameoverScreen = document.querySelector("#gameover-screen");

        this.playerBoard = new Board(10, "playerBoard");
        this.enemyBoard = new Board(10, "enemyBoard");

        this.isPlayerTurn = false; //"false" only until start()
    }


 start() {
    console.log("game is running");

    this.gameScreen.style.height = this.height + "px";
    this.gameScreen.style.width = this.width + "px";
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    //creates and stores the boards
    this.playerBoard.generateBoard();
    this.playerBoard.placeShips();

    
    this.enemyBoard.generateBoard();
    this.enemyBoard.placeShips();

    //music??

    // callback function to the enemy board
    this.enemyBoard.onShotCallback = (cell) => {
        if(!this.isPlayerTurn) return;

         const hit = this.enemyBoard.handleShot(cell);   //check if it was a hit

        if(hit) {
            console.log("Enemy attack!!!");
        } else {
            console.log("Water!!");
        }
    }
 }

 enablePlayerTurn() {

 }

 restart() {
    console.log("Restarting game");
    this.gameScreen.style.display = "none";
    this.gameoverScreen.style.display = "block";
    //restart boards
    this.playerBoard.reset();
    this.enemyBoard.reset();
 }
}