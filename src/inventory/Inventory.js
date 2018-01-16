import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/ipad.jpg';
import Categories from '../img/books.svg';
import Products from '../img/registered.svg';
import Add from '../img/plus-circle.svg';
import Bills from '../img/credit-card.svg';
import Orders from '../img/list-numbered.svg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import Logout from './Logout';

import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const styles = {
  left: {
      minHeight: '100vh',
      background: '-webkit-linear-gradient(-125deg, #D000F0, #E60080, #FF0000)',
      display: 'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
  },
  right: {
  backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
  },
  rightInner: {
    minHeight: '100vh',
    background: '-webkit-linear-gradient(-125deg, rgba(208,0,240,0.45), rgba(230,0,128,0.45), rgba(255,0,0,0.45))',
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
  };
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
                    <Link to={`/Categories?${this.state.shop}`} style={styles.headline}><img src={Categories} alt="" style={styles.svg}/>Categories</Link>
                  </Typography>
                  <Typography type="headline" gutterBottom style={{color: 'white'}}>
                    <Link to={`/Products?${this.state.shop}`} style={styles.headline}><img src={Products} alt="" style={styles.svg}/>Products</Link>
                  </Typography>
                  <Typography type="headline" gutterBottom style={{color: 'white'}}>
                    <Link to={`/AddProducts?${this.state.shop}`} style={styles.headline}><img src={Add} alt="" style={styles.svg}/>Add
                      Products</Link>
                  </Typography>
                  <Typography type="headline" gutterBottom style={{color: 'white'}}>
                    <Link to={`/CreateBills?${this.state.shop}`} style={styles.headline}><img src={Bills} alt="" style={styles.svg}/>Create
                      Bills</Link>
                  </Typography>
                  <Typography type="headline" gutterBottom style={{color: 'white'}}>
                    <Link to={`/ManageOrders?${this.state.shop}`} style={styles.headline}><img src={Orders} alt="" style={styles.svg}/>Manage
                      Orders</Link>
                  </Typography>
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
                    <Link to={`/Shop?${this.state.shop}`} style={styles.noUnderline}>
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
                        Inventory
                      </Typography>
                      <Typography type="display2" paragraph style={{color: 'white', width: '45%'}}>This inventory
                        section lets you manage categories & orders of
                        your furniture, add/remove/modify products, see products, and create bill for
                        payments.</Typography>
                    </Hidden>
                    <Hidden smUp>
                      <Typography type="display3" gutterBottom style={{color: 'white'}}>
                        Inventory
                      </Typography>
                      <Typography type="headline" paragraph style={{color: 'white', width: '45%'}}>This inventory
                        section lets you manage categories & orders of
                        your furniture, add/remove/modify products, see products, and create bill for
                        payments.</Typography>
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