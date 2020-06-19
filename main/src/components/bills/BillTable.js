import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

function createData(
  ID,
  section,
  component,
  item,
  unit,
  quantity,
  unitPrice,
  total,
  baseppi,
  ppi
) {
  return {
    ID,
    section,
    component,
    item,
    unit,
    quantity,
    unitPrice,
    total,
    baseppi,
    ppi,
  };
}

const rows = [
  // createData(
  //   "0",
  //   "Test Section",
  //   "Test Component",
  //   "Test item description",
  //   "Test unit",
  //   "2",
  //   "100",
  //   "200",
  //   "50"
  // ),
  // createData(
  //   "1",
  //   "Preliminaries",
  //   "Tower Cranes",
  //   "Crane operator",
  //   "Weekly",
  //   "2",
  //   "100",
  //   "200"
  // ),
  // createData(
  //   "2",
  //   "Preliminaries",
  //   "Tower Cranes",
  //   "Bring to site, erection, test and commission",
  //   "nr",
  //   "2",
  //   "1000",
  //   "2000"
  // ),
  // createData(
  //   "3",
  //   "Precast concrete",
  //   "Beam and block floor",
  //   "Prestressed beams at 488mm centres and 100mm block floor grouted 48 x 150mm Cube 6 concrete floor beam, Hanson Thermalite floorblock 4.0N 440 x 100 x 350mm aerated concrete block and Grout between blocks to beam and block floor, Cemex Rugby masonry cement and Tarmac premium yellow building sand",
  //   "m^2",
  //   "61.81",
  //   "10",
  //   "618.1"
  // ),
];

class BillTable extends Component {
  render() {
    return (
      // const classes = useStyles();
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell> Owner</TableCell>
              <TableCell>Date of creation</TableCell>
              <TableCell>Section</TableCell>
              <TableCell align="left">Component</TableCell>
              <TableCell align="left">Item Description</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit price</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Base PPI</TableCell>
              <TableCell align="right">PPI</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*Below is an example row */}
            {/* {rows.map((row) => (
              <TableRow key={row.ID}>
                <TableCell component="th" scope="row">
                  {row.ID}
                </TableCell>
                <TableCell>
                  0x5f48f26c1a339ECAC10917b85aF059099ae649f8
                </TableCell>
                <TableCell>Date</TableCell>
                <TableCell>{row.section}</TableCell>
                <TableCell align="left">{row.component}</TableCell>
                <TableCell align="left">{row.item}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.unitPrice}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
                <TableCell align="right">{row.baseppi}</TableCell>
                <TableCell align="right">{row.ppi}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))} */}
            {this.props.bills.map((row, key) => (
              <TableRow key={key}>
                <TableCell>{row.id.toString()}</TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell align="left">{row.workSection}</TableCell>
                <TableCell align="left">{row.component}</TableCell>
                <TableCell align="left">{row.itemDescription}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{row.quantity.toString()}</TableCell>
                <TableCell align="right">{row.unitPrice.toString()}</TableCell>
                <TableCell align="right">
                  {(row.quantity * row.quantity).toString()}
                </TableCell>
                <TableCell align="right">{row.baseppi.toString()}</TableCell>
                <TableCell align="right">{row.ppi.toString()}</TableCell>
                <TableCell align="right">
                  <Button>Update PPI</Button>

                  <Button
                    //name={} //need to change this
                    onClick={(event) => {
                      {
                        console.log("button clicked");
                        this.props.setUnitPrice(
                          row.id,
                          Number(row.unitPrice.toString()) + 1
                        );
                      }
                    }}
                  >
                    Unit price
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default BillTable;
