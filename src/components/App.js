import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import RoboGame from "../abis/RoboGame.json";
import Navbar from "./Navbar";
//import Main from "./Main";
import RoboGameMain from "./RoboGameMain";

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
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    //load account
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] }); //first is the one connected with metamask (an array)
    //Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = RoboGame.networks[networkId];
    if (networkData) {
      //console.log(networkId);
      const roboGame = web3.eth.Contract(RoboGame.abi, networkData.address);
      this.setState({ roboGame }); //this.setState({ roboGame: roboGame });
      //call only reads data (no gas), send requires gas
      const robotCount = await roboGame.methods.robotCount().call();
      this.setState({ robotCount });
      //console.log(robotCount);
      //Load posts
      for (var i = 1; i <= robotCount; i++) {
        const robot = await roboGame.methods.robots(i).call();
        this.setState({
          robots: [...this.state.robots, robot], //adds post to the end of the posts array, new in es6 and react
        });
      }
      //console.log({ posts: this.state.robots });

      //sort robots, show highest levelled robots first
      this.setState({
        robots: this.state.robots.sort((a, b) => b.level - a.level),
      });
      this.setState({ loading: false });
    } else {
      window.alert("RoboGame contract not deployed to detected network.");
    }
  }

  createRobot(name) {
    this.setState({ loading: true });
    this.state.roboGame.methods
      .createRobot(name)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }

  levelRobot(id, level) {
    this.setState({ loading: true });
    this.state.roboGame.methods
      .levelRobot(id)
      .send({ from: this.state.account, value: level })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      roboGame: null,
      robotCount: 0,
      robots: [],
      loading: true,
    };

    this.createRobot = this.createRobot.bind(this);
    this.levelRobot = this.levelRobot.bind(this);
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state.loading ? (
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <RoboGameMain
            robots={this.state.robots}
            createRobot={this.createRobot}
            levelRobot={this.levelRobot}
          />
        )}
      </div>
    );
  }
}

export default App;
