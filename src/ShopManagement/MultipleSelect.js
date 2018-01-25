import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

class MultipleSelect extends React.Component<props, {}> {
  state = {
    name: '',
    role: [],
  };

    componentWillMount(){
        console.log(this.props);
        if(cookies.get('accessToken') === undefined){
            window.location.href = '/';
        }
        let accessToken = cookies.get('accessToken').accessToken;
        request.get(`${server.path}/api/Roles?access_token=${accessToken}`)
            .end((err, res) => {
              if(!res){
                alert('Service Unreachable');
              } else {
                if(res.statusCode === 200){
                    this.setState({
                        role: res.body
                    });
                } else {
                  alert(res.body.error.message);
                }
              }
            });
    }

  handleChange = event => {
    this.setState({ name: event.target.value });
    let url = window.location.href.split('&role=')[1];
    if(url === undefined){
      url = `${window.location.href}&role=${event.target.value}`;
        window.history.pushState('index.html', 'title', url);
    } else {
      url = window.location.href.split('&role=')[0];
      url += `&role=${event.target.value}`;
      window.history.pushState('index.html', 'title', url);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-multiple">Select roles</InputLabel>
          <Select
            margin="normal"
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="name-multiple" />}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 200,
                },
              },
            }}
          >
            {this.state.role.map(name => (
              <MenuItem
                key={name.name}
                value={name.name}
                style={{
                  fontWeight: this.state.name.indexOf(name.name) !== -1 ? '500' : '400',
                }}
              >
                {name.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultipleSelect);