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

class BasicTable extends React.Component<props, {}> {
  //const { classes } = this.props;
  state = {
    product: []
  };
  componentWillMount(){
    if(cookies.get('accessToken')) {
        let token  = cookies.get('accessToken').accessToken;
        let products = cookies.get('billProductQuantities');
        this.setState({
            product: this.props.products
        });

        /*this.props.products.map((value, index) => {
            request.get(`${server.path}/api/Products/${value.productId}?access_token=${token}`).
                end((err, res) => {
                  if(res){
                    if(res.status === 200){
                      products.push(res.body);
                        if(index+1 === products.length){
                            this.setState({
                                products: products
                            });
                        }
                    } else {
                      alert(res.body.error.message);
                    }
                  } else {
                    alert('Service Unreachable');
                  }
            });
        });*/
    } else {
      window.location.href = '/';
    }
  }
  render() {
    return (
        <Table>
            <TableHead>
                <TableRow style={{fontSize: '1rem', fontWeight: 700, color: 'black'}}>
                    <TableCell numeric style={{fontWeight: 700}}>ID</TableCell>
                    <TableCell numeric style={{fontWeight: 700}}>Name</TableCell>
                    <TableCell numeric style={{fontWeight: 700}}>Quantity</TableCell>
                    <TableCell numeric style={{fontWeight: 700}}>Sale Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.product.map(n => {
                    return (
                        <TableRow key={n.productId}>
                            <TableCell>{n.productId}</TableCell>
                            <TableCell numeric>{n.name}</TableCell>
                            <TableCell numeric>{n.quantity}</TableCell>
                            <TableCell numeric>{n.salePrice}</TableCell>
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