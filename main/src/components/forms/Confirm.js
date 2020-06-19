import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme();

class FormUserDetails extends Component {
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
    const {
      values: { firstName, lastName, email, occupation, city, bio },
    } = this.props; //pulling it out so we can use values as a variable
    return (
      <MuiThemeProvider theme={theme}>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <React.Fragment>
          <AppBar position="fixed" style={{ top: 60, bottom: "auto" }}>
            <p>Confirm user data</p>
          </AppBar>
          <List>
            <ListItem>
              <ListItemText primary="First Name" secondary={firstName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Name" secondary={lastName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Occupation" secondary={occupation} />
            </ListItem>
            <ListItem>
              <ListItemText primary="City" secondary={city} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Bio" secondary={bio} />
            </ListItem>
            {/* <ListItem primaryText="First Name" secondaryText={firstName} />
            <ListItem primaryText="Last Name" secondaryText={lastName} />
            <ListItem primaryText="Email" secondaryText={email} />
            <ListItem primaryText="Occupation" secondaryText={occupation} />
            <ListItem primaryText="City" secondaryText={city} />
            <ListItem primaryText="Bio" secondaryText={bio} /> */}
          </List>
          <br />
          <p>&nbsp;</p>
          <div style={{ justifyContent: "center" }}>
            <Button variant="outlined" color="primary" onClick={this.continue}>
              Confirm and continue
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

export default FormUserDetails;
