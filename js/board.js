class Board {
    constructor(size, boardId) {
    this.size = size;
    this.board = document.getElementById(boardId);
    this.boardId = boardId;
    this.totalShips = 10;
    this.strikes = 0;
    }

//creates board inside the indicated table
   generateBoard() {
    this.board.innerHTML = '';   //clean board
    
    for (let i = 0; i < 8; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 8; j++) {
            const cell = document.createElement("td");
            //store the i and j coordinates in data attributes for later use (API dataset from HTML)
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.classList.add('cell');

            //adds click only on enemy board
            if(this.boardId === "enemyBoard") {
                cell.addEventListener("click", () => {   
                    if (this.onCellClick) this.onCellClick(cell);  //call back to Game
                });
            }
            row.appendChild(cell);
        }
        this.board.appendChild(row);
      }
      console.log("Creating board for:", this.boardId, this.board);

   }


//places the ships
  placeShips() {
    let placed = 0;

    for (let i = 0; i < 10; i++) {
        const row = Math.floor(Math.random() * this.size);
        const col = Math.floor(Math.random() * this.size);
        //this selector looks for an element that has two specific data attributes
        const cell = this.board.querySelector(`[data-row='${row}'][data-col='${col}']`); 

        if(!cell.classList.contains("ship") && !cell.dataset.hasShip) { //check if there is already ship (visible or hidden)
         if(this.boardId === "playerBoard") {
           cell.classList.add("ship");    //visible player ships
           } else {
             cell.dataset.hasShip = "true";    //hidden enemy ships
           }
           placed++;
        }    
        console.log(cell);
    }
 }


  handleShot(cell) {
    if(cell.classList.contains("strike") || cell.classList.contains("water")) //if the cell was already clicked(strike/water), do nothing
        return;

     const isStrike = cell.classList.contains("ship") || cell.dataset.hasShip === "true"; // check if the cell has a ship

    if(isStrike) {
        cell.classList.add("strike"); //mark as shot
        this.strikes++;
        //notifying the game to remove a ship icon (callback)
        if(this.onShipHit) {
           this.onShipHit(this.boardId);
        }
        console.log("Strike!! Total strikes " + this.strikes);
    } else {
        cell.classList.add("water");
        console.log("Water!!")  
    }

    if(this.strikes === this.totalShips) {
      alert("You sank all the ships!"); //check if all ships are fired
    }
  }

  reset() {
    this.generateBoard();
    this.placeShips();
  }

};
