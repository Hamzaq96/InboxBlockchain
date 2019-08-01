const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode} = require('./compile');

//The first argument is the 12 word mneomonic
const provider = new HDWalletProvider(
    'solar excite venture toddler raccoon assault else huge price pen rescue fiction',
    'https://rinkeby.infura.io/v3/54e3cd4305db449ba97ec7a0d27ab692'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x'+bytecode, arguments: ['Hi there!']})
    .send({ from: accounts[0]});

    console.log('Contract deployed to ', result.options.address);
};

deploy();