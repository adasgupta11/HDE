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

// const myAccountId = "put your account ID here";
// const myPrivateKey = "put your private key here";

async function main() {

    const account1Id = AccountId.fromString(process.env.ACCOUNT1_ID);
    const account1Key = PrivateKey.fromString(process.env.ACCOUNT1_PRIVATE_KEY);
    const account2Id = AccountId.fromString(process.env.ACCOUNT2_ID);
    const account2Key = PrivateKey.fromString(process.env.ACCOUNT1_PRIVATE_KEY);
    const multiAccount = process.env.ACCOUNT_MULTI_KEY

    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);

    // Create the transfer transaction
    //The node account ID to submit the transaction to. You can add more than 1 node account ID to the list
    const nodeId = [];
    nodeId.push(new AccountId(3));

    //Create the transfer transaction
    const transferTransaction = new TransferTransaction()
        .addHbarTransfer(multiAccount, new Hbar(1))
        .addHbarTransfer(myAccountId, new Hbar(-1))
        .setNodeAccountIds(nodeId);

    //Freeze the transaction from further modifications
    const transaction = await transferTransaction.freezeWith(client);

    //Signer one signs the transaction with their private key
    const signature1 = account1Key.signTransaction(transaction);

    //Signer two signs the transaction with their private key
    //const signature2 = account2Key.signTransaction(transaction);

    //Collate all three signatures with the transaction
    const signedTransaction = transaction.addSignature(account1Key.publicKey, signature1);
                                         //.addSignature(account1Key.publicKey, signature2);



   //signature1, signature2, and signature3 are returned back to you
    console.log(`Doing transfer from ${multiAccount} to ${myAccountId}`);
    
    // Sign with the client operator key and submit the transaction to a Hedera network
    const txId = await signedTransaction.execute(client);

    // console.log(JSON.stringify(txId));

    // Request the receipt of the transaction
    const receipt = await txId.getReceipt(client);


    // console.log(JSON.stringify(receipt));

    // Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status is " + transactionStatus);
    
    const queryMine = new AccountBalanceQuery().setAccountId(myAccountId);
    const queryOther = new AccountBalanceQuery().setAccountId(multiAccount);

    const accountBalanceMine = await queryMine.execute(client);
    const accountBalanceOther = await queryOther.execute(client);

    console.log(`My account balance ${accountBalanceMine.hbars} HBar, other account balance ${accountBalanceOther.hbars}`);


    process.exit();
}

main();
