import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/level.jpg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import ManageDates from './ManageDates';
import Logout from './Logout';
/*//import DatePickerExampleToggle from 'DatePicker';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';*/

import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const styles = {
  left: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
      minHeight: '100vh',
  },
  right: {
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    minHeight: '100vh',
},
  container: {
    height:'inherit',
    background: 'rgba(0, 0, 0, 0.9)',
},
root: {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover',
  minHeight: '100vh',
},
  rightInner: {
    minHeight: '100vh',
    background: '-webkit-linear-gradient(-125deg, rgba(208,0,240,0.45), rgba(230,0,128,0.45), rgba(255,0,0,0.45))',
    display: 'flex',
    alignItems:'center',
    flexDirection:'column',
    textAlign:'left',
},
button: {
  color:'white',
  backgroundColor:'black',
  marginTop:'4rem',
},
headline: {
  textDecoration: 'none',
  color: 'white',
},
listItem: {
  minHeight:100,
},
avatar: {
  width:70,
  height:70,
},
noUnderline: {
  textDecoration: 'none',
}
};

class FullWidthGrid extends React.Component<props, {}> {
  state = {
    orders: []
  };

  componentWillMount(){
      if(cookies.get('accessToken').accessToken === undefined) {
          window.location.href = '/';
      }
      if(window.location.href.split('?shop=')[1] === undefined){
          window.location.href = '/Login';
      }
      let url = window.location.href.split('?shop=')[1];
      let accessToken = cookies.get('accessToken').accessToken;
      this.setState({
          shop: url
      });
      let today = new Date;
      let date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
      request.get(`${server.path}/api/Shops/${url}/bills?filter=%7B%22where%22%3A%7B%22date%22%3A%22${date}%22%7D%7D&access_token=${accessToken}`).
          end((err, bills) => {
        if(bills) {
            if (bills.statusCode !== 200) {
              alert(bills.body.error.message);
            } else {
              console.log(bills.body);
              this.setState({
                  orders: bills.body
              });
            }
        } else {
          alert('Could not reach service');
        }
      });
  }

  render() {
      return (
          <div style={styles.root}>
            <Grid container spacing={0} style={styles.container}>
              <Hidden lgDown>
                <Grid item xs={12} lg={8} style={styles.right}>
                  <div style={{maxHeight: 700, overflow: 'auto'}}>
                      {this.state.orders.map(value => (
                          <ManageDates key={value}/>
                      ))}
                  </div>
                </Grid>
              </Hidden>

              <Grid item xs={12} lg={4} style={styles.left}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '4rem',
                    marginBottom: '4rem',
                    textAlign: 'center'
                }}>
                  <Typography type="display3" gutterBottom style={{color: 'white'}}>
                    Manage Orders
                  </Typography>
                  <Typography type="headline" paragraph style={{color: 'white', textAlign: 'center', width: '60%',}}>Manage
                    your orders here and keep track of their status.</Typography>
                  <Link to='/Inventory' style={styles.noUnderline}>
                    <Button raised style={styles.button}>
                      GO TO INVENTORY
                    </Button>
                  </Link>
                  <Link to='/CreateBills' style={styles.noUnderline}>
                    <Button raised style={styles.button}>
                      Create a bill
                    </Button>
                  </Link>
                  <Logout/>
                </div>
              </Grid>

              <Hidden lgUp>
                <Grid item xs={12} lg={8} style={styles.right}>
                  <div style={{maxHeight: 700, overflow: 'auto'}}>
                      {this.state.orders.map(value => (
                          <ManageDates key={value}/>
                      ))}
                  </div>
                </Grid>
              </Hidden>
            </Grid>
          </div>
      );
  }
}

export default withStyles(styles)(FullWidthGrid);