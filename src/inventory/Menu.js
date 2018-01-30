import React from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Menu, { MenuItem } from 'material-ui/Menu';

import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class SimpleMenu extends React.Component<props, {}> {
  state = {
    anchorEl: null,
    open: false,
    categories: []
  };

  componentWillMount(){
      let url = window.location.href.split('?')[1];
      this.setState({
          shop: url.split('=')[1]
      });
      request.get(server.path + '/api/Categories?filter=%7B%22where%22%3A%7B%22shopId%22%3A%22'+url.split('=')[1]+'%22%7D%7D&access_token=/?access_token=' + cookies.get('accessToken').accessToken).end(
          (err, category) => {
              if(category) {
                  if (category.body.length > 0) {
                      this.setState({
                          categories: category.body
                      });
                  } else {
                      this.setState({
                          categories: ['No Categories']
                      });
                  }
              } else {
                  alert('Service Unreachable');
              }
          }
      );

  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    if(this.props.category) {
      return (
      <Paper elevation={12} style={{marginBottom:'1rem', alignSelf:'flex-end', width:'max-content'}} >
        <Button
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Categories
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
            {
              this.state.categories.map(category => {
                return(
                    <MenuItem onClick={this.handleRequestClose}>{category}</MenuItem>
                );
              })
            }
        </Menu>
      </Paper>
    );
  }
  return (
    <Paper elevation={12} style={{marginBottom:'1rem', alignSelf:'flex-end', width:'max-content', marginTop:'1rem'}} >
      <Button
        aria-owns={this.state.open ? 'simple-menu' : null}
        aria-haspopup="true"
        onClick={this.handleClick}
      >
        Status
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={this.state.anchorEl}
        open={this.state.open}
        onRequestClose={this.handleRequestClose}
      >
        <MenuItem onClick={this.handleRequestClose}>Paid</MenuItem>
        <MenuItem onClick={this.handleRequestClose}>To be Paid</MenuItem>
        <MenuItem onClick={this.handleRequestClose}>Some amount paid</MenuItem>
      </Menu>
    </Paper>
  )
  }
}

export default SimpleMenu;