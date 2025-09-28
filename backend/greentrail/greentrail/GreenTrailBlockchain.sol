// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GreenTrailBlockchain {

    struct Record {
        uint id;
        string entityHash;   // hash of the actual data
        uint timestamp;
    }

    mapping(uint => Record) public transactions;
    mapping(uint => Record) public cars;
    mapping(uint => Record) public buses;
    mapping(uint => Record) public drivers;
    mapping(uint => Record) public guides;
    mapping(uint => Record) public hotels;

    uint private txCount;
    uint private carCount;
    uint private busCount;
    uint private driverCount;
    uint private guideCount;
    uint private hotelCount;

    function addTransaction(string memory entityHash) public returns(uint) {
        txCount++;
        transactions[txCount] = Record(txCount, entityHash, block.timestamp);
        return txCount;
    }

    function addCar(string memory entityHash) public returns(uint) {
        carCount++;
        cars[carCount] = Record(carCount, entityHash, block.timestamp);
        return carCount;
    }

    function addBus(string memory entityHash) public returns(uint) {
        busCount++;
        buses[busCount] = Record(busCount, entityHash, block.timestamp);
        return busCount;
    }

    function addDriver(string memory entityHash) public returns(uint) {
        driverCount++;
        drivers[driverCount] = Record(driverCount, entityHash, block.timestamp);
        return driverCount;
    }

    function addGuide(string memory entityHash) public returns(uint) {
        guideCount++;
        guides[guideCount] = Record(guideCount, entityHash, block.timestamp);
        return guideCount;
    }

    function addHotel(string memory entityHash) public returns(uint) {
        hotelCount++;
        hotels[hotelCount] = Record(hotelCount, entityHash, block.timestamp);
        return hotelCount;
    }
}
