import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

const theme = createMuiTheme();

class Success extends Component {
  continue = (e) => {
    e.preventDefault();

    //PROCESS FORM to backend
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <React.Fragment>
          <AppBar position="fixed" style={{ top: 60, bottom: "auto" }}>
            <p>Success</p>
          </AppBar>
          <h1>Thank you for your submission</h1>
          <p>This is done!</p>
          <br />
          <p>&nbsp;</p>
          <div style={{ justifyContent: "center" }}>
            <Button variant="outlined" href="/userform">
              Restart
            </Button>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Success;
