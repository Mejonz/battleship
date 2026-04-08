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

// class Node {
//     constructor(coordinates, id) {
//         this.coordinates = coordinates;
//         this.occupancy = null;
//         this.id = id;
//     }
// };

class Gameboard {
    constructor(size = 8) {
        this.size = size;
        this.grid = [];
        this.gridsOccupied = [];
    }

    createNode(x, y, id) {
        const newNode = new Node([x, y], id);
        this.grid.push(newNode);
        return newNode;
    }

    // createBoard() {
    //     let count = 0;
    //     for (let i = 0; i < this.size; i++) {
    //         for (let j = 0; j < this.size; j++) {
    //             this.createNode(i, j, count);
    //             count++;
    //         }
    //     }
    // }

    placeShip(ship, startCoordinate) {
        const xAxisMax = 8 - ship.length;
        if (startCoordinate[0] > xAxisMax) return "please select x-coordinate < " + xAxisMax;
        for (let i = 0; i < ship.length; i++) {
            let newCoordinate = [startCoordinate[0]+i, startCoordinate[1]];
            this.gridsOccupied.push(newCoordinate);
        }
        return this.gridsOccupied;
    } 


};

export { Ship, Node, Gameboard };