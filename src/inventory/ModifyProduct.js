import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/round.jpg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';
import Table from '../img/table2.JPG';
import TextField from 'material-ui/TextField';
import ModalModify from './ModalModify';

const styles = {
  left: {
      backgroundColor: 'rgba(255,255,255,0.4)',
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
    background: 'rgba(11, 222, 228, 0.9)',
},
root: {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'contain',
  minHeight: '100vh',
},
buttonUpload: {
  color:'white',
  backgroundColor:'black',
  marginLeft:'1rem',
},
labelUpload: {
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
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
        <Grid item xs={12} lg={4} style={styles.left} justify='center'>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:'4rem', marginBottom:'4rem', }}>
                <Hidden smDown>
                    <Typography type="display3" gutterBottom style={{color:'white', width:'65%', textAlign:'center'}}>
                    MODIFY PRODUCTS
                    </Typography>
                    <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'80%',}}>Here, you can modify your product.</Typography>
                    <Link to='/Inventory' style={styles.noUnderline}>
                    <Button raised style={styles.button}>
                    GO TO INVENTORY
                    </Button>
                    </Link>
                </Hidden>
                <Hidden smUp>
                    <Typography type="display1" gutterBottom style={{color:'white', width:'60%', textAlign:'center'}}>
                    MODIFY PRODUCTS
                    </Typography>
                    <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can modify your product.</Typography>
                    <Link to='/Inventory' style={styles.noUnderline}>
                    <Button raised style={styles.button}>
                    GO TO INVENTORY
                    </Button>
                    </Link>
                </Hidden>
            </div>
            </Grid>
      <Hidden lgDown>
        <Grid item xs={12} lg={8} style={styles.right}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
                <Paper elevation={24} style={{maxHeight:800, overflow:'auto', width:'inherit', padding: 20}}>
                    <TextField
                    id="search"
                    label="Category"
                    type="search"
                    margin="none"
                    style={{width:'100%'}}
                    />
                    <TextField
                    id="search"
                    label="Product Name"
                    type="search"
                    margin="none"
                    style={{width:'100%'}}
                    />
                    <TextField
                    id="search"
                    label="Model Number"
                    type="search"
                    margin="none"
                    style={{width:'100%'}}
                    />
                    <TextField
                    id="search"
                    label="Brand Name"
                    type="search"
                    margin="none"
                    style={{width:'100%'}}
                    />
                    <TextField
                    id="search"
                    label="Color"
                    type="search"
                    margin="none"
                    style={{width:'100%'}}
                    />
                    <TextField
                    id="search"
                    label="Base Price"
                    type="search"
                    margin="none"
                    style={{width:'100%'}}
                    />
                    <TextField
                    id="search"
                    label="Sale Price"
                    type="search"
                    margin="none"
                    style={{width:'100%'}}
                    />
                    <TextField
                    id="search"
                    label="Quantity"
                    type="search"
                    margin="none"
                    style={{width:'100%'}}
                    />
                    <div style={{display:'flex'}}>
                        <Avatar src={Table} style={styles.avatar}/>
                        <input
                        accept="image/*"
                        style={{display:'none'}}
                        id="raised-button-file"
                        multiple
                        type="file"
                        />
                        <label htmlFor="raised-button-file" style={styles.labelUpload}>
                        <Button raised component="span" style={styles.buttonUpload}>
                            Upload
                        </Button>
                        </label>
                        <Divider inset/>
                        </div>
                        <div style={{display:'flex',  justifyContent:'space-around'}}>
                        <ModalModify />
                            <Link to='/Products' style={styles.noUnderline}>
                                <Button raised style={styles.button}>
                                    CANCEL
                                </Button>
                            </Link>
                        </div>
                </Paper>
            </div>
        </Grid>
        </Hidden>
      

        <Hidden lgUp>
        <Grid item xs={12} lg={8} style={styles.right}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%', marginTop:'2rem' }}>
            <Paper elevation={24} style={{maxHeight:800, overflow:'auto', width:'inherit', padding: 10}}>
                <TextField
                id="search"
                label="Category"
                type="search"
                margin="none"
                style={{width:'100%'}}
                />
                <TextField
                id="search"
                label="Product Name"
                type="search"
                margin="none"
                style={{width:'100%'}}
                />
                <TextField
                id="search"
                label="Model Number"
                type="search"
                margin="none"
                style={{width:'100%'}}
                />
                <TextField
                id="search"
                label="Brand Name"
                type="search"
                margin="none"
                style={{width:'100%'}}
                />
                <TextField
                id="search"
                label="Color"
                type="search"
                margin="none"
                style={{width:'100%'}}
                />
                <TextField
                id="search"
                label="Base Price"
                type="search"
                margin="none"
                style={{width:'100%'}}
                />
                <TextField
                id="search"
                label="Sale Price"
                type="search"
                margin="none"
                style={{width:'100%'}}
                />
                <TextField
                id="search"
                label="Quantity"
                type="search"
                margin="none"
                style={{width:'100%'}}
                />
                <div style={{display:'flex'}}>
                    <Avatar src={Table} style={styles.avatar}/>
                    <input
                    accept="image/*"
                    style={{display:'none'}}
                    id="raised-button-file"
                    multiple
                    type="file"
                    />
                    <label htmlFor="raised-button-file" style={styles.labelUpload}>
                    <Button raised component="span" style={styles.buttonUpload}>
                        Upload
                    </Button>
                    </label>
                    <Divider inset/>
                    </div>
                    <div style={{display:'flex',  justifyContent:'space-around'}}>
                        <ModalModify />
                        <Link to='/Products' style={styles.noUnderline}>
                            <Button raised style={styles.button}>
                                CANCEL
                            </Button>
                        </Link>
                    </div>
            </Paper>
        </div>
    </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(FullWidthGrid);