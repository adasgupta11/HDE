const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar} = require("@hashgraph/sdk");
require('dotenv').config({ path: '../../.env' });
const env = require('../../Helper/env');

async function main() {

    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    if (myAccountId == null ||
        myPrivateKey == null ) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }

    // var accoutDetails = [];
    var accountDetailsAll = {};


    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);

    // Generating 5 Accounts 
    for (let i = 1; i <= 5; i++) {
        const accountDetails = await createAccount(client);
        const Key = "ACCOUNT".concat(i)
        accountDetailsAll = await Object.assign({ [Key]: accountDetails }, accountDetailsAll);
    }

    // Writting account details in a JSON file
    await fileWrite(accountDetailsAll);

    process.exit();

}

main();


async function createAccount(client) {

    //Create new keys
    const newAccountPrivateKey = PrivateKey.generateED25519();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    //Create a new account with 300 Hbar starting balance
    const newAccount = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(new Hbar(300))
        .setTransactionMemo("Certification Account create")
        .setAccountMemo("Certification Account")
        .execute(client);

    // Get the new account ID
    const getReceipt = await newAccount.getReceipt(client);
    const newAccountId = getReceipt.accountId;

    console.log("The generated account ID is: " + newAccountId);
    console.log(`Private key for ${newAccountId} is ${newAccountPrivateKey}`);
    console.log(`Public key for ${newAccountId} is ${newAccountPublicKey}`);
    const accountBalance = await verifyBalance(client, newAccountId)

    return { accountId: newAccountId.toString(), publicKey: newAccountPublicKey.toString(), privateKey: newAccountPrivateKey.toString(), balance: accountBalance.hbars};

}

async function verifyBalance(client, accountId) {

    //Verify the account balance
    const accountBalance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(client);

    console.log(`The initial account balance for ${accountId} account is ${accountBalance.hbars}`);

    return accountBalance;

}


async function fileWrite(config) {
    const { writeFileSync } = require('fs');

    const path = '../../accountDetails.json';
    
    try {
        console.log(config);
        writeFileSync(path, JSON.stringify(config, null, 2), 'utf8');
        console.log('Data successfully saved to disk');
    } catch (error) {
        console.log('An error has occurred ', error);
    }

}