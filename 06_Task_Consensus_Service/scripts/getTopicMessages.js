const {
    TopicMessageQuery,
    Client, PrivateKey, AccountId
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



const topicId = process.env.TOPIC_ID;


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
    //Create the query to subscribe to a topic
    new TopicMessageQuery()
        .setTopicId(topicId)
        .setStartTime(0)
        .subscribe(client, null, (message) => {
            let messageAsString = Buffer.from(message.contents, "utf8").toString();
            console.log(
              `${message.consensusTimestamp.toDate()} Received: ${messageAsString}`
            );
          });

}

main();
