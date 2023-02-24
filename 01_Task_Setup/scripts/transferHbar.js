const {
    Client,
    AccountBalanceQuery,
    TransferTransaction,
    Hbar,
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
    const fromAccount = myAccountId;
    const toAccount = account2Id;
    const amount = new Hbar(1)



    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);

    // Create the transfer transaction
    const transaction = new TransferTransaction()
    .addHbarTransfer(fromAccount, amount.negated())
    .addHbarTransfer(toAccount, amount);
    
    console.log(`Doing transfer from ${fromAccount} to ${toAccount}`);
    
    // Sign with the client operator key and submit the transaction to a Hedera network
    const txId = await transaction.execute(client);


    // Request the receipt of the transaction
    const receipt = await txId.getReceipt(client);



    // Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status is " + transactionStatus);

    // Create the queries
    const queryFrom = new AccountBalanceQuery().setAccountId(fromAccount);
    const queryTo = new AccountBalanceQuery().setAccountId(toAccount);

    const accountBalanceFrom = await queryFrom.execute(client);
    const accountBalanceTo = await queryTo.execute(client);

    console.log(`From account balance ${accountBalanceFrom.hbars} HBar, To account balance ${accountBalanceTo.hbars}`);

    process.exit();
}

main();
