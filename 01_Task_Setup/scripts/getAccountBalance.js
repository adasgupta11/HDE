const {
    Client,
    AccountBalanceQuery,
    AccountId,
    PrivateKey
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

async function main() {
    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);

    const accountBalance = await verifyBalance(client, myAccountId);


    if (accountBalance) {
        console.log("All account Info:")
        console.log(JSON.stringify(accountBalance));
    }

    process.exit();
}

async function verifyBalance(client, accountId) {

    //Verify the account balance
    const accountBalance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(client);
    
        console.log(`The current account balance for ${accountId} account is ${accountBalance.hbars}`);

    return accountBalance;

}

main();
