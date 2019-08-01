const assert = require('assert'); //node standard library
const ganache = require('ganache-cli');
const Web3 = require('web3'); //It is a constructor, used to create instances of the web3 library
const provider = ganache.provider();
const web3 = new Web3(provider); // creates an instance of web3.
const {interface, bytecode} = require('../compile');

let fetchedAccounts;
let inbox;  //Represents the contract
beforeEach( async() => {
//Get a list of all accounts
fetchedAccounts = await web3.eth.getAccounts();
    
//Use one of those accounts to deploy the contract.
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi there']})
        .send({ from: fetchedAccounts[0], gas: '1000000'})
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        // console.log(inbox);
        assert.ok(inbox.options.address);
    });

    //test for initial message function in index.js
    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there');
    });

    //test for setMessage function in index.js
    it('can change the message', async () => {
        await inbox.methods.setMessage('Bye').send({ from: fetchedAccounts[0]});    
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye');
    });
});

// test code
// class Car{
//     park()
//     {
//         return 'stopped';
//     }

//     drive()
//     {
//         return 'vroom';
//     }
// }

// let car;
// //Runs before each it statements
// beforeEach( () => {
//     car = new Car();
// });

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     });
// });
