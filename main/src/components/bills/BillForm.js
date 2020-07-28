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
import Moment from "react-moment";

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
                <MenuItem value={"Excavating & filling"}>
                  Excavating & filling
                </MenuItem>
                <MenuItem value={"In-situ concrete work"}>
                  In-situ concrete work
                </MenuItem>
                <MenuItem value={"Composite precast concrete"}>
                  Composite precast concrete
                </MenuItem>
                <MenuItem value={"Precast concrete"}>Precast concrete</MenuItem>
                <MenuItem value={"Masonry"}>Masonry</MenuItem>
                <MenuItem value={"Carpentry"}>Carpentry</MenuItem>
                <MenuItem value={"Sheet roof coverings"}>
                  Sheet roof coverings
                </MenuItem>
                <MenuItem value={"Tile and slate roof and wall coverings"}>
                  Tile and slate roof and wall coverings
                </MenuItem>
                <MenuItem value={"General joinery"}>General joinery</MenuItem>
                <MenuItem value={"Windows, screens and lights"}>
                  Windows, screens and lights
                </MenuItem>
                <MenuItem value={"Doors, shutters and hatches"}>
                  Doors, shutters and hatches
                </MenuItem>
                <MenuItem value={"Stairs, walkways and balustrades"}>
                  Stairs, walkways and balustrades
                </MenuItem>
                <MenuItem value={"Floor, wall, ceiling and roof finishings"}>
                  Floor, wall, ceiling and roof finishings
                </MenuItem>
                <MenuItem value={"Decoration"}>Decoration</MenuItem>
                <MenuItem value={"Insulation, fire stopping & fire protection"}>
                  Insulation, fire stopping & fire protection
                </MenuItem>
                <MenuItem value={"Furniture, fittings and equipment"}>
                  Furniture, fittings and equipment
                </MenuItem>
                <MenuItem value={"Drainage above ground"}>
                  Drainage above ground
                </MenuItem>
                <MenuItem value={"Drainage below ground"}>
                  Drainage below ground
                </MenuItem>
                <MenuItem value={"Soft landscaping"}>Soft landscaping</MenuItem>
                <MenuItem value={"Mechanical services"}>
                  Mechanical services
                </MenuItem>
                <MenuItem value={"Electrical services"}>
                  Electrical services
                </MenuItem>
                <MenuItem
                  value={
                    "Mechanical, electrical & transportation installations"
                  }
                >
                  Mechanical, electrical & transportation installations
                </MenuItem>
                <MenuItem value={"Main contractor's overheads and profit"}>
                  Main contractor's overheads and profit
                </MenuItem>
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
                <MenuItem value="m">
                  <em>m</em>
                </MenuItem>
                <MenuItem value={"m^2"}>
                  m<sup>2</sup>
                </MenuItem>
                <MenuItem value={"m^3"}>
                  m<sup>3</sup>
                </MenuItem>
                <MenuItem value={"nr"}>nr</MenuItem>
                <MenuItem value={"day"}>day</MenuItem>
                <MenuItem value={"week"}>week</MenuItem>
                <MenuItem value={"month"}>month</MenuItem>
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
                const baseppi = this.props.tempppi;
                const ppi = this.props.tempppi;
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
                  ppi,
                  new Date()
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
