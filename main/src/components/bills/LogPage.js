import React, { Component } from "react";
import Web3 from "web3";
import Bills from "../../abis/Bills.json";
import "../App.css";

class LogPage extends Component {
  async componentWillMount() {
    //wait for it to happen before doing anything else
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  // async componentDidUpdate() {
  //   console.log(this.state.logs);
  // }

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

  //RoboGame = Bills (contract name)
  //robotCount = billCount (from smart contract)
  //roboGame = billQuantity (contract object in js)
  //robots = bills
  //robot = bill

  async loadBlockchainData() {
    let logsLogs = this;
    const web3 = window.web3;
    //load account
    const accounts = await web3.eth.getAccounts();
    //console.log(accounts);
    this.setState({ account: accounts[0] }); //first is the one connected with metamask (an array)
    //Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = Bills.networks[networkId];
    if (networkData) {
      //console.log("Network ID: " + networkId);
      const billQuantity = web3.eth.Contract(Bills.abi, networkData.address);
      console.log("Contract address: " + networkData.address); //contract address
      this.setState({ billQuantity }); //this.setState({ billQuantity: billQuantity });

      this.state.billQuantity
        .getPastEvents(
          "allEvents",
          {
            fromBlock: 0,
            toBlock: "latest",
          }
          // function(error, events) {
          //   console.log(events);
          //   // console.log(error); //false if no errors
          // }
        )
        .then(function(events) {
          console.log("printing events: ");
          console.log(events);
          logsLogs.setState({ logs: [...logsLogs.state.logs, events] });
          console.log(logsLogs.state.logs);
        });

      //console.log(eventLog);
      //sort bills, show highest levelled bills first, (no lvls in bills)
      // this.setState({
      //   bills: this.state.bills.sort((a, b) => b.level - a.level),
      // });
      this.setState({ loading: false });
    } else {
      window.alert("Bill contract not deployed to the detected network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      billQuantity: null,
      billCount: 0,
      logs: [],
      loading: true,
    };
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>
            <p>loading...</p>
          </div>
        ) : (
          <div>Log Page</div>
        )}
      </div>
    );
  }
}

export default LogPage;
