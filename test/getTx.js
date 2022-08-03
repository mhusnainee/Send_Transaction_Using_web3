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