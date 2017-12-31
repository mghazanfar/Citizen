import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/img2.jpg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';

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

function FullWidthGrid(props) {

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} lg={4} style={styles.left}>
            <div>
            <Typography type="display3" gutterBottom style={{color:'white'}}>
            Let's Start!
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/ManageShop' style={styles.headline}>Shop management</Link>
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/Inventory' style={styles.headline}>Inventory</Link>
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/HandleProfit' style={styles.headline}>Profit handling</Link>
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/HandleExpenses' style={styles.headline}>Expense handling</Link>
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/ManageClaimStock' style={styles.headline}>Stock Claim Management</Link>
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/ManageCompaniesBills' style={styles.headline}>Bills to companies record</Link>
          </Typography>
            </div>
        </Grid>

        <Grid item xs={12} md={6} lg={8} style={styles.right}>
        <div style={styles.rightInner}>
          <div style={{ marginTop:'4rem', marginLeft:'4rem' }}>
          <Typography type="display4" gutterBottom style={{color:'white'}}>
           Citizen
          </Typography>
          <Typography type="display1" paragraph style={{color:'white', width:'45%'}}>This portal is helpful for your shop. You can manage 
            your products,salaries, expenses, Stock claimming, profit, and much more.</Typography>
            </div>
            </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(FullWidthGrid);