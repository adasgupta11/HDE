const {
    Wallet,
    KeyList,
    PrivateKey,
    AccountCreateTransaction,
    AccountAllowanceApproveTransaction,
    TransferTransaction,
    TransactionId,
    Hbar,
    AccountId,
    Client
} = require("@hashgraph/sdk");

require('dotenv').config({ path: '../../.env' });
const env = require('../../Helper/env');

async function main() {
    if (process.env.MY_ACCOUNT_ID == null || process.env.MY_PRIVATE_KEY == null) {
        throw new Error(
            "Environment variables MY_ACCOUNT_ID, and MY_PRIVATE_KEY are required."
        );
    }
    const wallet = new Wallet(
        process.env.MY_ACCOUNT_ID,
        process.env.MY_PRIVATE_KEY,
    );

    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;
    const account1Id = AccountId.fromString(process.env.ACCOUNT1_ID);
    const account1Key = PrivateKey.fromString(process.env.ACCOUNT1_PRIVATE_KEY);

    const account2Id = AccountId.fromString(process.env.ACCOUNT2_ID);
    const account2Key = PrivateKey.fromString(process.env.ACCOUNT2_PRIVATE_KEY);

    const account3Id = AccountId.fromString(process.env.ACCOUNT3_ID);
    const account3Key = PrivateKey.fromString(process.env.ACCOUNT3_PRIVATE_KEY);

    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);


    //Create the transfer transaction
    const transaction = await new TransferTransaction()
        .addApprovedHbarTransfer(account1Id, new Hbar(20).negated())
        .addHbarTransfer(account3Id, new Hbar(20))
        .freezeWith(client);

    //Sign the transaction with the owner account key
    const signTx = await transaction.sign(account1Key);

    //Sign the transaction with the client operator private key and submit to a Hedera network
    const txResponse = await signTx.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status is " + transactionStatus.toString());
    console.log(txResponse.transactionId.toString())

    process.exit();
}

void main();