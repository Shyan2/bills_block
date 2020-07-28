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
import { sizing } from "@material-ui/system";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import Moment from "react-moment";
// momentDate.format("YYYY-MM-DDTHH:mm:ss");
Moment.globalFormat = "D MMM YYYY, HH:mm:ss";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    table: {
      minWidth: 650,
    },
  },
});

function transformData(blockItem) {
  return {
    id: blockItem.id.toString(),
    section: blockItem.workSection,
    component: blockItem.component,
    item: blockItem.itemDescription,
    unit: blockItem.unit,
    quantity: blockItem.quantity.toString(),
    unitPrice: blockItem.unitPrice.toString(),
    history: [
      {
        baseppi: blockItem.baseppi.toString(),
        ppi: blockItem.ppi.toString(),
        owner: blockItem.owner,
        timestamp: blockItem.timestamp,
      },
    ],
  };
}

function transformDate(unixTimestamp) {
  return new Date(unixTimestamp * 1000);
}

function MyRow(props) {
  const { row } = props;
  // console.log(row);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const [dialogueOpen, setDialogueOpen] = React.useState(false);
  const [quantityDialogueOpen, setQuantityDialogueOpen] = React.useState(false);

  const handleClickOpen = () => {
    setDialogueOpen(true);
  };

  const handleClose = () => {
    setDialogueOpen(false);
  };

  const handleClickOpenQuantity = () => {
    setQuantityDialogueOpen(true);
  };

  const handleCloseQuantity = () => {
    setQuantityDialogueOpen(false);
  };

  let inputValue = React.useRef(null);

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
        <TableCell align="left">{row.section}</TableCell>
        <TableCell align="left">{row.component}</TableCell>
        <TableCell align="left">{row.item}</TableCell>
        <TableCell align="right">{row.unit}</TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">{row.unitPrice}</TableCell>
        <TableCell align="right">
          {row.quantity *
            row.unitPrice *
            (row.history[0].ppi / row.history[0].baseppi)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              ></Typography>
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
                    <TableRow key={historyRow.timestamp}>
                      <TableCell component="th" scope="row">
                        {historyRow.timestamp},
                        <br />
                        <Moment unix>{historyRow.timestamp}</Moment>
                      </TableCell>
                      <TableCell>{historyRow.owner}</TableCell>
                      {/* <TableCell align="right">{historyRow.baseppi}</TableCell>
                      <TableCell align="right">{historyRow.ppi}</TableCell> */}
                      <TableCell align="right">257.2</TableCell>
                      <TableCell align="right">257.2</TableCell>
                      <TableCell align="right">
                        <Button>Update PPI</Button>
                        {/* <Button>Manual PPI</Button> */}
                        {/* <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleClickOpenQuantity}
                        >
                          Set Quantity
                        </Button> */}
                        <Dialog
                          open={quantityDialogueOpen}
                          onClose={handleClickOpenQuantity}
                          aria-labelledby="form-dialog-title"
                        >
                          <DialogTitle id="form-dialog-title">
                            Set Quantity
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Enter the quantity
                            </DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="quantity"
                              type="number"
                              fullWidth
                              inputRef={(input) => (inputValue = input)}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={handleCloseQuantity}
                              color="primary"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleCloseQuantity}
                              onClick={(event) => {
                                {
                                  // event.preventDefault();
                                  console.log(inputValue.value);
                                  // const unitPriceValue = inputValue;
                                  props.setQuantity(row.id, inputValue.value);
                                }
                              }}
                              color="primary"
                            >
                              Update
                            </Button>
                          </DialogActions>
                        </Dialog>
                        {/* <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleClickOpen}
                        >
                          Unit price
                        </Button> */}
                        <Dialog
                          open={dialogueOpen}
                          onClose={handleClose}
                          aria-labelledby="form-dialog-title"
                        >
                          <DialogTitle id="form-dialog-title">
                            Update unit price
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Enter the unit price
                            </DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="Unit price"
                              type="number"
                              fullWidth
                              inputRef={(input) => (inputValue = input)}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button
                              onClick={handleClose}
                              onClick={(event) => {
                                {
                                  // event.preventDefault();
                                  console.log(inputValue.value);
                                  // const unitPriceValue = inputValue;
                                  props.setUnitPrice(row.id, inputValue.value);
                                }
                              }}
                              color="primary"
                            >
                              Update
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
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

class BillTable extends Component {
  render() {
    return (
      // const classes = useStyles();
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" style={{ width: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell align="left">Section</TableCell>
              <TableCell align="left">Component</TableCell>
              <TableCell align="left">Item Description</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit price</TableCell>
              <TableCell align="right">Total&nbsp;($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.bills.map(
              (row) => (
                (row = transformData(row)),
                (
                  <MyRow
                    setUnitPrice={this.props.setUnitPrice}
                    setQuantity={this.props.setQuantity}
                    key={row.id}
                    row={row}
                  />
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default BillTable;
