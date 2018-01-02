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

function FullWidthGrid(props) {

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} lg={4} style={styles.left}>
            <div>
            <Typography type="display3" gutterBottom style={{color:'white'}}>
            Go to:
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/AddAccount' style={styles.headline}><img src={Add} alt="" style={styles.svg} />Add Account</Link>
            </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/DeleteAccount' style={styles.headline}><img src={Remove} alt="" style={styles.svg} />Delete Account</Link>
            </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/MyAccount' style={styles.headline}><img src={Profile} alt="" style={styles.svg} />My Account</Link>
            </Typography>
          <div style={{display:'flex', justifyContent:'center', marginTop:'3rem'}}>
          <Link to='/Shop' style={styles.noUnderline}>
            <Button raised style={styles.button}>
            BACK
            </Button>
            </Link>
          </div>
            <Logout />
            </div>
        </Grid>
        <Grid item xs={12} md={6} lg={8} style={styles.right}>
        <div style={styles.rightInner}>
        <div style={{ marginTop:'4rem', marginLeft:'3rem' }}>
          <Hidden smDown>
            <Typography type="display4" gutterBottom style={{color:'white'}}>
            Manage Shop
            </Typography>
            <Typography type="display2" paragraph style={{color:'white', width:'45%'}}>This Shop Management section lets you manage accounts of your employees.</Typography>
            </Hidden>
          <Hidden smUp>
            <Typography type="display3" gutterBottom style={{color:'white'}}>
            Inventory
            </Typography>
            <Typography type="headline" paragraph style={{color:'white', width:'45%'}}>This Shop Management section lets you manage accounts of your employees.</Typography>
            </Hidden>
          </div>
            </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(FullWidthGrid);