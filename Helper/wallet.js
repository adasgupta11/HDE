function createWallet(accountDetails) {
    const {
        PrivateKey, Wallet
    } = require("@hashgraph/sdk");

    const accountPrivateKey = PrivateKey.fromString(accountDetails.privateKey);

    const userWallet = new Wallet(
        accountDetails.accountId,
        accountPrivateKey
    );

    return userWallet;

}

module.exports = {
    createWallet
}