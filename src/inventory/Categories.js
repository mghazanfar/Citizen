import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/zimp.jpg';
import Categories from '../img/books.svg';
import Products from '../img/registered.svg';
import Add from '../img/plus-circle.svg';
import Bills from '../img/credit-card.svg';
import Orders from '../img/list-numbered.svg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';

const styles = {
  left: {
      height: '100vh',
      background: '-webkit-linear-gradient(-125deg, #D000F0, #E60080, #FF0000)',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
  },
  container: {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
},
  right: {
  },
  rightInner: {
    height: '100vh',
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
}
};

function FullWidthGrid(props) {

  return (
    <div>
      <Grid container spacing={0} style={styles.container}>
        <Grid item xs={8} style={styles.right}>
        <div style={styles.rightInner}>
        <div style={{ marginTop:'4rem', marginLeft:'4rem' }}>
        <Typography type="display4" gutterBottom style={{color:'white'}}>
         CATEGORIES
        </Typography>
        <Typography type="display1" paragraph style={{color:'white', width:'45%'}}>Here, you can see all the categories of your furniture. You can also add/remove/modify a category from here.</Typography>
          </div>
            </div>
        </Grid>
        <Grid item xs={4} style={styles.left}>
            <div>
            <Typography type="display3" gutterBottom style={{color:'white'}}>
            Go to:
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/Categories' style={styles.headline}><img src={Categories} style={styles.svg} />Categories</Link>
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/Products' style={styles.headline}><img src={Products} style={styles.svg} />Products</Link>
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/AddProducts' style={styles.headline}><img src={Add} style={styles.svg} />Add Products</Link>
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/CreateBills' style={styles.headline}><img src={Bills} style={styles.svg} />Create Bills</Link>
          </Typography>
            <Typography type="headline" gutterBottom style={{color:'white'}}>
            <Link to='/ManageOrders' style={styles.headline}><img src={Orders} style={styles.svg} />Manage Orders</Link>
          </Typography>
            </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(FullWidthGrid);