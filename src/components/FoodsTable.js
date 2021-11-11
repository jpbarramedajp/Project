import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputLabel, TextField, Typography } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { DashBoardContext } from '../helpers/Context';
import DeleteIcon from '@material-ui/icons/Delete';

import {GetFoodsandMedicines, SetFoodsAndMedicines} from '../helpers/Utils';
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomPaginationActionsTable() {
  const classes = useStyles2();
  const {foodsmed, setfoodsmed} = useContext(DashBoardContext);
  // const rows = foodsmed;  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [category, setCategory] = React.useState('All');
  const [filteredRows, setFilteredRows] = React.useState(foodsmed);
  const [bags, setBags] = React.useState(999999);
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [deleteitem, setdeleteitem] = React.useState(0);
  const [productId, setproductId] = React.useState(0);
  const [productname, setproductName] = React.useState('');
  const [productDesc, setproductDesc] = React.useState('');
  const [productCategory, setproductCategory] = React.useState('');
  const [productCount, setproductCount] = React.useState(0);

  const handleSaveItem = async (action) => {
    await SetFoodsAndMedicines(action, productId, productname, productDesc, productCategory, productCount);
    await setfoodsmed( await GetFoodsandMedicines());
    handleClose();
  }

  const handleConfirmItem = (action, todelete) => {
    setdeleteitem(todelete);
    setIsOpen(true);
  }

  const handleDeleteItem = async (action, todelete) => {
    await SetFoodsAndMedicines(action, todelete, productname, productDesc, productCategory, productCount);
    await setfoodsmed( await GetFoodsandMedicines());
    setIsOpen(false);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }
  const handleCloseDelete= () => {
    setIsOpen(false);
}

  useMemo(() => {
    if(category === 'All'){
      setFilteredRows(foodsmed);
    }
    else{
      const result = foodsmed.filter(row => row.category === category);
      setFilteredRows(result);
    }
  },[category, foodsmed]);


  useMemo(() => {
    foodsmed.map( row => {
      if(row.category === 'Food'){
        if(row.stocks < bags){
          setBags(row.stocks)
        };
      }
    });
  },[]);
  
  return (
    <div>
      <div>
        Number of bags: {bags}
      </div>
      
      <div>
      <div style={{float:'left'}}>
        <Button variant="outlined" onClick={e => handleOpen()}>
            Add Item
        </Button>
      </div>
      <div style={{float:'right'}}>
        <InputLabel htmlFor="category">Filter for Category</InputLabel>
                <Select
                name="category"
                variant="outlined"
                native
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="category"
                label="category"
                inputProps={{
                    name: 'category',
                    id: 'category',
                }}
                >
                <option value={'All'}>All</option>
                <option value={'Food'}>Food</option>
                <option value={'Medicine'}>Medicine</option>
        </Select>
      </div>
      </div>

      <div>
          <Dialog
            open={isOpen}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" >
              Delete this item?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Click okay to proceed.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleDeleteItem('delete', deleteitem)} autoFocus>
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" >
              {"Add Item"}
            </DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={6}>
                  <Typography align="left" component="h1" variant="h6"> Name</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                  autoComplete="Name"
                  name="Name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  onInput={ e=>setproductName(e.target.value)}
                  autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography align="left" component="h1" variant="h6"> Description </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                  autoComplete="Description"
                  name="Description"
                  variant="outlined"
                  required
                  fullWidth
                  id="Description"
                  label="Description"
                  onInput={ e=>setproductDesc(e.target.value)}
                  autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography align="left" component="h1" variant="h6"> Select a Category </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Select
                  name="category"
                  variant="outlined"
                  native
                  value={productCategory}
                  onChange={e => setproductCategory(e.target.value)}
                  placeholder="category"
                  label="category"
                  inputProps={{
                      name: 'category',
                      id: 'category',
                  }}
                  >
                  
                  <option value={'Food'}>Food</option>
                  <option value={'Medicine'}>Medicine</option>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="left" component="h1" variant="h6"> Count</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                    autoComplete="Count"
                    name="Count"
                    variant="outlined"
                    required
                    fullWidth
                    id="Count"
                    label="Count"
                    onInput={ e=>setproductCount(e.target.value)}
                    autoFocus
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleSaveItem('insert')} autoFocus>
                Okay
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead style={{backgroundColor: 'gray'}}>
            <TableRow>
                <TableCell>
                    Name
                </TableCell>
                <TableCell>
                    Description
                </TableCell>
                <TableCell>
                    Category
                </TableCell>
                <TableCell>
                    Stocks
                </TableCell>
                <TableCell>
                    Action
                </TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : filteredRows
            ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 200 }} align="left">
                {row.description}
              </TableCell>
              <TableCell style={{ width: 200}} align="left">
                {row.category}
              </TableCell>
              <TableCell style={{ width: 200}} align="left">
                {row.stocks}
              </TableCell>
              <TableCell style={{ width: 200}} align="left">
                <IconButton onClick={() => handleConfirmItem('delete', row.id)}>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={foodsmed.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
  );
}
