import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Owner from '../img/shop4.jpg';
import Input, { InputLabel, InputAdornment  } from 'material-ui/Input';
import { FormControl  } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import request from "../../node_modules/superagent/superagent";
import server from "../constants";
import Cookies from 'universal-cookie';
const cookies = new Cookies()


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

class AuthExample extends React.Component {
  state = {
    amount: '',
    password: '',
    weight: '',
    showPassword: false,    
    redirectToReferrer: false
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

login = () => {
  console.log('here', this.state.username);
  const url = server.path+'/api/Accounts/login';
  var data = {
    username: this.state.username,
    password: this.state.password
    }
    request
      .post(url)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(data)
      .end(function(err, res){
        if (res.status === 200) {
          cookies.set('accessToken', res.body.id, { path: '/' });
          console.log(cookies.get('accessToken'));
          this.setState({ redirectToReferrer: true });
        } else {
          console.log(res);
        }
      }); 
  };

  render(){ 
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

  return (
  <Router>
    <div>
      <AuthButton/>
      <div style={styles.main}>
      <div style={styles.inner}>
        <div style={styles.data}>
        <Typography type="display2" gutterBottom style={{color:'grey', marginTop:'10rem'}}>
          OWNER
        </Typography>
        <FormControl style={{minWidth:350, marginTop: '3rem'}}>
          <InputLabel required>
            Username
          </InputLabel>
          <Input id= "username" name="username" onChange={this.handleChange('username')}/>
        </FormControl>
      <FormControl style={{minWidth:350, marginTop: '1rem'}}>
        <InputLabel htmlFor="password" required>Password</InputLabel>
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
      <Link to='/login' style={styles.noUnderline}>
        <Button raised component="span" style={{backgroundColor:'rgba(0,150,136,1)', marginTop: '3rem', color: 'white'}} type='submit' onClick={this.login.bind(this)}>
        LOGIN
        </Button>
      </Link>
        </div>
      </div>
    </div>
      <PrivateRoute path="/protected" component={Protected}/>
    </div>
  </Router>
  )
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (      
      <Link to='/' style={styles.noUnderline}>
      <Button raised component="span" style={{backgroundColor:'rgba(0,150,136,1)', marginTop: '3rem', color: 'white'}} onClick={() => {
        fakeAuth.signout(() => history.push('/Owner'))
      }}>
      SIGN OUT
      </Button>
      </Link>
  ) : null
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

export default AuthExample
