const {
    TokenCreateTransaction,
    Client,
    TokenType,
    TokenInfoQuery,
    AccountBalanceQuery, PrivateKey, Wallet,
    TokenSupplyType,
    AccountId,
    Hbar
} = require("@hashgraph/sdk");
require('dotenv').config({ path: '../../.env' });

const env = require('../../Helper/env');

// Treasury account -> Account1 , Supply account -> Account2


const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;

// const account1Id = AccountId.fromString(process.env.ACCOUNT1_ID);
// const account1Key = PrivateKey.fromString(process.env.ACCOUNT1_PRIVATE_KEY);

const account1Id = env.account1.id;
const account1Key = env.account1.privateKey;

// const account2Id = AccountId.fromString(process.env.ACCOUNT2_ID);
// const account2Key = PrivateKey.fromString(process.env.ACCOUNT2_PRIVATE_KEY);

const account2Id = env.acccount2.id;
const account2Key = env.acccount2.privateKey;


if (myAccountId == null ||
    myPrivateKey == null ) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}


// Create our connection to the Hedera network
// The Hedera JS SDK makes this really easy!
const client = Client.forTestnet();

client.setOperator(env.myAcc.id, env.myAcc.privateKey);

async function main() {
 
    //Create the transaction and freeze for manual signing
    const transaction = await new TokenCreateTransaction()
        .setTokenName("certification coin")
        .setTokenSymbol("HCC")
        .setTokenType(TokenType.FungibleCommon)
        .setTreasuryAccountId(account1Id)
        .setDecimals(2)
        .setInitialSupply(35050)
        .setMaxSupply(50000)
        .setSupplyType(TokenSupplyType.Finite)
        .setAdminKey(account1Key.publicKey)
        .setSupplyKey(account2Key.publicKey)
        .setPauseKey(account1Key.publicKey)
        .freezeWith(client);

    //Sign the transaction with the client, who is set as admin and treasury account
    const signTx =  await transaction.sign(account1Key);
    //const signTx =  await (await transaction.sign(account2.privateKey)).sign(account1.privateKey);

    //Submit to a Hedera network
    const txResponse = await signTx.execute(client);

    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the token ID from the receipt
    const tokenId = receipt.tokenId;

    console.log("The new token ID is " + tokenId);

    //Sign with the client operator private key, submit the query to the network and get the token supply

    const name = await queryTokenFunction("name", tokenId);
    const symbol = await queryTokenFunction("symbol", tokenId);
    const tokenSupply = await queryTokenFunction("totalSupply", tokenId);
    console.log('The total supply of the ' + name + ' token is ' + tokenSupply + ' of ' + symbol);

    //Create the query
    const balanceQuery = new AccountBalanceQuery()
        .setAccountId(account1Id);

    //Sign with the client operator private key and submit to a Hedera network
    const tokenBalance = await balanceQuery.execute(client);

    console.log("The balance of the user is: " + tokenBalance.tokens.get(tokenId));

    process.exit();
}

async function queryTokenFunction(functionName, tokenId) {
    //Create the query
    const query = new TokenInfoQuery()
        .setTokenId(tokenId);

    console.log("retrieveing the " + functionName);
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

main();
