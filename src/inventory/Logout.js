import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import setting from '../img/settings.svg';
import { withStyles } from 'material-ui/styles';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';

import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem'
  },
  popperClose: {
    pointerEvents: 'none',
  },
  button: {
    color:'white',
    backgroundColor:'black',
  },
};

class MenuListComposition extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  logout = () => {
    var accessToken = cookies.get('accessToken').accessToken;
    if(accessToken === undefined ){
      window.location.href = '/';
    }
    request.post(server.path+'/api/Accounts/logout?access_token='+accessToken)
        .end((err, res) => {
          if(res.status === 204) {
            cookies.remove('accessToken');
            window.location.href = '/'
          }
        });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Manager>
          <Target>
            <Button fab raised
              aria-owns={this.state.open ? 'menu-list' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              style={styles.button}
            >
              <img src={setting} width={25} height={25} />
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListComposition);