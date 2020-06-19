const SocialNetwork = artifacts.require("SocialNetwork");
const RoboGame = artifacts.require("RoboGame");
const Bills = artifacts.require("Bills");
const BillsOracle = artifacts.require("BillsOracle");

module.exports = function(deployer) {
  deployer.deploy(SocialNetwork);
  deployer.deploy(RoboGame);
  deployer.deploy(Bills);
  deployer.deploy(BillsOracle);
};
