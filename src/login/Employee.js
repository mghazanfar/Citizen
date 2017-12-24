import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {
  main: {
    position: 'relative',
    height: '100vh',
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
      <div style={styles.main}>
        <div style={styles.inner}>
          <div style={styles.data}>
          <Typography type="display3" gutterBottom style={{color:'white'}}>
            LOGIN AS
          </Typography>
          <Button raised component="span" style={{backgroundColor:'rgba(0,150,136,1)', marginTop: '1rem', color: 'white'}}>
          Employee
          </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
