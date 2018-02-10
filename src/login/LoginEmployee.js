import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/img2.jpg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import '../inventory/clickables.css';

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
            <Link to='/AddAmounts' className='underline'>Add Daily Amounts</Link>
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/ManageOrders' className='underline'>See Bills</Link>
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/Products' className='underline'>Products</Link>
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/CreateBills' className='underline'>Create Bill</Link>
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
  );
}

export default withStyles(styles)(FullWidthGrid);