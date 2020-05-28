import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme();

class FormUserDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props; //pulling it out so we can use values as a variable
    return (
      <MuiThemeProvider theme={theme}>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <React.Fragment>
          <AppBar position="fixed" style={{ top: 60, bottom: "auto" }}>
            <p>Enter user details</p>
          </AppBar>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            helperText="Enter your first name"
            onChange={handleChange("firstName")}
            defaultValue={values.firstName}
          />
          <br />
          <p>&nbsp;</p>
          <TextField
            id="filled-basic"
            label="Last Name"
            variant="filled"
            helperText="Enter your second name"
            onChange={handleChange("lastName")}
            defaultValue={values.lastName}
          />
          <br />
          <p>&nbsp;</p>
          <TextField
            id="standard-basic"
            label="Email"
            variant="filled"
            helperText="Enter your email"
            onChange={handleChange("email")}
            defaultValue={values.email}
          />
          <br />
          <p>&nbsp;</p>
          <div style={{ justifyContent: "center" }}>
            <Button variant="outlined" color="primary" onClick={this.continue}>
              Continue
            </Button>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormUserDetails;
