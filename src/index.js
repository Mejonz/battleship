import "./styles.css";

import {Gameboard, Player, Ship} from './projectLogic.js';

const game = (() => {
    //dom functions
    function displayFriendlyGameboard(player, boardDiv, joinType) {
        for (let i = 7; i >= 0; i--) {
            for (let j = 0; j < 8; j++) {
                let box = document.createElement('div');
                boardDiv.appendChild(box);
                box.classList.add('box');
                box.id = [i,j].join(joinType);

                const checkIfOccupied = player.gameboard.checkOccupied(player.gameboard.gridsOccupied, [i,j]);
                if (checkIfOccupied === true) box.style.backgroundColor = "green";

                const checkIfHit = player.gameboard.checkOccupied(player.gameboard.shotsHit, [i,j]);
                if (checkIfHit === true) {
                    if (checkIfOccupied === true) box.style.backgroundColor = "red";
                }

                const checkIfMiss = player.gameboard.checkOccupied(player.gameboard.shotsMissed, [i,j]);
                if (checkIfMiss === true) box.style.backgroundColor = "grey";
            }
        }
    }

    function displayEnemyGameboard(player, boardDiv, joinType) {
        for (let i = 7; i >= 0; i--) {
            for (let j = 0; j < 8; j++) {
                let box = document.createElement('div');
                boardDiv.appendChild(box);
                box.classList.add('box');
                box.id = [i,j].join(joinType);

                const checkIfOccupied = player.gameboard.checkOccupied(player.gameboard.gridsOccupied, [i,j]);
                // if (checkIfOccupied === true) box.style.backgroundColor = "green";

                const checkIfHit = player.gameboard.checkOccupied(player.gameboard.shotsHit, [i,j]);
                if (checkIfHit === true) {
                    if (checkIfOccupied === true) box.style.backgroundColor = "red";
                }

                const checkIfMiss = player.gameboard.checkOccupied(player.gameboard.shotsMissed, [i,j]);
                if (checkIfMiss === true) box.style.backgroundColor = "grey";
            }
        }
    }

    function checkEndGame(player) {
        const check = player.gameboard.checkAllShipsSunk();
        if (check === true) {
            gameStatus = "end";
            if (player === playerTwo) {
                alert("Player One Wins!");
            }

            if (player === playerOne) {
                alert("Player Two Wins!");
            }
        }
    }

    //global variables
    let gameStatus = null;

    //create players
    const playerOne = new Player('human', 'John');
    const playerTwo = new Player('computer', 'Skynet');

    //create ships
    playerOne.gameboard.createShip(4, 'carrier');
    playerOne.gameboard.createShip(3, 'destroyerOne');
    playerOne.gameboard.createShip(3, 'destroyerTwo');
    playerOne.gameboard.createShip(2, 'submarine');

    playerTwo.gameboard.createShip(4, 'carrier');
    playerTwo.gameboard.createShip(3, 'destroyerOne');
    playerTwo.gameboard.createShip(3, 'destroyerTwo');
    playerTwo.gameboard.createShip(2, 'submarine');

    //temp place ships on board
    playerOne.gameboard.randomPlacement();
    playerTwo.gameboard.randomPlacement();
    // playerOne.gameboard.placeShipHorizontal(playerOne.gameboard.ships[0], [0,0]);
    // playerOne.gameboard.placeShipHorizontal(playerOne.gameboard.ships[1], [1,1]);
    // playerOne.gameboard.placeShipHorizontal(playerOne.gameboard.ships[2], [2,2]);
    // playerOne.gameboard.placeShipHorizontal(playerOne.gameboard.ships[3], [3,3]);

    // playerTwo.gameboard.placeShipVertical(playerTwo.gameboard.ships[0], [0,0]);
    // playerTwo.gameboard.placeShipVertical(playerTwo.gameboard.ships[1], [1,1]);
    // playerTwo.gameboard.placeShipVertical(playerTwo.gameboard.ships[2], [2,2]);
    // playerTwo.gameboard.placeShipVertical(playerTwo.gameboard.ships[3], [3,3]);

    //playerboard display variables
    const playerOneBoard = document.querySelector('#playerOneBoardDiv');
    const playerTwoBoard = document.querySelector('#playerTwoBoardDiv');
    
    //display boards
    displayFriendlyGameboard(playerOne, playerOneBoard, '-');
    displayEnemyGameboard(playerTwo, playerTwoBoard, '_');

    //event listeners
    const randomiseBtn = document.querySelector('#randomPlaceShip');
    randomiseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (gameStatus === null) {
            playerOne.gameboard.gridsOccupied = [];
            for (let i = 0; i < playerOne.gameboard.ships.length; i++) {
                playerOne.gameboard.ships[i].gridsOccupied = [];
            }
            playerOne.gameboard.randomPlacement();
            playerOneBoard.innerHTML = '';
            displayFriendlyGameboard(playerOne, playerOneBoard, '-');
        }    
    });

    const startBtn = document.querySelector('#btnStartGame');
    startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (gameStatus === null) {
            gameStatus = 'play';
        }
        else {
            location.reload();
        }
    })

    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('click', (e) => {
            if (gameStatus === 'play') {
                if (box.id.includes('_')) {
                    const arr = box.id.split('_');
                    const coord = arr.map(Number);
                    // console.log(coord);
                    const shoot = playerTwo.gameboard.receiveAttack(coord);
                    // console.log(shoot);
                    if (shoot === 'miss') {
                        box.style.backgroundColor = "grey";
                    }

                    if (shoot === "hit") {
                        box.style.backgroundColor = "red";
                    }

                    checkEndGame(playerTwo);

                    //computer's turn
                    playerOne.gameboard.randomAttack();
                    playerOneBoard.innerHTML = '';
                    displayFriendlyGameboard(playerOne, playerOneBoard, '-');
                    checkEndGame(playerOne);

                    //end game scenario
                    if (gameStatus === "end") {
                        playerTwoBoard.innerHTML = '';
                        displayEnemyGameboard(playerTwo, playerTwoBoard, '_');
                    }
                }
            }
            
        })
    });

})();





