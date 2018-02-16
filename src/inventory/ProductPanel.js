import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import ModalDelete from './ModalDelete';
import {LinearProgress} from 'material-ui/Progress';

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
    products: [],
    loading: true
    };

  componentWillMount = () => {
      if(cookies.get('accessToken') === undefined) {
          window.location.href = '/';
      }
      if(window.location.href.split('shop=')[1] === undefined){
          window.location.href = '/Login';
      }
      let url = window.location.href.split('shop=')[1].split('&')[0];
      this.setState({
          shop: url
      });
      var accessToken = cookies.get('accessToken').accessToken;
        if (window.location.href.split('cat=')[1] !== undefined){
          let cat = window.location.href.split('cat=')[1].split('&')[0];
          console.log(cat);
          request.get(`${server.path}/api/Products?filter=%7B%22where%22%3A%7B%22categoryId%22%3A%22${cat}%22%7D%7D&access_token=${accessToken}`)
              .end((err, product) => {
              if(product) {
                  this.setState({loading: false})
                  if (product.status === 401) {
                      //window.location.href = '/';
                      alert(product.body.error.message);
                  }
                  if (product.body.length === 0) {
                      alert('No Products Available. Please add a few');
                      //window.location.href = '/AddProducts'
                  }
                  this.setState({
                      products: product.body

                  });
              } else {
                  alert('Service Unreachable');
              }
              });

      }else {
          request.get(`${server.path}/api/Products/products?shopId=${url}&access_token=${accessToken}`).
          end((err, product) => {
                  console.log(product);
                  if(product) {
                      this.setState({loading: false})
                      if (product.status === 401) {
                          alert(product.body.error.message);
                      }
                      if (product.body.length === 0) {
                          alert('No Products Available. Please add a few');
                          //window.location.href = '/AddProducts'
                      } else{
                          this.setState({
                              products: product.body.products

                          });
                      }
                  } else {
                      alert('Service Unreachable');
                  }
              }
          );
      }
  }

  render(){
    const { classes } = this.props;
    if(this.state.loading === true){
        return <LinearProgress/>
    } else {
        return (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow style={{fontSize: '1rem', fontWeight: 700, color: 'black'}}>
                        <TableCell style={{fontWeight: 700}}>Price</TableCell>
                        <TableCell numeric style={{fontWeight: 700}}>Brand</TableCell>
                        <TableCell numeric style={{fontWeight: 700}}>Model</TableCell>
                        <TableCell numeric style={{fontWeight: 700}}>Name</TableCell>
                        <TableCell numeric style={{fontWeight: 700}}>Color</TableCell>
                        <TableCell numeric style={{fontWeight: 700}}>Picture</TableCell>
                        <TableCell numeric style={{fontWeight: 700}}>Category</TableCell>
                        <TableCell numeric style={{fontWeight: 700}}>Quantity</TableCell>
                        <TableCell style={{textAlign: 'center', fontWeight: 700}}>Edit</TableCell>
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
                                <TableCell><Avatar src={n.image} style={{width: 70, height: 70}}/></TableCell>
                                <TableCell numeric>{n.category}</TableCell>
                                <TableCell numeric>{n.quantity}</TableCell>
                                <TableCell>
                                    <div><Link to={`/ModifyProduct?shop=${this.state.shop}&id=${n.id}`}
                                               style={styles.noUnderline}><Button id={n.id}
                                                                                  color='primary'>MODIFY</Button></Link><ModalDelete
                                        shop={this.state.shop} id={{id: n.id}}/></div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTable);