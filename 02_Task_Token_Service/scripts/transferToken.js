const {
    TransferTransaction,
    Client,
    TokenAssociateTransaction,
    Wallet,
    PrivateKey,
    AccountId
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


    await transferToken(account3Id);
    await transferToken(account4Id);

    process.exit();
}


async function transferToken(receipentId) {

    //Create the transfer transaction
    const transaction = await new TransferTransaction()
        .addTokenTransfer(tokenId, account1Id, -2525)
        .addTokenTransfer(tokenId, receipentId, 2525)
        .freezeWith(client);

    //Sign with the sender account private key
    const signTx =  await transaction.sign(account1Key);

    //Sign with the client operator private key and submit to a Hedera network
    const txResponse = await signTx.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Obtain the transaction consensus status
    const transactionStatus = receipt.status;
    console.log("transfering from account" + account1Id);
    console.log("The transaction consensus status to transfer token " + tokenId + "to account" + receipentId + "is" + transactionStatus.toString());

}

main();
