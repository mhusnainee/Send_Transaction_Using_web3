const SendTx = artifacts.require("SendTx");

module.exports = function (deployer) {
  deployer.deploy(SendTx);
};
