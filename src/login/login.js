import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Grid from './Grid';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="selectShop">
        <div className="selectShopGradient text-center">
        <Typography type="display2" gutterBottom style={{color:'white', paddingTop:'10rem'}}>
            SELECT SHOP
          </Typography>
          <Grid />
        </div>
      </div>
    );
  }
}

export default App;
