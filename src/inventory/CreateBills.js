import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/receipt.jpg';
import Categories from '../img/books.svg';
import Products from '../img/registered.svg';
import Add from '../img/plus-circle.svg';
import Bills from '../img/credit-card.svg';
import Orders from '../img/list-numbered.svg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Table from '../img/table2.JPG';
import TextField from 'material-ui/TextField';
import ModalBills from './ModalBills';
import Menu from './Menu';

const styles = {
  left: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
  },
  right: {
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
},
  container: {
    height:'inherit',
    background: 'rgba(12, 134, 12, 0.9)',
},
root: {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover',
  height: '100vh',
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
      <Hidden mdDown>
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
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:'4rem', marginBottom:'4rem', }}>
            <Typography type="display3" gutterBottom style={{color:'white'}}>
            CREATE BILL
            </Typography>
            <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Create bills for your customers here.</Typography>
            <Link to='/Inventory' style={styles.noUnderline}>
            <Button raised style={styles.button}>
            GO TO INVENTORY
            </Button>
            </Link>
          </div>
        </Grid>

        <Hidden lgUp>
          <Grid item xs={12} lg={8} style={styles.right}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
            <Paper elevation={24} style={{maxHeight:400, overflow:'auto', width:'inherit', marginTop:'4rem'}}>
            <List>
              {[0, 1, 2, 3,4,5,6,7,8].map(value => (
                <ListItem key={value} dense button style={styles.listItem} divider>
                  <Avatar src={Table} style={styles.avatar}/>
                  <ListItemText primary={<Typography type="title" gutterBottom style={{color:'black'}}>Table {value + 1}</Typography>} secondary={"Tables for home, beautiful and durable."}/>
                  <ListItemSecondaryAction />
                  <Button color="primary">
                    MODIFY
                  </Button>
                  <Button color="accent">
                    DELETE
                  </Button>
                </ListItem>
              ))}
            </List>
            </Paper>
          <Link to='/AddCategory' style={styles.noUnderline}>
          <Button raised style={styles.button}>
            ADD CATEGORY
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