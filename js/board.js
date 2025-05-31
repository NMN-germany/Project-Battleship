class Board {
    constructor(size, boardId) {
        this.size = size;
        this.board = document.getElementById(boardId);
        this.boardId = boardId;
        this.totalShips = 10;
        this.strikes = 0;
        this.ships = []; // array of ships
    }

    //creates board inside the indicated table
   generateBoard() {
    this.board.innerHTML = '';   //clean board
    
    for (let i = 0; i < this.size; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < this.size; j++) {
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
   }


    //places the ships randomly
    placeShips() {
        let placed = 0;

        while (placed < this.totalShips) {
            const row = Math.floor(Math.random() * this.size);
            const col = Math.floor(Math.random() * this.size);

            //select the corresponding cell
            const cell = this.board.querySelector(`[data-row='${row}'][data-col='${col}']`);

            //if the cell if already occupied, skip to the next iteration
            if (!cell || cell.dataset.hasShip === "true") {
                continue;            
            } 

            //mark the cell as occupied by a ship
            cell.dataset.hasShip = "true";
            
            placed++;       
        }
    }
 

    //handles a shot fired at a cell
    handleShot(cell) {
        if(cell.classList.contains("strike") || cell.classList.contains("water")) //if the cell was already clicked(strike/water), do nothing
            return;

            const isStrike = cell.classList.contains("ship") || cell.dataset.hasShip === "true"; // check if the cell has a ship

        if(isStrike) {
            cell.classList.add("strike"); //mark as shot
            this.strikes++;
            hit.play();


            //notify Game instance that a ship was hit
            if(this.onShipHit) {
            this.onShipHit(this.boardId);
            }

            console.log("Strike!! Total strikes " + this.strikes);

        } else {
            cell.classList.add("water");
            console.log("Water!!")  
        }

        if (this.strikes === this.totalShips) {
            if (this.onAllShipsSunk) {
                this.onAllShipsSunk(this.boardId); //notify the game
            }
        }
        //if (this.strikes === this.totalShips) {
            //alert("You sank all the ships");  //check if all ships are fired
        //}
    }


    //returns true if all ships have been hit
    allShipsSunk() {
        return this.strikes === this.totalShips;
    }


    reset() {
        this.generateBoard();
        this.placeShips();
    }
}
