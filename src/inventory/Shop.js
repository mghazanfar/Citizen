import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/img2.jpg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import './clickables.css';
import { LinearProgress } from 'material-ui/Progress';

import Cookies from 'universal-cookie';
import server from "../constants";
import request from "superagent/superagent";
const cookies = new Cookies();
const styles = {
  left: {
      height: '100vh',
      background: '-webkit-linear-gradient(-125deg, yellow, black)',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
  },
  right: {
  backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
  },
  rightInner: {
    height: '100vh',
    background: '-webkit-linear-gradient(-125deg, yellow, #7B9016)',
    opacity: 0.8,
    display: 'flex',
    alignItems:'center',
    flexDirection:'column',
    textAlign:'left',
},
headline: {
  textDecoration: 'none',
  color: 'white',
}
};

class FullWidthGrid extends React.Component<props, {}> {
  state = {
    shop: window.location.href.split('?')[1],
    role: null,
  };
  componentWillMount() {
      if(cookies.get('accessToken') === undefined) {
          window.location.href = '/';
      }
      if(window.location.href.split('?')[1] === undefined) {
        window.location.href = '/Login';
      }
    let url = window.location.href.split('?')[1];
    this.setState({
        shop: url
    });
    let accessToke = cookies.get('accessToken').accessToken;
    request.get(`${server.path}/api/Accounts/role?access_token=${accessToke}`)
        .end((err, role) => {
            console.log(role);
            if(role){
                if(role.status === 200){
                   this.setState({
                       role : role.body.role.name
                   });
                } else {
                    alert(role.body.error.message);
                }
            } else {
                alert('Server Unreachable');
            }
        });
  }
  componentDidMount(){
      this.setState({
          shop: window.location.href.split('shop=')[1]
      });
  }

  adminMenu =
          <div>
              <Grid container spacing={0}>
                  <Grid item xs={12} md={6} lg={4} style={styles.left}>
                      <div>
                          <Typography type="display3" gutterBottom style={{color: 'white'}}>
                              Let's Start!
                          </Typography>
                          <Typography type="headline" gutterBottom style={{color: 'white'}}>
                              <Link to={`/ManageShop?shop=${window.location.href.split('shop=')[1]}`} style={styles.headline}>Shop management</Link>
                          </Typography>
                          <Typography type="headline" gutterBottom style={{color: 'white'}}>
                              <Link to={`/Inventory?shop=${window.location.href.split('shop=')[1]}`} style={styles.headline}>Inventory</Link>
                          </Typography>
                          <Typography type="headline" gutterBottom style={{color: 'white'}}>
                              <Link to={`/ProfitReports?shop=${window.location.href.split('shop=')[1]}`} style={styles.headline}>Profit handling</Link>
                          </Typography>
                          <Typography type="headline" gutterBottom style={{color: 'white'}}>
                              <Link to={`/HandleExpenses?shop=${window.location.href.split('shop=')[1]}`} style={styles.headline}>Expense handling</Link>
                          </Typography>
                          <Typography type="headline" gutterBottom style={{color: 'white'}}>
                              <Link to={`/ManageClaimStock?shop=${window.location.href.split('shop=')[1]}`} style={styles.headline}>Stock Claim Management</Link>
                          </Typography>
                          <Typography type="headline" gutterBottom style={{color: 'white'}}>
                              <Link to={`/ManageCompaniesBills?shop=${window.location.href.split('shop=')[1]}`} style={styles.headline}>Bills to companies record</Link>
                          </Typography>
                      </div>
                  </Grid>

                  <Grid item xs={12} md={6} lg={8} style={styles.right}>
                      <div style={styles.rightInner}>
                          <div style={{marginTop: '4rem', marginLeft: '4rem'}}>
                              <Typography type="display4" gutterBottom style={{color: 'white'}}>
                                  Citizen
                              </Typography>
                              <Typography type="display1" paragraph style={{color: 'white', width: '45%'}}>This portal is helpful
                                  for your shop. You can manage
                                  your products,salaries, expenses, Stock claimming, profit, and much more.</Typography>
                          </div>
                      </div>
                  </Grid>
              </Grid>
          </div>

    employeeMenu = <div>
        <Grid container spacing={0}>
            <Grid item xs={12} md={6} lg={4} style={styles.left}>
                <div>
                    <Typography type="display3" gutterBottom style={{color:'white'}}>
                        Let's Start!
                    </Typography>
                    <Typography type="headline" gutterBottom style={{color:'white'}}>
                        <Link to={`/AddAmounts?shop=${window.location.href.split('shop=')[1]}`} className='underline'>Add Daily Amounts</Link>
                    </Typography>
                    <Typography type="headline" gutterBottom style={{color:'white'}}>
                        <Link to={`/ManageOrders?shop=${window.location.href.split('shop=')[1]}`} className='underline'>See Bills</Link>
                    </Typography>
                    <Typography type="headline" gutterBottom style={{color:'white'}}>
                        <Link to={`/Products?shop=${window.location.href.split('shop=')[1]}`} className='underline'>Products</Link>
                    </Typography>
                    <Typography type="headline" gutterBottom style={{color:'white'}}>
                        <Link to={`/CreateBills?shop=${window.location.href.split('shop=')[1]}`} className='underline'>Create Bill</Link>
                    </Typography>
                </div>
            </Grid>

            <Grid item xs={12} md={6} lg={8} style={styles.right}>
                <div style={styles.rightInner}>
                    <div style={{ marginTop:'4rem', marginLeft:'4rem' }}>
                        <Typography type="display4" gutterBottom style={{color:'white'}}>
                            Citizen
                        </Typography>
                        <Typography type="display1" paragraph style={{color:'white', width:'45%'}}>This portal lets you add daily expenses of shop to manage your expenses.</Typography>
                    </div>
                </div>
            </Grid>
        </Grid>
    </div>
  render() {
      if(this.state.role === null) {
        return ( <LinearProgress/> );
      } else if(this.state.role === 'superAdmin'){
          return (this.adminMenu);
      } else {
          return (this.employeeMenu);
      }
  }
}

export default withStyles(styles)(FullWidthGrid);