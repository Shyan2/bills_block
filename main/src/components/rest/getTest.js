import React, { Component } from "react";
import localJson from "./getTest.json";
import axios from "axios";

const apiKey = "8654f96ed3dc4c07a01235a71ae17527";

async function retrieveLatestEthPrice() {
  const resp = await axios({
    url: "https://api.binance.com/api/v3/ticker/price",
    params: {
      symbol: "ETHUSDT",
    },
    method: "get",
  });
  return resp.data.price;
}

export class getTest extends Component {
  state = {
    loading: true,
    product: null,
    ethData: [],
    localJson,
  };

  //   async componentDidMount() {
  //     // const url =
  //     //   "https://api.bls.gov/publicAPI/v2/timeseries/data/WPU13?latest=true/" +
  //     //   apiKey;
  //     const url = localJson;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     this.setState({ product: data, loading: false });
  //     console.log(data);
  //   }

  async componentDidMount() {
    const resp = await axios({
      url: "https://api.binance.com/api/v3/ticker/price",
      params: {
        symbol: "ETHUSDT",
      },
      method: "get",
    });
    this.setState({
      ethData: [...this.state.ethData, resp.data.price],
    });
  }

  render() {
    return (
      <div>
        {/* {this.state.loading || !this.state.person ? (
          <div>Loading ... </div>
        ) : (
          <div>
            <div> {this.state.product.status} </div>
          </div>
        )} */}
        <div>
          <div>
            {localJson.Results.series[0].data[0].year}{" "}
            {console.log(localJson.Results.series[0].data[0])}
          </div>
          <div>Latest ETH price: {this.state.ethData}</div>
        </div>
      </div>
    );
  }
}

export default getTest;
