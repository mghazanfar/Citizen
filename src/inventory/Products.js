import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/round.jpg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import Menu from './Menu';
import ProductPanel from './ProductPanel';

const styles = {
  left: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
      minHeight:'100vh',
  },
  right: {
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    minHeight:'100vh',
},
  container: {
    height:'inherit',
    background: 'rgba(47, 11, 228, 0.9)',
},
root: {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'contain',
  minHeight:'100vh',
},
  rightInner: {
    height: '100vh',
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
  height:100,
},
avatar: {
  width:70,
  height:70,
},
noUnderline: {
  textDecoration: 'none',
}
};

function FullWidthGrid(props) {

  return (
  <div style={styles.root}>
    <Grid container spacing={0} style={styles.container}>
        <Grid item xs={12} lg={2} style={styles.left}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:'4rem', marginBottom:'4rem', }}>
              <Hidden lgDown>
                <Hidden smDown>
                  <Typography type="display1" gutterBottom style={{color:'white'}}>
                  PRODUCTS
                  </Typography>
                  <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can see all thethe products of all/specific categories.</Typography>
                </Hidden>
                <Link to='/Inventory' style={styles.noUnderline}>
                <Button raised style={styles.button}>
                GO TO INVENTORY
                </Button>
                </Link>
              </Hidden>
              <Hidden lgUp>
                <Hidden smUp>
                  <Typography type="display2" gutterBottom style={{color:'white'}}>
                  PRODUCTS
                  </Typography>
                  <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can see all the products of all/specific categories.</Typography>
                </Hidden>
                <Hidden smDown>
                <Typography type="display3" gutterBottom style={{color:'white'}}>
                PRODUCTS
                </Typography>
                <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can see all the products of all/specific categories.</Typography>
                </Hidden>
                <Link to='/Inventory' style={styles.noUnderline}>
                <Button raised style={styles.button}>
                GO TO INVENTORY
                </Button>
                </Link>
              </Hidden>
            </div>
            </Grid>
      <Hidden mdDown>
        <Grid item xs={12} lg={10} style={styles.right}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'99%' }}>
                <Menu category/>
                <Paper elevation={24} style={{maxHeight:600, overflow:'auto', width:'inherit'}}>
                  <ProductPanel/>
                </Paper>
                <Link to='/AddProducts' style={styles.noUnderline}>
                <Button raised style={styles.button}>
                    ADD PRODUCT
                </Button>
                </Link>
            </div>
        </Grid>
        </Hidden>
      
        <Hidden mdUp>
          <Grid item xs={12} lg={10} style={styles.right}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'99%' }}>
                  <Menu category/>
                  <Paper elevation={24} style={{maxHeight:600, overflow:'auto', width:'inherit'}}>
                    <ProductPanel/>
                  </Paper>
                  <Link to='/AddProducts' style={styles.noUnderline}>
                  <Button raised style={styles.button}>
                      ADD PRODUCT
                  </Button>
                  </Link>
              </div>
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(FullWidthGrid);