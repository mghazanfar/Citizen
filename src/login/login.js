import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Grid from './Grid';
import '../App.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class App extends Component {
  componentWillMount(){
    //cookies.remove('accessToken');
      console.log(cookies.get('accessToken'));
    if(cookies.get('accessToken')) {
    } else {
      window.location.href = '/';
    }
  }
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
