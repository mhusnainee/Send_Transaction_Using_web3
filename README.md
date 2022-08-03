# Send Transaction using web3

Write a contract, build and deploy it using truffle on Rinkeby testnet. Write a JavaScript code to sign and send a transaction to the deployed contract. Write a JavaScript code to get the transaction (calling a getter function).


## Roadmap

- Setting up Environment for Truffle

- Installing necessary tools

- Writing Smart Contract
- Compiling and deploying Smart Contract on Public Blockchain (Rinkeby)
- Writing a JavaScript code to sign and send transaction
- Writing a JavaScript code to get transaction (calling a getter function)
- Testing scripts


## Setting up Environement for truffle
### Prerequisite for truffle

Node.js => 14.0.0-17.0.0

Git => 2.10.0

NPM => 6.14.15-9.0.0

Truffle suit => 5.0.0-6.0.0

Ganache => 6.0.0-8.0.0

Install  truffle with npm

```bash
  npm install -g truffle
```

Install web3

```bash
  npm install web3
```

Install dotenv

```bash
  npm install dotenv
```

Install truffle hdwallet provider

```bash
npm install @truffle/hdwallet-provider
```

## Getting started

Run the following commands

```bash
npm init -y
npx truffle init
```

#### Now replace ```Migrations.sol``` contract with your custom contract in the contracts folder

```bash
//SPDX-License-Identifier:GPL-3.0

pragma solidity >= 0.7.0 <0.9.0;

contract SendTx
{
    uint public number;

    /**
    * @dev set function is used to set the value of number.
    * @param _num - Will be assigned to variable number.
    */
    function set(uint _num) public{
        number = _num;
    }

    /**
     * @dev get function is used to get the value of number.
     */
    function get() public view returns(uint)
    {
        return number;
    }
}
```
Now replace the ```1_Migrations.js``` file with the following file

```bash
const SendTx = artifacts.require("SendTx");

module.exports = function (deployer) {
  deployer.deploy(SendTx);
};
```

Now configure the ```truffle-config.js``` file like this...
where mnemonic is the security phrase of your wallet like MetaMask

```bash
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = 'Enter your mnemonic here';
 
module.exports = {
    networks: {
    rinkeby: {
        provider: () => new HDWalletProvider(mnemonic, `Enter your infura API`),
        network_id: 4,
        gas: 5500000,
        confirmations: 2,
        timeoutBlocks: 200,
        skipDryRun: true
    },
    },
   mocha: {
   },
   compilers: {
     solc: {
       version: "0.8.15",
     }
   },
 };
```

## Time to compile and deploy the contract on Rinkeby testnet

```bash
npx truffle migrate --network rinkeby
```

### You will get a contract address, copy and paste that address in the ```process.env``` file (that we will create next)

now create a file with name ```process.env``` and paste the following code in it

```bash
API_URL = "Paste your infura API URL here"
PRIVATE_KEY = "Paste your private key here"
CONTRACT_ADDRESS = "Paste your "
ACCOUNT_ADDRESS = "0x049fd9EbD3e514D28745Eac8c9D6B67655479d2b"
```

## Writing JavaScript files

Create two JavaScript files i test folder named ```sendTx.js``` and ```getTx.js``` for sending and getting transaction and paste the following codes in them...

```sendTx.js```

```bash
const Web3 = require("web3");
require("dotenv").config({path: __dirname + "/./../process.env"});
const abiFile = require("../build/contracts/SendTx.json");

const web3 = new Web3(process.env.API_URL);

const pvtKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const accountAddress = process.env.ACCOUNT_ADDRESS;

const contract = new web3.eth.Contract(abiFile.abi, contractAddress);

const sendTransaction = async() =>
{
    const _from = accountAddress;
    
    const tx = {
        from: _from,
        to: contractAddress,
        gas: 300000,
        data: contract.methods.set(2017).encodeABI()
    }

    const signed = await web3.eth.accounts.signTransaction(tx, pvtKey);
    
    web3.eth.sendSignedTransaction(signed.rawTransaction).on(
        "receipt", (receipt)=>{
            console.log(receipt);
        }
    )
}
console.log("Sending Transaction and saving value of number as 2017 ...");
sendTransaction();
```

``` getTx.js```

```bash
const Web3 = require('web3');
require("dotenv").config({path: __dirname + "/./../process.env"});
const abiFile = require("../build/contracts/SendTx.json");

const getTransaction = async()=>
{
    const web3 = new Web3(process.env.API_URL);
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
    const CONTRACT_ABI =  abiFile.abi;

    const sendTxContract = new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);
    const getTx = await sendTxContract.methods.get().call()
    console.log("Calling get Function and getting the value of number which is :", getTx);
    console.log("Transaction sucessfull ...");
}
getTransaction();
```

Save these files

# Testing

Now it's time to test our scripts by interacting with contract that we have deployed on Rinkeby testnet

Run the following command

```bash
node test/sendTx.js
```

You should get response like this...

![send](https://user-images.githubusercontent.com/96762657/182704637-5a44e0e0-9bdf-4566-baa1-dada3dd5080a.PNG)

Now run the ```getTx.js``` file by following command

```bash
node test/getTx.js
```

You should get result like this...

![get](https://user-images.githubusercontent.com/96762657/182705306-2bd6ec22-9a22-4693-bb75-6afb9c7de404.PNG)


## It's Done
