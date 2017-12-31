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
          <MenuItem onClick={this.handleRequestClose}>Chair</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Table</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Sofa</MenuItem>
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