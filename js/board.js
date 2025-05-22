class Board {
    constructor(size, boardId) {
    this.size = 10;
    this.board = document.getElementById(boardId);
    this.boardId = boardId;
    }

//creates board inside the indicated table
   generateBoard() {

    this.board.innerHTML = '';   //clean board
    
    for (let i = 0; i < 10; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("td");

            //store the i and j coordinates in data attributes for later use
            cell.dataset.row = i;
            cell.dataset.col = j;

            cell.classList.add('cell');

            //adds click only on enemy board
            if(this.boardId === "enemyBoard") {
                cell.addEventListener("click", () => {
                    this.handleShot(cell);
                });
            }
            row.appendChild(cell);
        }
        this.board.appendChild(row);
      }
   }


//places the ships
  placeShips() {
    for (let i = 0; i < 10; i++) {
        const row = Math.floor(Math.random() * this.size);
        const col = Math.floor(Math.random() * this.size);

        //this selector looks for an element that has two specific data attributes
        const cell = this.board.querySelector(`[data-row='${row}'][data-col='${col}']`); 

        if(this.boardId === "playerBoard") {
          cell.classList.add("ship");    //visible ships
        } else {
            cell.dataset.hasShip = "true";    //hidden ships
        }      
    }    
  }


  handleShot(cell) {
    if(cell.classList.contains("strike") || cell.classList.contains("water"))
        return;

     const isStrike = cell.classList.contains("ship") || cell.dataset.hasShip === "true";

    if(isStrike) {
        cell.classList.add("strike");
    } else {
        cell.classList.add("water");
    }
  }
}