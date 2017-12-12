import React, { Component } from 'react';
import Login from './img/slide3.jpg';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Owner from './login/Owner';
import Employee from './login/Employee';
import {
 Route,
 NavLink,
 Switch,
 BrowserRouter as Router
} from 'react-router-dom';

const styles = {
  main: {
    position: 'relative',
    height: '100vh',
    backgroundImage: "url("+Login+")",
    backgroundSize: 'cover',
    },
  inner: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    height: 'inherit',
    },
    data: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'inherit',
      flexDirection: 'column',
    }
}


class App extends Component {
  render() {
    return (
      <Router>
        <div style={styles.main}>
          <div style={styles.inner}>
            <div style={styles.data}>
            <Typography type="display3" gutterBottom style={{color:'white'}}>
              LOGIN AS
            </Typography>
            <NavLink to="/Owner">
            <Button raised component="span" style={{backgroundColor:'white', paddingLeft: 17, paddingRight: 17}}>
            OWNER
            </Button>
            </NavLink>
            <NavLink to="/Employee">
            <Button raised component="span" style={{backgroundColor:'rgba(0,150,136,1)', marginTop: '1rem', color: 'white'}}>
            Employee
            </Button>
            </NavLink>
            </div>
          </div>
        </div>
      </Router> 
<Switch>
<Route exact path="/Owner" component={Owner}/>
<Route path="/Employee" component={Employee} />
</Switch>
    );
  }
}

export default App;
