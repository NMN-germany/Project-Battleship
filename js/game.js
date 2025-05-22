class Game {
    constructor() {
        this.startScreen = document.querySelector("#start-screen");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameoverScreen = document.querySelector("#gameover-screen");
    }


start() {
    this.gameScreen.style.height = this.height + "px";
    this.gameScreen.style.width = this.width + "px";
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
}

}