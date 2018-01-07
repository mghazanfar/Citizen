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
import ModalProducts from './ModalProducts';
import Logout from './Logout';

const styles = {
  left: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    right: {
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    minHeight:650,
    },
    container: {
    minHeight:'inherit',
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


class TextFields extends React.Component<props, {}> {
    state = {
      category: this.props.category,
      productName: this.props.productName,
      modelNumber: this.props.modelNumber,
      brandName: this.props.brandName,
      color: this.props.color,
      basePrice: this.props.basePrice,
      salePrice: this.props.salePrice,
      quantity: this.props.quantity,
      img: this.props.img,
      file: this.props.file,
    };
  
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      console.log('handle uploading-', this.state.file);
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          img: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    handleChange = (name, description) => event => {
      this.setState({
        [name]: event.target.value,
        [description]: event.target.value,
      });
    };
  
    render() {
      const { classes } = this.props;
      let {img} = this.state;
      let $imagePreview = null;
      return (
        <div style={styles.root}>
          <Grid container spacing={0} style={styles.container} justify='center'>
              <Grid item xs={12} lg={4} style={styles.left}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:'4rem', marginBottom:'4rem', }}>
                      <Hidden smDown>
                      <Typography type="display3" gutterBottom style={{color:'white', width:'60%', textAlign:'center'}}>
                      MODIFY PRODUCTS
                      </Typography>
                      <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can modify your product.</Typography>
                      <Link to='/Inventory' style={styles.noUnderline}>
                      <Button raised style={styles.button}>
                      GO TO INVENTORY
                      </Button>
                      </Link>
                      <Logout />
                      </Hidden>
                      <Hidden smUp>
                      <Typography type="display1" gutterBottom style={{color:'white', width:'75%', textAlign:'center'}}>
                      MODIFY PRODUCTS
                      </Typography>
                      <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can modify your product.</Typography>
                      <Link to='/Inventory' style={styles.noUnderline}>
                      <Button raised style={styles.button}>
                      GO TO INVENTORY
                      </Button>
                      </Link>
                      <Logout />
                      </Hidden>
                  </div>
                  </Grid>
            <Hidden lgDown>
              <Grid item xs={12} lg={8} style={styles.right}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
                      <Paper elevation={24} style={{maxHeight:600, overflow:'auto', width:'inherit', padding: 20}}>
                          <TextField
                          label="Category"
                          className={classes.textField}
                          placeholder={this.state.category}
                          onChange={this.handleChange('category')}
                          fullWidth
                        />
                          <TextField
                          label="Product Name"
                          className={classes.textField}
                          placeholder={this.state.productName}
                          onChange={this.handleChange('productName')}
                          fullWidth
                        />
                          <TextField
                          label="Model Number"
                          className={classes.textField}
                          placeholder={this.state.modelNumber}
                          onChange={this.handleChange('modelNumber')}
                          fullWidth
                        />
                          <TextField
                          label="Brand Name"
                          className={classes.textField}
                          placeholder={this.state.brandName}
                          onChange={this.handleChange('brandName')}
                          fullWidth
                        />
                          <TextField
                          label="Color"
                          className={classes.textField}
                          placeholder={this.state.color}
                          onChange={this.handleChange('color')}
                          fullWidth
                        />
                          <TextField
                          label="Base Price"
                          className={classes.textField}
                          placeholder={this.state.basePrice}
                          onChange={this.handleChange('basePrice')}
                          fullWidth
                        />
                          <TextField
                          label="Sale Price"
                          className={classes.textField}
                          placeholder={this.state.salePrice}
                          onChange={this.handleChange('salePrice')}
                          fullWidth
                        />
                          <TextField
                          label="Quantity"
                          className={classes.textField}
                          placeholder={this.state.quantity}
                          onChange={this.handleChange('quantity')}
                          fullWidth
                        />
                          <div style={{display:'flex'}}>
                              <Avatar src={img} style={styles.avatar}/>
                              <input
                              accept="image/*"
                              style={{display:'none'}}
                              id="raised-button-file"
                              multiple
                              type="file"
                              onChange={(e)=>this._handleImageChange(e)}
                              />
                              <label htmlFor="raised-button-file" style={styles.labelUpload}>
                              <Button raised component="span" style={styles.buttonUpload}>
                                  Upload
                              </Button>
                              </label>
                              <Divider inset/>
                              </div>
                              <div style={{display:'flex',  justifyContent:'space-around'}}>
                              <ModalProducts addData={{category: this.state.category,
      productName: this.state.productName,
      modelNumber: this.state.modelNumber,
      brandName: this.state.brandName,
      color: this.state.color,
      basePrice: this.state.basePrice,
      salePrice: this.state.salePrice,
      quantity: this.state.quantity,
      img: this.state.img,
      file: this.state.file,}} />
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
              <Paper elevation={24} style={{maxHeight:600, overflow:'auto', width:'inherit', padding: 20}}>
              <TextField
              label="Category"
              className={classes.textField}
              placeholder={this.state.category}
              onChange={this.handleChange('category')}
              fullWidth
            />
              <TextField
              label="Product Name"
              className={classes.textField}
              placeholder={this.state.productName}
              onChange={this.handleChange('productName')}
              fullWidth
            />
              <TextField
              label="Model Number"
              className={classes.textField}
              placeholder={this.state.modelNumber}
              onChange={this.handleChange('modelNumber')}
              fullWidth
            />
              <TextField
              label="Brand Name"
              className={classes.textField}
              placeholder={this.state.brandName}
              onChange={this.handleChange('brandName')}
              fullWidth
            />
              <TextField
              label="Color"
              className={classes.textField}
              placeholder={this.state.color}
              onChange={this.handleChange('color')}
              fullWidth
            />
              <TextField
              label="Base Price"
              className={classes.textField}
              placeholder={this.state.basePrice}
              onChange={this.handleChange('basePrice')}
              fullWidth
            />
              <TextField
              label="Sale Price"
              className={classes.textField}
              placeholder={this.state.salePrice}
              onChange={this.handleChange('salePrice')}
              fullWidth
            />
              <TextField
              label="Quantity"
              className={classes.textField}
              placeholder={this.state.quantity}
              onChange={this.handleChange('quantity')}
              fullWidth
            />
              <div style={{display:'flex'}}>
                  <Avatar src={img} style={styles.avatar}/>
                  <input
                  accept="image/*"
                  style={{display:'none'}}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={(e)=>this._handleImageChange(e)}
                  />
                  <label htmlFor="raised-button-file" style={styles.labelUpload}>
                  <Button raised component="span" style={styles.buttonUpload}>
                      Upload
                  </Button>
                  </label>
                  <Divider inset/>
                  </div>
                  <div style={{display:'flex',  justifyContent:'space-around'}}>
                  <ModalProducts addData={{category: this.state.category,
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
  }
  
  export default withStyles(styles)(TextFields);
  