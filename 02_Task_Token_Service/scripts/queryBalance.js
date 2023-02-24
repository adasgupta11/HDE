const {
    Client,
    AccountBalanceQuery, PrivateKey, Wallet, AccountId
} = require("@hashgraph/sdk");
require('dotenv').config({ path: '../../.env' });
const env = require('../../Helper/env');

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

    const userWalletBalance = await  queryBalance(account1Id);
    const otherWalletBalance = await queryBalance(account2Id);

    console.log("The balance of the user is: " + userWalletBalance.tokens.get(tokenId));
    console.log("The balance of the other user is: " + otherWalletBalance.tokens.get(tokenId));

    process.exit();
}

async function queryBalance(accountId) {
    //Create the query
    const balanceQuery = new AccountBalanceQuery()
        .setAccountId(accountId);

    //Sign with the client operator private key and submit to a Hedera network
    const tokenBalance = await balanceQuery.execute(client);

    return tokenBalance;
}

main();
