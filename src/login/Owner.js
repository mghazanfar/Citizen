import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Owner from '../img/shop4.jpg';
import Input, { InputLabel, InputAdornment  } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { FormControl, FormHelperText  } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import {
 Route,
 Link,
 Switch,
} from 'react-router-dom';

const styles = {
  main: {
    position: 'relative',
    height: '100vh',
    backgroundImage: "url("+Owner+")",
    backgroundSize: 'cover',
    },
  inner: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 'inherit',
    },
    data: {
      display: 'flex',
      alignItems: 'center',
      height: 'inherit',
      flexDirection: 'column',
    },
    noUnderline: {
      textDecoration: 'none',
    }
}


class App extends Component {
  state = {
    amount: '',
    password: '',
    weight: '',
    showPassword: false,
};

handleChange = prop => event => {
  this.setState({ [prop]: event.target.value });
};

handleMouseDownPassword = event => {
  event.preventDefault();
};

handleClickShowPasssword = () => {
  this.setState({ showPassword: !this.state.showPassword });
};
  render() {
    return (
      <div style={styles.main}>
        <div style={styles.inner}>
          <div style={styles.data}>
          <Typography type="display2" gutterBottom style={{color:'grey', marginTop:'10rem'}}>
            OWNER
          </Typography>
          <FormControl style={{minWidth:350, marginTop: '3rem'}}>
            <InputLabel>
              Username
            </InputLabel>
            <Input/>
          </FormControl>
        <FormControl style={{minWidth:350, marginTop: '1rem'}}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={this.handleClickShowPasssword}
                  onMouseDown={this.handleMouseDownPassword}
                >{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Link to='/Login' style={styles.noUnderline}>
        <Button raised component="span" style={{backgroundColor:'rgba(0,150,136,1)', marginTop: '3rem', color: 'white'}}>
        LOGIN
        </Button>
        </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
