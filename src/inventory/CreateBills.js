import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/receipt.jpg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import ModalBills from './ModalBills';
import Menu from './Menu';
import Logout from './Logout';

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
    background: 'rgba(12, 134, 12, 0.9)',
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
      <Hidden lgDown>
        <Grid item xs={12} lg={8} style={styles.right}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%', height:'inherit' }}>
          <Paper elevation={24} style={{maxHeight:700, overflow:'auto', width:'inherit', padding:20, height:'inherit'}}>
          <TextField
          id="search"
          label="Customer name"
          type="search"
          margin="normal"
          style={{width:'100%'}}
          />
          <TextField
          id="search"
          label="Phone number"
          type="search"
          margin="normal"
          style={{width:'100%'}}
          />
          <ModalBills />
          <TextField
          id="search"
          label="Add discounts"
          type="search"
          margin="normal"
          style={{width:'100%'}}
          />
          <TextField
          id="search"
          label="Total Payment"
          type="search"
          margin="normal"
          style={{width:'100%'}}
          />
          <Menu />
          </Paper>
          <div style={{display:'flex', justifyContent:'space-around', width:'inherit'}}>
            <Link to='/AddCategory' style={styles.noUnderline}>
            <Button raised style={styles.button}>
            Create Bill
            </Button>
            </Link>
            <Link to='/AddCategory' style={styles.noUnderline}>
            <Button raised style={styles.button}>
            Cancel
            </Button>
            </Link>
        </div>
    </div>
 </Grid>
</Hidden>
      
        <Grid item xs={12} lg={4} style={styles.left}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:'4rem', marginBottom:'4rem', textAlign:'center' }}>
            <Typography type="display3" gutterBottom style={{color:'white'}}>
            CREATE BILL
            </Typography>
            <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Create bills for your customers here.</Typography>
            <Link to='/Inventory' style={styles.noUnderline}>
            <Button raised style={styles.button}>
            GO TO INVENTORY
            </Button>
            </Link>
            <Logout />
          </div>
        </Grid>

        <Hidden lgUp>
        <Grid item xs={12} lg={8} style={styles.right}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%', height:'inherit' }}>
          <Paper elevation={24} style={{maxHeight:700, overflow:'auto', width:'inherit', padding:10, height:'inherit'}}>
          <TextField
          id="search"
          label="Customer name"
          type="search"
          margin="normal"
          style={{width:'100%'}}
          />
          <TextField
          id="search"
          label="Phone number"
          type="search"
          margin="normal"
          style={{width:'100%'}}
          />
          <ModalBills />
          <TextField
          id="search"
          label="Add discounts"
          type="search"
          margin="normal"
          style={{width:'100%'}}
          />
          <TextField
          id="search"
          label="Total Payment"
          type="search"
          margin="normal"
          style={{width:'100%'}}
          />
          <Menu />
          </Paper>
          <div style={{display:'flex', justifyContent:'space-around', width:'inherit'}}>
            <Link to='/AddCategory' style={styles.noUnderline}>
            <Button raised style={styles.button}>
            Create Bill
            </Button>
            </Link>
            <Link to='/AddCategory' style={styles.noUnderline}>
            <Button raised style={styles.button}>
            Cancel
            </Button>
            </Link>
        </div>
    </div>
 </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(FullWidthGrid);