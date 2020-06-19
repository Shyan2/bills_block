import React, { Component } from "react";
import axios from "axios";
import Web3 from "web3";
import Bills from "../../abis/Bills.json";
import BillsOracle from "../../abis/BillsOracle.json";
import "../App.css";

import BN from "bn.js";

import BillTable from "./BillTable";
import BillForm from "./BillForm";
import BillLog from "./BillLog";

import Button from "@material-ui/core/Button";

var pendingRequests = [];
class Bill extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.loadOracle();
    // await this.retrieveLatestppi();
  }

  async retrieveLatestppi() {
    const resp = await axios({
      url: "https://api.binance.com/api/v3/ticker/price",
      params: {
        symbol: "ETHUSDT",
      },
      method: "get",
    });
    this.setState({ tempppi: resp.data.price });
    return resp.data.price;
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    //load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] }); //first is the one connected with metamask (an array)
    const networkId = await web3.eth.net.getId();
    const networkData = Bills.networks[networkId];
    if (networkData) {
      console.log("Network ID: " + networkId);
      const billQuantity = web3.eth.Contract(Bills.abi, networkData.address);
      console.log("Contract address: " + networkData.address); //contract address
      this.setState({ billQuantity }); //this.setState({ billQuantity: billQuantity });
      //call only reads data (no gas), send requires gas
      const billCount = await billQuantity.methods.billCount().call();
      this.setState({ billCount });

      // const billLog = await billQuantity.getPastEvents("allEvents", {
      //   fromBlock: 0,
      //   toBlock: "latest",
      // });

      const billLog = await billQuantity.getPastEvents("BillCreated", {
        fromBlock: 0,
        toBlock: "latest",
      });

      const billCreatedLog = await billQuantity.getPastEvents("BillCreated", {
        fromBlock: 0,
        toBlock: "latest",
      });

      for (var i = 1; i <= billCount; i++) {
        const bill = await billQuantity.methods.bills(i).call();

        //match ids for timestamp
        for (var j = 0; j <= billCreatedLog.length - 1; j++) {
          if (
            billCreatedLog[j].returnValues.id.toString() === bill.id.toString()
          ) {
            await window.web3.eth
              .getBlock(billCreatedLog[j].blockNumber)
              .then((result) => {
                let timestamp = result.timestamp;
                //console.log(timestamp);
                bill["timestamp"] = timestamp.toString();
              });
          }
        }

        this.setState({
          bills: [...this.state.bills, bill], //adds bills to the end of the array, new in es6 and react
        });
      }

      //log timestamps
      for (var i = 0; i <= billLog.length - 1; i++) {
        const log = billLog[i];

        await window.web3.eth
          .getBlock(billLog[i].blockNumber)
          .then((result) => {
            let logTimestamp = result.timestamp;
            //console.log(logTimestamp);
            log["timestamp"] = logTimestamp.toString();
          });

        this.setState({ logs: [...this.state.logs, log] });
      }

      //all the data finished processing/loading
      this.setState({ loading: false });
    } else {
      window.alert("Bill contract not deployed to the detected network.");
    }
  }

  async loadOracle() {
    //oracle handler, connected to the same blockchain
    //BillsOracle address: 0x2ee5eFbBEcbe91DC65EAF58E5FF3864542D33a87, owner: 0x023f249EE2850b5554845eEaF34608097E9E7c10
    const web3 = window.web3;
    //load account
    // const accounts = await web3.eth.getAccounts();
    // this.setState({ account: accounts[0] }); //first is the one connected with metamask (an array)
    const networkId = await web3.eth.net.getId();
    const networkData = BillsOracle.networks[networkId];
    if (networkData) {
      //console.log("Network ID: " + networkId);
      const oracleContract = web3.eth.Contract(
        BillsOracle.abi,
        networkData.address
      );
      console.log("Oracle Contract address: " + networkData.address); //contract address
      this.setState({ oracleContract }); //this.setState({ billQuantity: billQuantity });
      //console.log(oracleContract);
      this.setState({ oracleAddress: networkData.address });

      // const oracleAddress = await this.state.billQuantity.methods
      //   .oracleAddress()
      //   .call();
      // //console.log(oracleAddress);
      // this.setState({ oracleAddress });

      // await this.state.billQuantity.methods
      //   .updateppiPrice()
      //   .send({ from: this.state.account });
    } else {
      window.alert("Oracle contract not deployed to the detected network.");
    }
  }

  //Bill.sol functions
  setOracleInstanceAddress(address) {
    // address = "0x2ee5eFbBEcbe91DC65EAF58E5FF3864542D33a87";
    this.state.billQuantity.methods
      .setOracleInstanceAddress(address)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        //console.log(hash);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        console.log("oracle address set confirmation.");
      });
  }

  updateppi() {
    console.log("entered updateppi");
    this.state.billQuantity.methods
      .updateppiPrice()
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        //console.log(hash);
        this.filterOracleEvents();
        this.filterCallerEvents();
      })
      .once("confirmation", (confirmationNumber, receipt) => {
        console.log("updateppi confirmation.");
        // this.filterOracleEvents();
        // this.filterCallerEvents();

        this.processQueue(this.state.account);
        // setTimeout(async () => {
        //   await this.processQueue(this.state.account);
        // }, 2000);
      });
  }

  createBill(workSection, component, itemDescription, unit, baseppi, ppi) {
    this.setState({ loading: true });
    this.state.billQuantity.methods
      .createBill(workSection, component, itemDescription, unit, baseppi, ppi)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        //console.log(hash);
        this.setState({ hash });
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        console.log("CreateBill confirmation complete.");
        //console.log(confirmationNumber, receipt);
        this.setState({ loading: false });
      });
  }

  setUnitPrice(id, newUnitPrice) {
    this.setState({ loading: true });
    this.state.billQuantity.methods
      .setUnitPrice(id, newUnitPrice)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        //console.log(hash);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        console.log("setUnitPrice confirmation complete.");
        console.log(confirmationNumber, receipt);
        this.setState({ loading: false });
      });
  }

  // filterCallerEvents() {
  //   console.log("filterCallerEvents");
  //   this.state.billQuantity.events.PriceUpdatedEvent(
  //     { fromBlock: "latest", toBlock: "latest", filter: {} },
  //     async (err, event) => {
  //       if (err) {
  //         console.error("Error on event", err);
  //       } else {
  //         console.log(
  //           // "New PriceUpdated event. ppi: " + event.returnValue.ppiValue
  //           "New PriceUpdated event.ppi: " + event.returnValues.ppiValue
  //         );
  //         this.setState({ tempppi: event.returnValues.ppiValue.toString() });
  //       }
  //     }
  //   );

  //   this.state.billQuantity.events.ReceivedNewRequestIdEvent(
  //     { fromBlock: "latest", toBlock: "latest", filter: {} },
  //     async (err, event) => {
  //       if (err) console.error("Error on event", err);
  //       else console.log("Receieve new request ID event");
  //     }
  //   );
  // }
  filterCallerEvents() {
    console.log("filterCallerEvents");
    this.state.billQuantity.once(
      "PriceUpdatedEvent",
      { fromBlock: "latest", toBlock: "latest", filter: {} },
      async (err, event) => {
        if (err) {
          console.error("Error on event", err);
        } else {
          console.log(
            // "New PriceUpdated event. ppi: " + event.returnValue.ppiValue
            "New PriceUpdated event.ppi: " + event.returnValues.ppiValue
          );
          this.setState({ tempppi: event.returnValues.ppiValue.toString() });
        }
      }
    );

    this.state.billQuantity.once(
      "ReceivedNewRequestIdEvent",
      { fromBlock: "latest", toBlock: "latest", filter: {} },
      async (err, event) => {
        if (err) console.error("Error on event", err);
        else console.log("Receieve new request ID event");
      }
    );
  }

  //BillsOracle.sol functions
  // filterOracleEvents() {
  //   console.log("filterOracleEvents");
  //   this.state.oracleContract.events.GetLatestppi(
  //     { fromBlock: "latest", toBlock: "latest", filter: {} },
  //     async (err, event) => {
  //       if (err) {
  //         console.error("Error on event", err);
  //         return;
  //       } else {
  //         // console.log("entered filtered oracle events successfully");
  //         await this.addRequestToQueue(event);
  //       }
  //     }
  //   );

  //   this.state.oracleContract.events.SetLatestppi(async (err, event) => {
  //     if (err) console.error("Error on event", err);
  //     //Do something
  //   });
  // }
  filterOracleEvents() {
    console.log("filterOracleEvents");
    this.state.oracleContract.once(
      "GetLatestppi",
      { fromBlock: "latest", filter: {} },
      async (err, event) => {
        if (err) {
          console.error("Error on event", err);
          return;
        } else {
          //NEED THIS TO ONLY RUN ONCE.

          console.log(event);
          await this.addRequestToQueue(event);

          //IT IS GOING INTO HERE MULTIPLE TIMES!!!!
          //console.log("entered filtered oracle events successfully");
        }
      }
    );

    this.state.oracleContract.once(
      "SetLatestppi",
      { fromBlock: "latest", filter: {} },
      async (err, event) => {
        if (err) console.error("Error on event", err);
        //Do something
      }
    );
  }

  async addRequestToQueue(event) {
    console.log("enterd addREquestToQueue");
    const callerAddress = event.returnValues.callerAddress;
    const id = event.returnValues.id;
    // console.log(callerAddress, id);
    pendingRequests.push({ callerAddress, id });
  }

  async processQueue(ownerAddress) {
    console.log("entered processQueue");
    let processedRequests = 0;
    let CHUNK_SIZE = 1;
    // while (pendingRequests.length > 0 && processedRequests < CHUNK_SIZE) {
    while (pendingRequests.length > 0) {
      console.log("entered the while loop!");
      const req = pendingRequests.shift();
      await this.processRequest(ownerAddress, req.id, req.callerAddress);
      processedRequests++;
    }
  }

  async processRequest(ownerAddress, id, callerAddress) {
    console.log("entered processRequest", id, callerAddress);
    let retries = 0;
    let MAX_RETRIES = 1;
    while (retries < MAX_RETRIES) {
      try {
        const ppiValue = await this.retrieveLatestppi();
        await this.setLatestppi(callerAddress, ownerAddress, ppiValue, id);
        return;
      } catch (error) {
        if (retries === MAX_RETRIES - 1) {
          await this.setLatestppi(callerAddress, ownerAddress, "0", id);
          return;
        }
        console.log(error);
        retries++;
      }
    }
  }

  async setLatestppi(callerAddress, ownerAddress, ppiValue, id) {
    console.log("setLatestppi function");
    ppiValue = ppiValue.replace(".", "");
    const multiplier = new BN(10 ** 10, 10);
    const ppiInt = new BN(parseInt(ppiValue), 10).mul(multiplier);
    const idInt = new BN(parseInt(id));

    console.log(ppiInt.toString(), callerAddress, idInt.toString());

    try {
      await this.state.oracleContract.methods
        .setLatestppi(ppiInt.toString(), callerAddress, idInt.toString())
        .send({ from: ownerAddress })
        .on("transactionHash", (hash) => {
          //console.log(hash);
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          console.log("setLatestppi confirmation complete.");
        });
    } catch (error) {
      console.error("Error encountered while calling setLatestppi");
      console.log(error);
      //do some error handling
    }
  }

  //run processQueue when wanting to retrieve the ppi from API

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      billQuantity: null,
      oracleContract: null,
      billCount: 0,
      bills: [],
      logs: [],
      loading: true,
      oracleAddress: "",
      tempppi: 0,
    };
    this.createBill = this.createBill.bind(this);
    this.setUnitPrice = this.setUnitPrice.bind(this);
    this.setOracleInstanceAddress = this.setOracleInstanceAddress.bind(this);
    this.processQueue = this.processQueue.bind(this);
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>
            <p>loading...</p>
          </div>
        ) : (
          <React.Fragment>
            <div className="centeredDiv">
              {" "}
              Oracle: {this.state.oracleAddress}
              <br />
              ppi test: {this.state.tempppi}
              <Button
                onClick={(event) => {
                  {
                    event.preventDefault();
                    this.setOracleInstanceAddress(this.state.oracleAddress);
                  }
                }}
              >
                Update oracle address
              </Button>
              <Button
                onClick={(event) => {
                  {
                    console.log("button pressed");
                    event.preventDefault();
                    this.updateppi();
                  }
                }}
              >
                Test
              </Button>
            </div>

            <BillForm bills={this.state.bills} createBill={this.createBill} />
            <p></p>
            <h2>Bill table</h2>
            <BillTable
              bills={this.state.bills}
              setUnitPrice={this.setUnitPrice}
            />
            <p> </p>
            <h2>Change log</h2>
            <BillLog logs={this.state.logs} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Bill;
