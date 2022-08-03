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