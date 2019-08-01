const path = require('path');
const fs = require('fs');
const solc = require('solc');

//Get the path to the file Inbox.sol
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
//Now to read in the contents of that file.
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, '1').contracts[':Inbox'];
