var BillsOracle = artifacts.require("BillsOracle");

module.exports = function (deployer) {
  deployer.deploy(BillsOracle);
};
