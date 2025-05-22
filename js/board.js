class Board {
    constructor() {
    this.size = 10;
    this.matrix = [];
    this.ships = [];
   }

   generateBoard() {

    const board = document.getElementById("board");
    const table = document.createElement("table");

    for (let row = 0; row < 10; row++) {
        const tr = document.createElement("tr");

        for (let col = 0; col < 10; col++) {
            const td = document.createElement("td");
            td.classList.add("cell");

        }
    }

   }
}