import React, { Component } from "react";
import Web3 from "web3";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import RoboGame from "../abis/Bills.json";

import Navbar from "./Navbar";
import RoboGameMain from "./robogame/RoboGameMain";
import LogPage from "./bills/LogPage";
import Bill from "./bills/Bill";
import Form from "./forms/Form";
import TableTest from "./others/TableTest";
import Robots from "./robogame/Robots";
import GetTest from "./rest/getTest";

import UserForm from "./forms/UserForm";

class App extends Component {
  async componentWillMount() {
    //wait for it to happen before doing anything else
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask to try all the features!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    //load account
    const accounts = await web3.eth.getAccounts();
    console.log("Account address: " + accounts);
    this.setState({ account: accounts[0] }); //first is the one connected with metamask (an array)
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
    };
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <Router>
          <Navbar account={this.state.account} />
          <div className="nav-padding">
            <Switch>
              <Route path="/userform" component={UserForm} />
              <Route path="/TableTest" component={TableTest} />
              <Route exact path="/log" component={LogPage} />
              <Route path="/bill" component={Bill} />
              <Route path="/gettest" component={GetTest} />
              <Route path="/robots" component={Robots} />
              )} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
