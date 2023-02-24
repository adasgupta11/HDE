const {
    TopicMessageSubmitTransaction,
    Client, PrivateKey, AccountId
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

const topicId = process.env.TOPIC_ID;

// If we weren't able to grab it, we should throw a new error
if (myAccountId == null ||
    myPrivateKey == null ) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}

// Create our connection to the Hedera network
// The Hedera JS SDK makes this really easy!
const client = Client.forTestnet();



client.setOperator(account1Id, account1Key);


async function main() {
    const currentDate = new Date();            
    const message =  currentDate.toLocaleString();

// Send one message
    let sendResponse = await new TopicMessageSubmitTransaction({
        topicId: topicId,
        message: message,
    }).execute(client);

//Get the receipt of the transaction
    const getReceipt = await sendResponse.getReceipt(client);

//Get the status of the transaction
    const transactionStatus = getReceipt.status
    console.log("The message transaction status: " + transactionStatus.toString());

    process.exit();
}

main();
