import {Ship, Node, Gameboard} from './projectLogic.js';

//test Ship class constructor
const boat = new Ship(4, 'boat');

describe('Ship class constructor', () => {
    test('check length is working', () => {
        expect(boat.length).toBe(4);
    });

    test('check shipId is working', () => {
        expect(boat.shipId).toBe('boat');
    })

    // test('check gridsOccupied is working', () => {
    //     expect(Array.isArray(boat.gridsOccupied)).toBe(true);
    //     expect(boat.gridsOccupied.length).toBe(0);
    // })
});

//test hit()
// boat.hit();

describe('Ship class hit()', () => {
    test('check hit() increases hits by 1 when called', () => {
        expect(boat.hit()).toBe(1);
    });
});

//test isSunk()
describe('Ship class isSunk()', () => {
    test('check this.sunkstatus defaults to false', () => {
        expect(boat.isSunk()).toBe(false);
    });
});

// boat.hits = 4;

describe('Ship class isSunk()', () => {
    test('check this.sunkStatus changes to true when hits === length', () => {
        Object.defineProperty(boat, 'hits', {
            value: 4,
            configurable: true,
        });
        expect(boat.isSunk()).toBe(true);
    });
});

//Gameboard class
const testBoard = new Gameboard();

describe ('Gameboard class placeShipHorizontal', () => {
    test('check Ship cannot be placed when start coordinate > xAxisMax', () => {
        expect(testBoard.placeShipHorizontal(boat, [5,0])).toBe("please select x-coordinate < 4");
    });

    test.skip('check Ship can be placed on board', () => {
        expect(testBoard.placeShipHorizontal(boat,[0,0])).toEqual([[0,0],[1,0],[2,0],[3,0]]);
    });

    test('check ship cannot be placed if grid is occupied', () => {
        Object.defineProperty(testBoard, 'gridsOccupied', {
            value: [[0,0]],
            // configurable: true,
        });
        expect(testBoard.placeShipHorizontal(boat, [0,0])).toBe("coordinates taken, please select a different coordinate");
    });
});

describe('Gameboard class placeShipVertical', () => {
    test('check Ship cannot be placed when start coordinate > yAxisMax', () => {
        expect(testBoard.placeShipVertical(boat, [0,5])).toBe("please select y-coordinate < 4");
    });

    test('check Ship cannot be placed if grid is occupied', () => {
        expect(testBoard.placeShipVertical(boat, [0,0])).toBe("coordinates taken, please select a different coordinate");
    })
    
    test('check Ship can be placed on board', () => {
        Object.defineProperty(testBoard, 'gridsOccupied', {
            value: [],
        });
        expect(testBoard.placeShipVertical(boat, [0,0])).toEqual([[0,0],[0,1],[0,2],[0,3]]);
    });
});

testBoard.createShip(3, 'testShip');
testBoard.placeShipHorizontal(testBoard.ships[0], [1,1]);

describe('Gameboard class createShip()', () => {
    test('test function works', () => {
        expect(testBoard.ships.length).toBe(1);
    });
});

testBoard.receiveAttack([5,5]);
testBoard.receiveAttack([1,1]);

describe('Gameboard receiveAttack()', () => {
    test('check missed attack will update shotsMissed Array', () => {
        expect(testBoard.shotsMissed).toEqual([[5,5]]);
    });

    test('check hit attack updates ship hit counter', () => {
        expect(testBoard.ships[0].hits).toBe(1);
    });

    test('check that cannot fire at same coordinate more than once', () => {
        Object.defineProperty(testBoard, 'gridsShotAt', {
            value: [[6,6]],
        });
        expect(testBoard.receiveAttack([6,6])).toBe("coordinate already fired at, please choose another coordinate");
    });    
});

describe('Gameboard checkAllShipsSunk()', () => {
    test.skip('check function returns false if sunkCounter < array length', () => {
        expect(testBoard.checkAllShipsSunk()).toBe(false);
    });

    testBoard.ships[0].sunkStatus = true;
    test('check function returns true if sunkCounter === array length', () => {
        expect(testBoard.checkAllShipsSunk()).toBe(true);
    });
});

