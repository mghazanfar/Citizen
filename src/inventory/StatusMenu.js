import React from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Menu, { MenuItem } from 'material-ui/Menu';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Paper elevation={12} style={{marginBottom:'1rem', alignSelf:'flex-end'}} >
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
          <MenuItem onClick={this.handleRequestClose}>To be paid</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Paid</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Some amount remaining</MenuItem>
        </Menu>
      </Paper>
    );
  }
}

export default SimpleMenu;