import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Background from '../img/541.jpg';
import Avatar from 'material-ui/Avatar';
import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
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
];

class BasicTable extends React.Component {
  //const { classes } = this.props;
  state = {
    products: []
  }
  componentWillMount(){
    this.props.products.map(value => {

    });
  }
  render() {
    return (
        <Table>
          <TableHead>
            <TableRow style={{fontSize: '1rem', fontWeight: 700, color: 'black'}}>
              <TableCell style={{fontWeight: 700}}>id</TableCell>
              <TableCell numeric style={{fontWeight: 700}}>quantity</TableCell>
              <TableCell numeric style={{fontWeight: 700}}>salePrice</TableCell>
              {/*<TableCell numeric style={{fontWeight: 700}}>Name</TableCell>
              <TableCell numeric style={{fontWeight: 700}}>Color</TableCell>
              <TableCell numeric style={{fontWeight: 700}}>Picture</TableCell>
              <TableCell numeric style={{fontWeight: 700}}>Category</TableCell>
              <TableCell numeric style={{fontWeight: 700}}>Quantity</TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
              {this.props.products.map(n => {
                  return (
                      <TableRow key={n.productId}>
                        <TableCell>{n.productId}</TableCell>
                        <TableCell numeric>{n.quantity}</TableCell>
                        <TableCell numeric>{n.salePrice}</TableCell>
                        {/*<TableCell numeric>{n.name}</TableCell>
                        <TableCell numeric>{n.color}</TableCell>
                        <TableCell><Avatar src={n.picture} style={{width: 70, height: 70}}/></TableCell>
                        <TableCell numeric>{n.category}</TableCell>
                        <TableCell numeric>{n.quantity}</TableCell>*/}
                      </TableRow>
                  );
              })}
          </TableBody>
        </Table>
    );
}
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTable);