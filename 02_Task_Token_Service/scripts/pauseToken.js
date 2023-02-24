const {
    Client,
    TokenPauseTransaction,
    PrivateKey,
} = require("@hashgraph/sdk");
require('dotenv').config({ path: '../../.env' });

const env = require('../../Helper/env');

const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

const account1Id = env.account1.id;
const account1Key = env.account1.privateKey;

const account2Id = env.acccount2.id;
const account2Key = env.acccount2.privateKey;

const account3Id = env.account3.id;
const account3Key = env.account3.privateKey;

const account4Id = env.account4.id;
const account4Key = env.account4.privateKey;


const tokenId = process.env.TOKEN_ID;

// If we weren't able to grab it, we should throw a new error
if (myAccountId == null ||
    myPrivateKey == null ) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}

// Create our connection to the Hedera network
// The Hedera JS SDK makes this really easy!
const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);


async function main() {

    const pauseKey = account1Key;
    await pauseToken(pauseKey);

    process.exit();
}


async function pauseToken(pauseKey) {

//Create the token pause transaction, specify the token to pause, freeze the unsigned transaction for signing
const transaction = await new TokenPauseTransaction()
     .setTokenId(tokenId)
     .freezeWith(client);

//Sign with the pause key 
const signTx = await transaction.sign(pauseKey);

//Submit the transaction to a Hedera network    
const txResponse = await signTx.execute(client);

//Request the receipt of the transaction
const receipt = await txResponse.getReceipt(client);

//Get the transaction consensus status
const transactionStatus = receipt.status;
console.log("pausing the token " + tokenId);
console.log("The transaction consensus status " +transactionStatus.toString());


}

main();
