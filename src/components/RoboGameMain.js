import React, { Component } from "react";
import Identicon from "identicon.js";

class RoboGameMain extends Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "500px" }}
          >
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const name = this.robotName.value; //!!
                  this.props.createRobot(name);
                }}
              >
                <div className="form-group mr-sm-2">
                  <input
                    id="robotName"
                    type="text"
                    ref={(input) => {
                      this.robotName = input;
                    }} //!!
                    className="form-control"
                    placeholder="Enter new robot's name!"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Create robot
                </button>
              </form>
              <p>&nbsp;</p>
              {this.props.robots.map((robot, key) => {
                //key is index
                return (
                  <div className="card mb-4" key={key}>
                    <div className="card-header">
                      <img //check video for explanation for this
                        className="mr-2"
                        width="30"
                        height="30"
                        src={`data:image/png;base64, ${new Identicon(
                          robot.owner,
                          30
                        ).toString()}`}
                      />
                      <small className="text-muted">{robot.owner}</small>
                    </div>
                    <ul id="robotList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>Robot's name: {robot.name}</p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          LEVEL:{" "}
                          {window.web3.utils.fromWei(
                            robot.level.toString(),
                            "Ether"
                          )}{" "}
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={robot.robotID}
                          onClick={(event) => {
                            //Call the tip function. Need post ID and Tip amount
                            //event.target.name (post ID)
                            let level = window.web3.utils.toWei("0.1", "Ether");
                            this.props.levelRobot(event.target.name, level);
                          }}
                        >
                          LEVEL + 0.1 (ETH)
                        </button>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default RoboGameMain;
