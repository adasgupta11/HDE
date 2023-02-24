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

    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);


     //Create new keys
     const newAccountPrivateKey = PrivateKey.generateED25519();
     const newAccountPublicKey = newAccountPrivateKey.publicKey;
 
     //Create a new account with 1 HBar starting balance
     const newAccount = await new AccountCreateTransaction()
         .setKey(newAccountPublicKey)
         .setInitialBalance(new Hbar(1))
         .setTransactionMemo("Certification Account create")
         .setAccountMemo("Certification Account")
         .execute(client);
 
     // Get the new account ID
     const getReceipt = await newAccount.getReceipt(client);
     const newAccountId = getReceipt.accountId;
 
     console.log("The new account ID is: " + newAccountId);
     console.log(`Private key for ${newAccountId} is ${newAccountPrivateKey}`);
     console.log(`Public key for ${newAccountId} is ${newAccountPublicKey}`);

     const accountBalance = await verifyBalance(client, newAccountId)

     console.log(`The initial account balance for ${newAccountId} account is ${accountBalance.hbars}`);

    process.exit();

}

main();


async function verifyBalance(client, accountId) {

    //Verify the account balance
    const accountBalance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(client);

    return accountBalance;

}
