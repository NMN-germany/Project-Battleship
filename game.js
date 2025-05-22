class Game {
    constructor() {
        this.screenStart = document.querySelector("#screen-start");
        this.screenGame = document.querySelector("#screen-game");
        this.screenEnd = document.querySelector("#screen-end");
    }


start() {
    this.screenGame.style.height = this.height + "px";
    this.screenGame.style.width = this.width + "px";
    this.screenStart.style.display = "none";
    this.screenGame.style.display = "block";
}

}