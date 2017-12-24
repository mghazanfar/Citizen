import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
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
      <Table className={classes.table}>
        <TableHead>
          <TableRow style={{fontSize:'1rem', fontWeight:700, color:'black'}}>
            <TableCell style={{fontWeight:700}}>Price</TableCell>
            <TableCell numeric style={{fontWeight:700}}>Brand</TableCell>
            <TableCell numeric style={{fontWeight:700}}>Model</TableCell>
            <TableCell numeric style={{fontWeight:700}}>Name</TableCell>
            <TableCell numeric style={{fontWeight:700}}>Color</TableCell>
            <TableCell numeric style={{fontWeight:700}}>Picture</TableCell>
            <TableCell numeric style={{fontWeight:700}}>Category</TableCell>
            <TableCell numeric style={{fontWeight:700}}>Quantity</TableCell>
            <TableCell style={{textAlign:'center', fontWeight:700}}>Edit</TableCell>
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
  );
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTable);