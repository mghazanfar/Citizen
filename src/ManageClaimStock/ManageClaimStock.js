import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/claim.jpg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import Logout from '../inventory/Logout';
import ModalBills from '../inventory/ModalBills';
import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const styles = {
left: {
  backgroundColor: 'rgba(0,0,0,0.8)',
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
  background: 'rgba(255, 255, 255, 0)',
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
      shop: null,
      month: ' ',
      year: '2018',
      open: false,
      monthSelected: false,
    };

    componentWillMount(){
      if(cookies.get('accessToken') === undefined){
        window.location.href = '/'
      } else {
        if(window.location.href.split('shop=')[1] === undefined){
          window.location.href = '/Login'
        } else {
          let shop = window.location.href.split('shop=')[1].split('&');
          this.setState({
              shop: shop
          });
        }
      }
    }

    handleRequestClose = () => {
      this.setState ({
        open: false,
      });
    }
    
    handleRequestOpen = (year) => event => {
      this.setState ({
        open: true,
        [year]: event.target.value,
      });
    }
  
  
    handleChange = ( month, monthSelected ) => event => {
      this.setState({
        [month]: event.target.value,
        monthSelected: true,
      });
    };
  
    render() {
      return (
        <div style={styles.root}>
          <Grid container spacing={0} style={styles.container} justify='center'>
              <Grid item xs={12} lg={4} style={styles.left}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:'4rem', marginBottom:'4rem', }}>
                      <Hidden smDown>
                        <Typography type="display3" gutterBottom style={{color:'white', width:'60%', textAlign:'center'}}>
                        Manage Claims
                        </Typography>
                        <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here you can manage your claims.</Typography>
                        <Link to='/Shop' style={styles.noUnderline}>
                        <Button raised style={styles.button}>
                        back
                        </Button>
                        </Link>
                        <Logout />
                        </Hidden>
                        <Hidden smUp>
                        <Typography type="display1" gutterBottom style={{color:'white', width:'75%', textAlign:'center'}}>
                        Manage Claims
                        </Typography>
                        <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here you can manage your claims.</Typography>
                        <Link to='/Shop' style={styles.noUnderline}>
                        <Button raised style={styles.button}>
                        back
                        </Button>
                        </Link>
                        <Logout />
                      </Hidden>
                  </div>
                  </Grid>
            <Hidden lgDown>
              <Grid item xs={12} lg={8} style={styles.right}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
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
                      <ModalBills stock={true} />
                      <ModalBills />
                      <TextField
                      id="search"
                      label="Claim price"
                      type="search"
                      margin="normal"
                      style={{width:'100%'}}
                      />
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
                  </Paper>
                  </div>
              </Grid>
              </Hidden>
            
      
              <Hidden lgUp>
                <Grid item xs={12} lg={8} style={styles.right}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
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
                  label="Claim price"
                  type="search"
                  margin="normal"
                  style={{width:'100%'}}
                  />
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
  