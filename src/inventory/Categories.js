import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/zimp.jpg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Table from '../img/table2.JPG';

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
    background: 'rgba(228, 11, 11, 0.9)',
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

function FullWidthGrid(props) {

  return (
  <div style={styles.root}>
    <Grid container spacing={0} style={styles.container}>
      <Hidden lgDown>
        <Grid item xs={12} lg={8} style={styles.right}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
          <Paper elevation={24} style={{maxHeight:400, overflow:'auto', width:'inherit'}}>
          <List>
            {[0, 1, 2, 3,4,5,6,7,8].map(value => (
              <Link to='/Products' style={styles.noUnderline}><ListItem key={value} dense button style={styles.listItem} divider>
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
              </Link>
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
    
    <Grid item xs={12} lg={4} style={styles.left}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:'4rem', marginBottom:'4rem', }}>
            <Typography type="display3" gutterBottom style={{color:'white'}}>
            CATEGORIES
            </Typography>
            <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can see all the categories of your furniture. You can also add/remove/modify a category from here.</Typography>
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