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
