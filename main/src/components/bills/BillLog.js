import React, { Component } from "react";
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
  blockNumber,
  transactionHash,
  eventName,
  id,
  section,
  component,
  blockTime
) {
  return {
    blockNumber,
    transactionHash,
    eventName,
    id,
    section,
    component,
    blockTime,
  };
}

const rows = [
  createData(
    "100",
    "transactionHash",
    "eventName",
    "id",
    "section",
    "component",
    "10000"
  ),
];

class BillLog extends Component {
  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table" style={{ width: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>BlockNumber</TableCell>
              <TableCell>Transaction Hash</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>ID</TableCell>
              <TableCell align="right">Section</TableCell>
              <TableCell align="right">Component</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.logs.map((row, key) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {row.blockNumber}
                </TableCell>
                <TableCell>{row.transactionHash}</TableCell>
                <TableCell align="left">{row.event}</TableCell>
                <TableCell align="left">
                  {row.returnValues.id.toString()}
                </TableCell>
                <TableCell align="right">
                  {row.returnValues.workSection}
                </TableCell>
                <TableCell align="right">
                  {row.returnValues.component}
                </TableCell>
                <TableCell align="right">{row.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default BillLog;
