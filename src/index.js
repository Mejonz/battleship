import "./styles.css";

import {Gameboard, Player, Ship} from './projectLogic.js';

const startGameBtn = document.querySelector('#btnStartGame');
let playerOne;
let playerTwo;

//playboard display variables
const playerOneBoard = document.querySelector('#playerOneBoardDiv');
const playerTwoBoard = document.querySelector('#playerTwoBoardDiv');

function resetPlayers() {
    playerOne = null;
    playerTwo = null;
}

function resetDisplay(divToReset) {
    divToReset.innerHTML = '';
}

startGameBtn.addEventListener('click', (e) => {
    e.preventDefault();

    //reset stuff
    resetPlayers();
    resetDisplay(playerOneBoard);
    resetDisplay(playerTwoBoard);

    // create players
    playerOne = new Player('human', 'John');
    playerTwo = new Player('computer', 'Skynet');

    // create gameboards & ships
    playerOne.gameboard.createShip(4, 'carrier');
    playerOne.gameboard.createShip(3, 'destroyerOne');
    playerOne.gameboard.createShip(3, 'destroyerTwo');
    playerOne.gameboard.createShip(2, 'submarine');

    playerTwo.gameboard.createShip(4, 'carrier');
    playerTwo.gameboard.createShip(3, 'destroyerOne');
    playerTwo.gameboard.createShip(3, 'destroyerTwo');
    playerTwo.gameboard.createShip(2, 'submarine');

    //temp place ships
    playerOne.gameboard.placeShipHorizontal(playerOne.gameboard.ships[0], [0,0]);
    playerOne.gameboard.placeShipHorizontal(playerOne.gameboard.ships[1], [1,1]);
    playerOne.gameboard.placeShipHorizontal(playerOne.gameboard.ships[2], [2,2]);
    playerOne.gameboard.placeShipHorizontal(playerOne.gameboard.ships[3], [3,3]);

    playerTwo.gameboard.placeShipVertical(playerTwo.gameboard.ships[0], [0,0]);
    playerTwo.gameboard.placeShipVertical(playerTwo.gameboard.ships[1], [1,1]);
    playerTwo.gameboard.placeShipVertical(playerTwo.gameboard.ships[2], [2,2]);
    playerTwo.gameboard.placeShipVertical(playerTwo.gameboard.ships[3], [3,3]);


    //displayBoards
    playerOne.gameboard.displayBoard(playerOneBoard, '-');
    playerTwo.gameboard.displayBoard(playerTwoBoard, '_');

     //test
    playerOne.gameboard.receiveAttack([0,0]);
    playerOne.gameboard.receiveAttack([0,1]);
    resetDisplay(playerOneBoard);
    playerOne.gameboard.displayBoard(playerOneBoard, '-');
    playerTwo.gameboard.receiveAttack([0,0]);
    playerTwo.gameboard.receiveAttack([2,1]);
    resetDisplay(playerTwoBoard);
    playerTwo.gameboard.displayBoard(playerTwoBoard, '_');
});



