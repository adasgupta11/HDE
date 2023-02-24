const {
    AccountId,
    PrivateKey
} = require("@hashgraph/sdk");
require('dotenv').config({ path: '../.env' });

const env = {
  myAcc: {
    name: "main",
    id: AccountId.fromString(process.env.MY_ACCOUNT_ID),
    privateKey: PrivateKey.fromString(process.env.MY_PRIVATE_KEY),
  },
  account1: {
    name: "account1",
    id: AccountId.fromString(process.env.ACCOUNT1_ID),
    privateKey: PrivateKey.fromString(process.env.ACCOUNT1_PRIVATE_KEY)
  },
  acccount2: {
    name: "account2",
    id: AccountId.fromString(process.env.ACCOUNT2_ID),
    privateKey: PrivateKey.fromString(process.env.ACCOUNT2_PRIVATE_KEY)
  },
  account3: {
    name: "account3",
    id: AccountId.fromString(process.env.ACCOUNT3_ID),
    privateKey: PrivateKey.fromString(process.env.ACCOUNT3_PRIVATE_KEY)
  },
  account4: {
    name: "account4",
    id: AccountId.fromString(process.env.ACCOUNT4_ID),
    privateKey: PrivateKey.fromString(process.env.ACCOUNT4_PRIVATE_KEY),
  },
  account5: {
    name: "account5",
    id: AccountId.fromString(process.env.ACCOUNT5_ID),
    privateKey: PrivateKey.fromString(process.env.ACCOUNT5_PRIVATE_KEY),
  },
  scheduleId: process.env.SCHEDULE_ID,
  topicId: process.env.TOPIC_ID,
  tokenId: process.env.TOKEN_ID,
  multiSigAccId: process.env.MULTI_SIG_ACC_ID,
  contractId: process.env.CONTRACT_ID,
};

module.exports = env;

