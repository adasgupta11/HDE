const {
    Client,
    TokenDeleteTransaction,
    Wallet,
    PrivateKey, AccountId
} = require("@hashgraph/sdk");
require('dotenv').config({ path: '../../.env' });

// Treasury account -> Account1 , Supply account -> Account2, Admin account -> myaccount or Accout1?


const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;

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

    //Create the transaction and freeze the unsigned transaction for manual signing
    const transaction = await new TokenDeleteTransaction()
        .setTokenId(tokenId)
        .freezeWith(client);

    //Sign with the admin private key of the token
    const signTx = await transaction.sign(myPrivateKey);

    //Submit the transaction to a Hedera network
    const txResponse = await signTx.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status " +transactionStatus.toString());

    process.exit();
}

main();
