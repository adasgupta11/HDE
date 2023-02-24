const {
    Client,
    PrivateKey,
    ScheduleInfoQuery,
    Timestamp, Transaction, ScheduleId, AccountId, TransactionId
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

const scheduleId = process.env.SCHEDULE_ID;

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

    //Create the query
    const query = new ScheduleInfoQuery()
        .setScheduleId(scheduleId);

    //Sign with the client operator private key and submit the query request to a node in a Hedera network
    const info = await query.execute(client);
    console.log("The scheduledId you queried for is: ", new ScheduleId(info.scheduleId).toString());
    console.log("The memo for it is: ", info.scheduleMemo);
    console.log("It got created by: ", new AccountId(info.creatorAccountId).toString());
    console.log("It got payed by: ", new AccountId(info.payerAccountId).toString());
    console.log("The expiration time of the scheduled tx is: ", new Timestamp(info.expirationTime).toDate());
    if(new Timestamp(info.executed).toDate().getTime() === new Date("1970-01-01T00:00:00.000Z").getTime()) {
        console.log("The transaction has not been executed yet.");
    } else {
        console.log("The time of execution of the scheduled tx is: ", new Timestamp(info.executed).toDate());
    }

    process.exit();
}

main();
