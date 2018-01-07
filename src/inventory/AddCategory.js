import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/zimp.jpg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';
import Sofa from '../img/sofa.png';
import ModalCategory from './ModalCategory';
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
    background: 'rgba(228, 11, 11, 0.9)',
    overflow:'auto',
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
},
labelUpload: {
  alignSelf: 'center',
  marginLeft: '1rem',
}
};

function FullWidthGrid(props) {
  state = {
    name: null,
    description: null,
    image: null,
  }

  return (
    <div style={styles.root}>
      <Grid container spacing={0} style={styles.container} justify='center'>
        <Hidden lgDown>
          <Grid item xs={10} lg={8} style={styles.right}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
            <Paper elevation={24} style={{maxHeight:400, overflow:'auto', width:'inherit', marginTop:'4rem', padding:30, display:'flex', flexDirection:'column'}}>
            <TextField
            id="full-width"
            label="Name"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Write name of category"
            fullWidth
            margin="normal"
          />
          <TextField
            id="full-width"
            label="Description"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Write desciption of category"
            fullWidth
            margin="normal"
          />
          <div style={{display:'flex'}}>
            <Avatar src={Sofa} style={styles.avatar}/>
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
            <ModalCategory />
            </Paper>
          </div>
        </Grid>
        </Hidden>
      
        <Grid item xs={12} lg={4} style={styles.left}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:'4rem', marginBottom:'4rem', textAlign:'center' }}>
            <Hidden smDown>
            <Typography type="display3" gutterBottom style={{color:'white'}}>
            ADD CATEGORIES
            </Typography>
            <Typography type="headline" paragraph style={{color:'white', width:'60%',}} align="center" >Here, You can add a category from here.</Typography>
            <Link to="/Inventory" style={styles.noUnderline}>
            <Button raised style={styles.button}>
            GO TO INVENTORY
            </Button>
            </Link>
            <Logout />
            </Hidden>
            <Hidden smUp>
            <Typography type="display1" gutterBottom style={{color:'white'}}>
            ADD CATEGORIES
            </Typography>
            <Typography type="headline" paragraph style={{color:'white', width:'60%',}} align="center" >Here, You can add a category from here.</Typography>
            <Link to="/Inventory" style={styles.noUnderline}>
            <Button raised style={styles.button}>
            GO TO INVENTORY
            </Button>
            </Link>
            <Logout />
            </Hidden>
          </div>
        </Grid>

        <Hidden lgUp>
         <Grid item xs={10} lg={8} style={styles.right}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
            <Paper elevation={24} style={{maxHeight:400, overflow:'auto', width:'inherit', marginTop:'4rem', padding:30, display:'flex', flexDirection:'column'}}>
            <TextField
            id="full-width"
            label="Name"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Write name of category"
            fullWidth
            margin="normal"
          />
          <TextField
            id="full-width"
            label="Description"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Write desciption of category"
            fullWidth
            margin="normal"
          />
          <div style={{display:'flex'}}>
            <Avatar src={Sofa} style={styles.avatar}/>
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
            <ModalCategory
                addData={{name: this.state.name,
                    productName: this.state.productName,
                    modelNumber: this.state.modelNumber,
                    brandName: this.state.brandName,
                    color: this.state.color,
                    basePrice: this.state.basePrice,
                    salePrice: this.state.salePrice,
                    quantity: this.state.quantity,
                    img: this.state.img,
                    file: this.state.file,}}
            />
            </Paper>
          </div>
        </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(FullWidthGrid);