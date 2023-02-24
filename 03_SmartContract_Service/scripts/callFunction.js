const {
    Client,
    ContractFunctionParameters,
    ContractExecuteTransaction,
    PrivateKey,
    AccountId,
    web3
} = require("@hashgraph/sdk");
require('dotenv').config({ path: '../../.env' });
const env = require('../../Helper/env');

const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

const account1Id = AccountId.fromString(process.env.ACCOUNT1_ID);
const account1Key = PrivateKey.fromString(process.env.ACCOUNT1_PRIVATE_KEY);

const account2Id = AccountId.fromString(process.env.ACCOUNT2_ID);
const account2Key = PrivateKey.fromString(process.env.ACCOUNT2_PRIVATE_KEY);

const account3Id = AccountId.fromString(process.env.ACCOUNT3_ID);
const account3Key = PrivateKey.fromString(process.env.ACCOUNT3_PRIVATE_KEY);

const account4Id = AccountId.fromString(process.env.ACCOUNT4_ID);
const account4Key = PrivateKey.fromString(process.env.ACCOUNT4_PRIVATE_KEY);

const account5Id = AccountId.fromString(process.env.ACCOUNT5_ID);
const account5Key = PrivateKey.fromString(process.env.ACCOUNT5_PRIVATE_KEY);
const contractId = process.env.CONTRACT_ID;

// If we weren't able to grab it, we should throw a new error
if (myAccountId == null ||
    myPrivateKey == null) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}

// Create our connection to the Hedera network
// The Hedera JS SDK makes this really easy!
const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);


function decodeFunctionResult(functionName, resultAsBytes) {
    const abiFile = require('../artifacts/contracts/certificationC3.sol/CertificationC1.json');
    abi = abiFile.abi;
    const functionAbi = abi.find((func) => func.name === functionName);
    const functionParameters = functionAbi.outputs;
    const resultHex = "0x".concat(Buffer.from(resultAsBytes).toString("hex"));
    const result = web3.eth.abi.decodeParameters(functionParameters, resultHex);
    return result;
}


async function main() {

    //Create the transaction to update the contract message
    const contractExecTx = await new ContractExecuteTransaction()
        //Set the ID of the contract
        .setContractId(contractId)
        //Set the gas for the contract call
        .setGas(100000)
        //Set the contract function to call
        .setFunction('function1', new ContractFunctionParameters().addUint16(6).addUint16(7));

    //Submit the transaction to a Hedera network and store the response
    const submitExecTx = await contractExecTx.execute(client);

    //Get the receipt of the transaction
    const receipt2 = await submitExecTx.getReceipt(client);

    //Confirm the transaction was executed successfully
    console.log('The transaction status is ' + receipt2.status.toString());

    // // a record contains the output of the function
    // // as well as events, let's get events for this transaction
    // const record = await submitExecTx.getRecord(client);

    // a record contains the output of the function
    const record = await submitExecTx.getRecord(client);
    // the result of the function call is in record.contractFunctionResult.bytes
    // let`s parse it using web3.js


    let result =  record.contractFunctionResult.getUint160(0);
    console.log("the function1 result is: " +result);


    // calling function2

    const contractExecTx2 = await new ContractExecuteTransaction()
        //Set the ID of the contract
        .setContractId(contractId)
        //Set the gas for the contract call
        .setGas(100000)
        //Set the contract function to call
        .setFunction('function2', new ContractFunctionParameters().addUint16(result));

    //Submit the transaction to a Hedera network and store the response
    const submitExecTx2 = await contractExecTx2.execute(client);

    //Get the receipt of the transaction
    const receipt22 = await submitExecTx2.getReceipt(client);

    //Confirm the transaction was executed successfully
    console.log('The transaction status is ' + receipt22.status.toString());

    // // a record contains the output of the function
    // // as well as events, let's get events for this transaction
    // const record = await submitExecTx.getRecord(client);

    // a record contains the output of the function
    const record2 = await submitExecTx2.getRecord(client);
    // the result of the function call is in record.contractFunctionResult.bytes
    // let`s parse it using web3.js


    let result2 =  record2.contractFunctionResult.getUint160(0);
    console.log("the function2 result is: " +result2);

    // const results = decodeFunctionResult(
    //     'function1',
    //     record.contractFunctionResult.bytes
    // );
    // console.log(results.result);

    // // the events from the function call are in record.contractFunctionResult.logs.data
    // // let's parse the logs using web3.js
    // // there may be several log entries
    // record.contractFunctionResult.logs.forEach(log => {
    //     // convert the log.data (uint8Array) to a string
    //     let logStringHex = '0x'.concat(Buffer.from(log.data).toString('hex'));

    //     // get topics from log
    //     let logTopics = [];
    //     log.topics.forEach(topic => {
    //         logTopics.push('0x'.concat(Buffer.from(topic).toString('hex')));
    //     });

    //     // decode the event data
    //     decodeEvent('DocumentSealed', logStringHex, logTopics.slice(1));

    // });


    process.exit();
}

main();
