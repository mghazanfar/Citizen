import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/Manage.jpg';
import Add from '../img/plus-circle.svg';
import Remove from '../img/remove.svg';
import Profile from '../img/user.svg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import Logout from '../inventory/Logout';
import '../inventory/clickables.css';

import Cookies from 'universal-cookie';
import server from "../constants";
import request from "superagent/superagent";
const cookies = new Cookies();
const styles = {
  left: {
      minHeight: '100vh',
      background: '-webkit-linear-gradient(-125deg, #D000F0, #E60080, #FF0000)',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
  },
  right: {
  backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
  },
  rightInner: {
    minHeight: '100vh',
    background: '-webkit-linear-gradient(-125deg, rgba(208,0,240,0.8), rgba(230,0,128,0.8), rgba(255,0,0,0.8))',
    display: 'flex',
    alignItems:'center',
    flexDirection:'column',
    textAlign:'left',
},
svg: {
  height: 20,
  width: 20,
  marginRight: 10,
  fillColor: 'white',
},
headline: {
  textDecoration: 'none',
  color: 'white',
},
noUnderline: {
  textDecoration:'none',
},
button: {
  color:'white',
  backgroundColor:'black',
  marginTop:'4rem',
},
};

class FullWidthGrid extends React.Component<props, {}> {
  state = {
    shop: null,
  }
  componentWillMount(){
    if(cookies.get('accessToken').accessToken === undefined) {
      window.location.href = '/';
    }
    if(window.location.href.split('?')[1] === undefined){
      window.location.href = '/Login';
    }
    let url = window.location.href.split('?')[1];
    this.setState({
        shop: url
    });
  }

  render() {
      return (
          <div>
            <Grid container spacing={0}>
              <Grid item xs={12} md={6} lg={4} style={styles.left}>
                <div>
                  <Typography type="display3" gutterBottom style={{color: 'white'}}>
                    Go to:
                  </Typography>
                  <Typography type="headline" gutterBottom style={{color: 'white'}}>
                    <Link to={`/AddAccount?${this.state.shop}`} className='underline'><img src={Add} alt="" style={styles.svg}/>Add Account</Link>
                  </Typography>
                  <Typography type="headline" gutterBottom style={{color: 'white'}}>
                    <Link to={`/DeleteAccount?${this.state.shop}`} className='underline'><img src={Remove} alt="" style={styles.svg}/>Delete
                      Account</Link>
                  </Typography>
                  <Typography type="headline" gutterBottom style={{color: 'white'}}>
                    <Link to={`/MyAccount?${this.state.shop}`} className='underline'><img src={Profile} alt="" style={styles.svg}/>My
                      Account</Link>
                  </Typography>
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
                    <Link to={`/Shop?${this.state.shop}`} className='underline'>
                      <Button raised style={styles.button}>
                        BACK
                      </Button>
                    </Link>
                  </div>
                  <Logout/>
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={8} style={styles.right}>
                <div style={styles.rightInner}>
                  <div style={{marginTop: '4rem', marginLeft: '3rem'}}>
                    <Hidden smDown>
                      <Typography type="display4" gutterBottom style={{color: 'white'}}>
                        Manage Shop
                      </Typography>
                      <Typography type="display2" paragraph style={{color: 'white', width: '45%'}}>This Shop Management
                        section lets you manage accounts of your employees.</Typography>
                    </Hidden>
                    <Hidden smUp>
                      <Typography type="display3" gutterBottom style={{color: 'white'}}>
                        Inventory
                      </Typography>
                      <Typography type="headline" paragraph style={{color: 'white', width: '45%'}}>This Shop Management
                        section lets you manage accounts of your employees.</Typography>
                    </Hidden>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
      );
  }
}

export default withStyles(styles)(FullWidthGrid);