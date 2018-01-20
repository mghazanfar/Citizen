import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import ModalDelete from './ModalDelete';

import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const styles = {
  noUnderline: {
    textDecoration: 'none',
  }
};

class BasicTable extends React.Component<props, {}> {
  state = {
    shop: null,
    products: []
    };

  componentWillMount = () => {
      if(cookies.get('accessToken').accessToken === undefined) {
          window.location.href = '/';
      }
      if(window.location.href.split('?')[1] === undefined){
          window.location.href = '/Login';
      }
      let url = window.location.href.split('?')[1];
      this.setState({
          shop: url.split('=')[1]
      });
      var accessToken = cookies.get('accessToken').accessToken;
      if(accessToken === undefined) {
          window.location.href = '/'
      } else {
          request.get(`${server.path}/api/Shops/${url.split('=')[1]}/products?access_token=${accessToken}`).end(
              (err, product) => {
                  if(product.status === 401) {
                      window.location.href = '/';
                  }
                  if(product.body.length === 0) {
                      alert('No Products Available. Please add a few');
                      //window.location.href = '/AddProducts'
                  }
                  this.setState({
                      products: product.body

                  });
              }
          );
      }
  }

  render(){
    const { classes } = this.props;
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
          {this.state.products.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell>{n.salePrice}</TableCell>
                <TableCell numeric>{n.brand}</TableCell>
                <TableCell numeric>{n.model}</TableCell>
                <TableCell numeric>{n.name}</TableCell>
                <TableCell numeric>{n.color}</TableCell>
                <TableCell><Avatar src={n.image} style={{width:70, height:70}} /></TableCell>
                <TableCell numeric>{n.category}</TableCell>
                <TableCell numeric>{n.quantity}</TableCell>
                <TableCell ><div><Link to={`/ModifyProduct?shop=${this.state.shop}&id=${n.id}`} style={styles.noUnderline}><Button id={n.id} color='primary'>MODIFY</Button></Link><ModalDelete shop={this.state.shop} id={{id: n.id}}/></div></TableCell>
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