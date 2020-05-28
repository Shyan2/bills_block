import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  total
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
  };
}

const rows = [
  createData(
    "1",
    "Preliminaries",
    "Tower Cranes",
    "Crane operator",
    "Weekly",
    "2",
    "100",
    "200"
  ),
  createData(
    "2",
    "Preliminaries",
    "Tower Cranes",
    "Bring to site, erection, test and commission",
    "nr",
    "2",
    "1000",
    "2000"
  ),
  createData(
    "3",
    "Precast concrete",
    "Beam and block floor",
    "Prestressed beams at 488mm centres and 100mm block floor grouted 48 x 150mm Cube 6 concrete floor beam, Hanson Thermalite floorblock 4.0N 440 x 100 x 350mm aerated concrete block and Grout between blocks to beam and block floor, Cemex Rugby masonry cement and Tarmac premium yellow building sand",
    "m^2",
    "61.81",
    "10",
    "618.1"
  ),
];

export default function Bill() {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Section</TableCell>
            <TableCell align="left">Component</TableCell>
            <TableCell align="left">Item Description</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Unit price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.ID}>
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell>{row.section}</TableCell>
              <TableCell align="left">{row.component}</TableCell>
              <TableCell align="left">{row.item}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.unitPrice}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
