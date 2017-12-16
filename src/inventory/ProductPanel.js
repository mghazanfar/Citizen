import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Background from '../img/541.jpg';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import ModalDelete from './ModalDelete';

const styles = {
  noUnderline: {
    textDecoration: 'none',
  }
};

let id = 0;
function createData(price, brand, model, name, color, picture, category, quantity) {
  id += 1;
  return { id,price, brand, model, name, color, picture, category, quantity };
}

const data = [
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
  createData(120, 'Citizen', 'AD0Pk', 'Clasic chair', 'Green', Background, 'Chair', 200),
];

function BasicTable(props) {
  const { classes } = props;

  return (
    <Paper style={{padding:20}}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell numeric>Brand</TableCell>
            <TableCell numeric>Model</TableCell>
            <TableCell numeric>Name</TableCell>
            <TableCell numeric>Color</TableCell>
            <TableCell numeric>Picture</TableCell>
            <TableCell numeric>Category</TableCell>
            <TableCell numeric>Quantity</TableCell>
            <TableCell numeric>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell>{n.price}</TableCell>
                <TableCell numeric>{n.brand}</TableCell>
                <TableCell numeric>{n.model}</TableCell>
                <TableCell numeric>{n.name}</TableCell>
                <TableCell numeric>{n.color}</TableCell>
                <TableCell><Avatar src={n.picture} style={{width:70, height:70}} /></TableCell>
                <TableCell numeric>{n.category}</TableCell>
                <TableCell numeric>{n.quantity}</TableCell>
                <TableCell ><div><Link to='/ModifyProduct' style={styles.noUnderline}><Button color='primary'>MODIFY</Button></Link><ModalDelete /></div></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTable);