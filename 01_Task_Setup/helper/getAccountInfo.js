const {
    Client,
    AccountInfoQuery,
    AccountId,
    PrivateKey
} = require("@hashgraph/sdk");
require('dotenv').config({ path: '../../.env' });
const env = require('../../Helper/env');


console.log(env.acccount2.id);
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

    client.setOperator(env.mainAcc.id, env.mainAcc.privateKey);
    const accountInfo = await getAccountInfo(client,env.mainAcc.id);

    //client.setOperator(myAccountId, myPrivateKey);

    // const accountInfo = await getAccountInfo(client,myAccountId);
    process.exit();
}

async function getAccountInfo(client, accountId) {

    //Create the account info query
    const query = new AccountInfoQuery()
        .setAccountId(myAccountId);

    //Sign with client operator private key and submit the query to a Hedera network
    const accountInfo = await query.execute(client);

    //Print the account info to the console
    console.log(`The current account info for ${myAccountId} account is ${accountInfo}`);
    
    return accountInfo;

}

main();
