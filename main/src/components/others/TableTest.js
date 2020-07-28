import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createMyData(
  id,
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
    id,
    section,
    component,
    item,
    unit,
    quantity,
    unitPrice,
    total,
    // baseppi,
    // ppi,
    history: [
      { date: "2020-01-05", customerId: "11091700", baseppi, ppi },
      { date: "2020-01-02", customerId: "Anonymous", baseppi, ppi },
    ],
  };
}

const myRows = [
  createMyData(
    "1",
    "Preliminaries",
    "Tower Cranes",
    "Crane operator",
    "Weekly",
    "2",
    "100",
    "200",
    "1000", //baseppi
    "5000" //pi
  ),
  createMyData(
    "2",
    "Preliminaries",
    "Tower Cranes",
    "Bring to site, erection, test and commission",
    "num",
    "2",
    "1000",
    "2000",
    "2000",
    "2100",
    "other test"
  ),
  createMyData(
    "3",
    "Precast concrete",
    "Beam and block floor",
    "Prestressed beams at 488mm centres and 100mm block floor grouted 48 x 150mm Cube 6 concrete floor beam, Hanson Thermalite floorblock 4.0N 440 x 100 x 350mm aerated concrete block and Grout between blocks to beam and block floor, Cemex Rugby masonry cement and Tarmac premium yellow building sand",
    "m^2",
    "61.81",
    "10",
    "618.1",
    "3000",
    "3100",
    "other test"
  ),
];

// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       { date: "2020-01-05", customerId: "11091700", amount: 3 },
//       { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
//     ],
//   };
// }

function MyRow(props) {
  //row = myRow
  const { row } = props;
  console.log(row);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        {/* <TableCell align="right">{row.id}</TableCell> */}
        <TableCell align="right">{row.section}</TableCell>
        <TableCell align="right">{row.component}</TableCell>
        <TableCell align="right">{row.item}</TableCell>
        <TableCell align="right">{row.unit}</TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">{row.unitPrice}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
        {/* <TableCell align="right">{row.baseppi}</TableCell>
        <TableCell align="right">{row.ppi}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell align="right">Base ppi</TableCell>
                    <TableCell align="right">Current ppi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.baseppi}</TableCell>
                      <TableCell align="right">{historyRow.ppi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// MyRow.propTypes = {
//   row: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     section: PropTypes.string.isRequired,
//     component: PropTypes.string.isRequired,
//     item: PropTypes.string.isRequired,
//     unit: PropTypes.string.isRequired,
//     quantity: PropTypes.string.isRequired,
//     unitPrice: PropTypes.string.isRequired,
//     total: PropTypes.string.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//         baseppi: PropTypes.string.isRequired,
//         ppi: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//   }),
// };

class CollapsibleTable extends Component {
  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>id</TableCell>
              <TableCell align="right">Section</TableCell>
              <TableCell align="right">Component</TableCell>
              <TableCell align="right">item</TableCell>
              <TableCell align="right">unit</TableCell>
              <TableCell align="right">quantity</TableCell>
              <TableCell align="right">Unit price</TableCell>
              <TableCell align="right">total&nbsp;($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myRows.map((row) => (
              <MyRow key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default CollapsibleTable;
