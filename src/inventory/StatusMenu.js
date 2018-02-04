import React from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Menu, { MenuItem } from 'material-ui/Menu';

class SimpleMenu extends React.Component {
  state = {
    status: 'Status',
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = (status) => {
      this.setState({ open: false, status: status });
  };

  render() {
    return (
      <Paper elevation={12} style={{marginBottom:'1rem', alignSelf:'flex-end', width:'fit-content'}} >
        <Button
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
            {this.state.status}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleRequestClose.bind(null, 'Partial')}>Partial</MenuItem>
          <MenuItem onClick={this.handleRequestClose.bind(null, 'Paid')}>Paid</MenuItem>
          <MenuItem onClick={this.handleRequestClose.bind(null, 'Unpaid')}>Unpaid</MenuItem>
        </Menu>
      </Paper>
    );
  }
}

export default SimpleMenu;