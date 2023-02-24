const {
    TokenMintTransaction,
    Client,
    TokenInfoQuery, PrivateKey , AccountId
} = require("@hashgraph/sdk");
require('dotenv').config({ path: '../../.env' });

const env = require('../../Helper/env');

const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

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


async function main() {

    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);
    //Create the transaction and freeze for manual signing
    const transaction = await new TokenMintTransaction()
        .setTokenId(tokenId)
        .setAmount(1022)
        .freezeWith(client);

    //Sign the transaction with the client, who is set as supply key
    const signTx =  await transaction.sign(account2Key);
    // const signTx = await (await transaction.sign(account2Key)).sign(account1Key);

    //Submit the signed transaction to a Hedera network
    const txResponse = await signTx.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status.toString();

    console.log("The transaction consensus status is " +transactionStatus);

    //Create the query
    const query = new TokenInfoQuery()
        .setTokenId(tokenId);

    //Sign with the client operator private key, submit the query to the network and get the token supply

    const name = await queryTokenFunction("name", tokenId);
    const symbol = await queryTokenFunction("symbol", tokenId);
    const tokenSupply = await queryTokenFunction("totalSupply", tokenId);
    console.log('The total supply of the ' + name + ' token is ' + tokenSupply + ' of ' + symbol);

    async function queryTokenFunction(functionName, tokenId) {
        //Create the query
        const query = new TokenInfoQuery()
            .setTokenId(tokenId);
    
        console.log(functionName);
        const body = await query.execute(client);
    
        //Sign with the client operator private key, submit the query to the network and get the token supply
        let result;
        if (functionName === "name") {
            result = body.name;
        } else if(functionName ==="symbol") {
            result = body.symbol;
        } else if(functionName === "totalSupply") {
            result = body.totalSupply;
        } else {
            return;
        }
    
        return result
    }

    process.exit();
}



main();
