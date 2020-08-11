const Bills = artifacts.require("Bills");
const BillsOracle = artifacts.require("BillsOracle");

module.exports = function(deployer) {
  deployer.deploy(Bills);
  deployer.deploy(BillsOracle);
};
