import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Owner from '../img/shop4.jpg';
import Input, { InputLabel, InputAdornment  } from 'material-ui/Input';
import { FormControl  } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import {
 Link, Route,
} from 'react-router-dom';
import request from "../../node_modules/superagent/superagent";
import server from "../constants";
import Cookies from 'universal-cookie';
import LinearProgress from 'material-ui/Progress/LinearProgress';
const cookies = new Cookies();

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
    loggedin: false
};

handleChange = prop => event => {
  this.setState({ [prop]: event.target.value });
};

handleMouseDownPassword = event => {
  event.preventDefault();
};

login = () => {
  const url = server.path+'/api/Accounts/login';
  var data = {
    username: this.state.username,
    password: this.state.password
    }
    request
      .post(url)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(data)
      .end((err, res) => {
        if (res.status === 200) {
          cookies.set('accessToken', res.body.id, { path: '/' });
          console.log(cookies.get('accessToken'));
          this.setState({
            loggedin: true
          });
          window.location.href = '/Login';
        }
      }); 
  }

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
            <Input id= "username" name="username" onChange={this.handleChange('username')}/>
          </FormControl>
        <FormControl style={{minWidth:350, marginTop: '1rem'}}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="password"
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
        <Button type='submit' onClick={this.login.bind(this)} raised component="span" style={{backgroundColor:'rgba(0,150,136,1)', marginTop: '3rem', color: 'white'}}>
        LOGIN
        </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
