import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const theme = createMuiTheme();

class FormPersonalDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props; //pulling it out so we can use values as a variable
    return (
      <MuiThemeProvider theme={theme}>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <React.Fragment>
          <AppBar position="fixed" style={{ top: 60, bottom: "auto" }}>
            <p>Enter personal details</p>
          </AppBar>
          <TextField
            id="outlined-basic"
            label="Occupation"
            variant="outlined"
            helperText="Enter your Occupation"
            onChange={handleChange("occupation")}
            defaultValue={values.occupation}
          />
          <br />
          <p>&nbsp;</p>
          <TextField
            id="filled-basic"
            label="City"
            variant="filled"
            helperText="Enter your city"
            onChange={handleChange("city")}
            defaultValue={values.city}
          />
          <br />
          <p>&nbsp;</p>
          <TextField
            id="standard-basic"
            label="Bio"
            variant="filled"
            helperText="Enter your bio"
            onChange={handleChange("bio")}
            defaultValue={values.bio}
          />
          <br />
          <p>&nbsp;</p>
          <div style={{ justifyContent: "center" }}>
            <Button variant="outlined" color="primary" onClick={this.continue}>
              Continue
            </Button>
            <Button variant="outlined" onClick={this.back}>
              back
            </Button>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormPersonalDetails;
