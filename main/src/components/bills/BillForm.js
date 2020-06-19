import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    fontSize: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class BillForm extends Component {
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  state = {
    workSection: "",
    component: "",
    itemDescription: "",
    unit: "",
  };

  render() {
    const { workSection, component, itemDescription, unit } = this.state;
    const values = {
      workSection,
      component,
      itemDescription,
      unit,
    };
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <Grid container justify="center">
            <FormControl variant="filled" style={{ minWidth: 200 }}>
              <InputLabel>Work Section</InputLabel>
              <Select
                value={values.workSection}
                onChange={this.handleChange("workSection")}
              >
                <MenuItem value={"Preliminaries"}>Preliminaries</MenuItem>
                <MenuItem value={"Site works"}>Site works</MenuItem>
                <MenuItem value={"Demolitions"}>Demolitions</MenuItem>
                <MenuItem value={"In-situ concrete works"}>
                  In-situ concrete works
                </MenuItem>
                <MenuItem value={"Precast concrete"}>Precast concrete</MenuItem>
              </Select>
              <FormHelperText>Select Work Section</FormHelperText>
            </FormControl>

            <TextField
              id="filled-basic"
              label="Component"
              variant="filled"
              helperText="Enter component"
              onChange={this.handleChange("component")}
              defaultValue={values.component}
            />
            <TextField
              id="standard-basic"
              label="Item description"
              variant="filled"
              helperText="Enter item description"
              onChange={this.handleChange("itemDescription")}
              defaultValue={values.itemDescription}
            />
            <FormControl id="standard-basic" variant="filled">
              <InputLabel id="demo-simple-select-helper-label">Unit</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={values.unit}
                onChange={this.handleChange("unit")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="">
                  <em>m</em>
                </MenuItem>
                <MenuItem value={"m^2"}>
                  m<sup>2</sup>
                </MenuItem>
                <MenuItem value={"num"}>num</MenuItem>
                <MenuItem value={"weekly"}>weekly</MenuItem>
                <MenuItem value={"monthly"}>monthly</MenuItem>
              </Select>
              <FormHelperText>Select unit</FormHelperText>
            </FormControl>
            <br />
          </Grid>
          <p></p>
          <Grid container justify="center">
            <Button
              variant="outlined"
              color="primary"
              style={{ minWidth: 150 }}
              onClick={(event) => {
                event.preventDefault();
                const workSection = values.workSection;
                const component = values.component;
                const itemDescription = values.itemDescription;
                const unit = values.unit;
                const baseppi = 50;
                const ppi = 100;
                this.props.createBill(
                  workSection,
                  component,
                  itemDescription,
                  unit,
                  baseppi,
                  ppi
                );
                console.log(
                  workSection,
                  component,
                  itemDescription,
                  unit,
                  baseppi,
                  ppi
                );
              }}
            >
              Add
            </Button>
          </Grid>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default BillForm;
