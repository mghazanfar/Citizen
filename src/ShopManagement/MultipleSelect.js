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

class MultipleSelect extends React.Component {
  state = {
    name: [],
    role: '',
  };

    componentWillMount(){
        if(cookies.get('accessToken') === undefined){
            window.location.href = '/';
        }
        request.get(`${server.path}/api/Roles?access_tokn=${cookies.get('accessToken').accessToken}`)
            .end((err, res) => {
                this.setState({
                    name: res.body
                });
            });
    }
    selected(name) {
      this.setState({role: name});
    }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-multiple">Select roles</InputLabel>
          <Select
            multiple
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
            {this.state.name.map(name => (
              <MenuItem
                key={name.name}
                value={name.name}
                onClick={this.selected.bind(null, name.name)}
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