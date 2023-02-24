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

    //  Before an account that is not the treasury for a token can receive or send this specific token ID, the account
    //  must become “associated” with the token.
    await associateToken(account3Id,account3Key);
    await associateToken(account4Id,account4Key);

    process.exit();
}

async function associateToken(accountId, signerKey) {
    let associateOtherWalletTx = await new TokenAssociateTransaction()
        .setAccountId(accountId)
        .setTokenIds([tokenId])
        .freezeWith(client)
        .sign(signerKey)

    //SUBMIT THE TRANSACTION
    let associateOtherWalletTxSubmit = await associateOtherWalletTx.execute(client);

    //GET THE RECEIPT OF THE TRANSACTION
    let associateOtherWalletRx = await associateOtherWalletTxSubmit.getReceipt(client);

    //LOG THE TRANSACTION STATUS
    console.log(`- Token ${tokenId} association with the ${accountId} account is: ${associateOtherWalletRx.status} \n`);
}

main();
