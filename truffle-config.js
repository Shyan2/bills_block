require("babel-register");
require("babel-polyfill");
var HDWalletProvider = require("truffle-hdwallet-provider");

const MNEMOIC =
  "churn edit connect bone ask nest come repeat sing axis absent proof";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          MNEMOIC,
          "https://ropsten.infura.io/v3/a8c61bdaa2464fdc9c86231793c5a404"
        );
      },
      network_id: 3,
      gas: 4000000,
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
