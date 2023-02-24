const {
    TopicCreateTransaction,
    Client,
    PrivateKey, AccountId
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
    //Create the transaction
    let transaction = new TopicCreateTransaction()
        //.setSubmitKey(account1Key.publicKey)
        //.setAdminKey(account1Key.publicKey)
        .setTopicMemo('Certification');
    console.log(`Created a new TopicCreateTransaction with admin and submit key both set to: ${account1Key.publicKey}`);

    //Sign with the client operator private key and submit the transaction to a Hedera network
    let txResponse = await transaction.execute(client);

    //Get the receipt of the transaction
    let receipt = await txResponse.getReceipt(client);

    console.log(receipt)

    //Grab the new topic ID from the receipt
    let topicId = receipt.topicId;

    //Log the topic ID
    console.log(`Your topic ID is: ${topicId}`);

    // Wait 5 seconds between consensus topic creation and subscription
    await new Promise((resolve) => setTimeout(resolve, 5000));

    process.exit();
}

main();
