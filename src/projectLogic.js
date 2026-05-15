#!/usr/bin/node

class Ship {
    constructor(length, shipId) {
        this.length = length;
        this.hits = 0;
        this.sunkStatus = false;
        this.shipId = shipId;
        this.gridsOccupied = [];
    }

    hit() {
        //code goes here
        this.hits++;
        return this.hits;
    }

    isSunk() {
        if (this.hits === this.length) return this.sunkStatus = true;
        return this.sunkStatus = false;
    }
};

class Node {
    constructor(coordinates, id) {
        this.coordinates = coordinates;
        this.occupancy = null;
        this.id = id;
    }
};

class Gameboard {
    constructor(size = 8) {
        this.size = size;
        this.gridsOccupied = [];
        this.shotsMissed = [];
        this.shotsHit = [];
        this.gridsShotAt = [];
        this.ships = [];
        // this.sunkCounter = 0;
    }

    checkOccupied(targetArray, currentValue) {
        for (let i = 0; i < targetArray.length; i++) {
            if (targetArray[i].toString() === currentValue.toString()) return true;
        }
        return false;
    }

    createShip(shipLength, shipName) {
        const newShip = new Ship(shipLength, shipName);
        this.ships.push(newShip);
        return this.ships;
    }

    placeShipHorizontal(ship, startCoordinate) {
        const xAxisMax = 8 - ship.length;
        const tempArray = [];
        if (startCoordinate[0] > xAxisMax) return "please select x-coordinate < " + xAxisMax;
        
        for (let i = 0; i < ship.length; i++) {
            let newCoordinate = [startCoordinate[0]+i, startCoordinate[1]];
            let checkIfEmpty = this.checkOccupied(this.gridsOccupied, newCoordinate);
            if (checkIfEmpty === true) return "coordinates taken, please select a different coordinate";
            tempArray.push(newCoordinate);            
        }

        tempArray.forEach((element) => {
            ship.gridsOccupied.push(element);
            this.gridsOccupied.push(element);
        })

        return "success";
    }
    
    placeShipVertical(ship, startCoordinate) {
        const yAxisMax = 8 - ship.length;
        const tempArray2 = [];
        if (startCoordinate[1] > yAxisMax) return "please select y-coordinate < " + yAxisMax;
        
        for (let i = 0; i < ship.length; i++) {
            let newCoordinate = [startCoordinate[0], startCoordinate[1] + i];
            let checkIfEmpty = this.checkOccupied(this.gridsOccupied, newCoordinate);
            if (checkIfEmpty === true) return "coordinates taken, please select a different coordinate";
            tempArray2.push(newCoordinate);
        }

        tempArray2.forEach((element) => {
            ship.gridsOccupied.push(element);
            this.gridsOccupied.push(element);
        });

        return "success";
    }

    receiveAttack(coordinates) {
        const checkIfGridIsShotAt = this.checkOccupied(this.gridsShotAt, coordinates);
        if (checkIfGridIsShotAt === true) return "coordinate already fired at, please choose another coordinate";

        const checkIfMiss = this.checkOccupied(this.gridsOccupied, coordinates);
        if (checkIfMiss === false) {
            this.gridsShotAt.push(coordinates);
            this.shotsMissed.push(coordinates);
            return "miss";
        }

        for (let i = 0; i < this.ships.length; i++) {
            let checkHit = this.checkOccupied(this.ships[i].gridsOccupied, coordinates);
            if (checkHit === true) {
                this.ships[i].hit();
                this.ships[i].isSunk();
                this.gridsShotAt.push(coordinates);
                this.shotsHit.push(coordinates);
                return "hit";
            }
        }
    }

    randomCoordinates() {
        const x = Math.floor(Math.random() * 8);
        const y = Math.floor(Math.random() * 8);
        const arr = [x, y];
        return arr;
    }

    randomAttack() {
        while (true) {
            // const coord = this.randomCoordinates();
            let attk = this.receiveAttack(this.randomCoordinates());
            console.log(attk);
            if (attk === "hit" || attk === "miss") {
                break;
            }
        }
    }

    randomDirection() {
        const x = Math.floor(Math.random() * 2);
        return x;
    }

    randomPlacement() {
        for (let i = 0; i < this.ships.length; i++) {
            const direction = this.randomDirection();
            if (direction === 0) {
                while (true) {
                    const horizontal = this.placeShipHorizontal(this.ships[i], this.randomCoordinates());
                    if (horizontal === "success") {
                        break;
                    }
                }
            }

            if (direction === 1) {
                while (true) {
                    const vertical = this.placeShipVertical(this.ships[i], this.randomCoordinates());
                    if (vertical === "success") {
                        break;
                    }
                }
            }
        }
    }

    checkAllShipsSunk() {
        let sunkCounter = 0;
        this.ships.forEach(element => {
            if (element.sunkStatus === true) sunkCounter++;
        })
        if (sunkCounter === this.ships.length) return true;
        else return false;
    }

    // displayBoard(boardDiv, joinType) {
    //     // const board2 = document.querySelector('#playerTwoBoardDiv');

    //     for (let i = 7; i >= 0; i--) {
    //         for (let j = 0; j < 8; j++) {
    //             let box = document.createElement("div");
    //             boardDiv.appendChild(box);
    //             box.classList.add("box");
    //             box.id = [i,j].join(joinType);

    //             const checkIfOccupied = this.checkOccupied(this.gridsOccupied, [i,j]);
    //             if (checkIfOccupied === true) box.style.backgroundColor = "green";

    //             const checkIfHit = this.checkOccupied(this.shotsHit, [i,j]);
    //             if (checkIfHit === true) {
    //                 if (checkIfOccupied === true) box.style.backgroundColor = "red";
    //             }

    //             const checkIfMiss = this.checkOccupied(this.shotsMissed, [i,j]);
    //             if (checkIfMiss === true) box.classList.add("missed");
    //         }
    //     }
    // }
};

class Player {
    constructor(playerType, playerName) {
        this.playerType = playerType;
        this.playerName = playerName;
        this.gameboard = new Gameboard();
    }

    // createGameBoard() {
    //     const playerGameboard = new Gameboard();
    // }
}

export { Ship, Node, Gameboard, Player };