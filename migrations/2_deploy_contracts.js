const dapp = artifacts.require("dapp1.sol");

module.exports = function(deployer) {
  deployer.deploy(dapp);
};
