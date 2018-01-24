import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/addAccount.png';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import Table from '../img/table2.JPG';
import TextField from 'material-ui/TextField';
import ModalAccount from './ModalAccount';
import Logout from '../inventory/Logout';
import Select from './MultipleSelect';

import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const styles = {
  left: {
    backgroundColor: 'rgba(0,0,0,0.4)',
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
    background: 'rgba(227, 98, 9, 0.8)',
},
root: {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'auto',
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
      username: 'Choose Username',
      password: 'Choose Password',
      role: [],
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
  
    handleChange = (username, password) => event => {
      this.setState({
        [username]: event.target.value,
        [password]: event.target.value,
      });
    };
    componentWillMount(){
        if(cookies.get('accessToken').accessToken === undefined) {
            window.location.href = '/';
        }
        if(window.location.href.split('?')[1] === undefined){
            window.location.href = '/Login';
        }
        let url = window.location.href.split('?')[1];
        this.setState({
            shop: url
        });
        console.log("here");
        request.get(`${server.path}/api/Roles?access_tokn=${cookies.get('accessToken').accessToken}`)
            .end((err, res) => {
            console.log(res);
                this.setState({
                    role: res.body
                });
            });
    }
  
    render() {
      const { classes } = this.props;
      return (
        <div style={styles.root}>
          <Grid container spacing={0} style={styles.container} justify='center'>
              <Grid item xs={12} lg={4} style={styles.left}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:'4rem', marginBottom:'4rem', }}>
                      <Hidden smDown>
                      <Typography type="display3" gutterBottom style={{color:'white', width:'60%', textAlign:'center'}}>
                      ADD ACCOUNT
                      </Typography>
                      <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can add account for your employees.</Typography>
                      <Link to='/ManageShop' style={styles.noUnderline}>
                      <Button raised style={styles.button}>
                      GO To Shop Management
                      </Button>
                      </Link>
                      <Logout />
                      </Hidden>
                      <Hidden smUp>
                      <Typography type="display1" gutterBottom style={{color:'white', width:'75%', textAlign:'center'}}>
                      ADD ACCOUNT
                      </Typography>
                      <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can see all the products of all/specific categories.</Typography>
                      <Link to='/ManageShop' style={styles.noUnderline}>
                      <Button raised style={styles.button}>
                      GO To Shop Management
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
                            label="Username"
                            className={classes.textField}
                            placeholder={this.state.username}
                            onChange={this.handleChange('username')}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Password"
                            className={classes.textField}
                            placeholder={this.state.password}
                            type="password"
                            onChange={this.handleChange('Password')}
                            fullWidth
                            margin="normal"
                        />
                        <Select role = {{role: this.state.role}}/>
                              <div style={{display:'flex',  justifyContent:'space-around'}}>
                              <ModalAccount addData={{username: this.state.username,
                                                      password: this.state.password,
                                                      role: this.state.role,
                                                      }}
                              />
                                  <Link to='/ManageShop' style={styles.noUnderline}>
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
                    label="Username"
                    className={classes.textField}
                    placeholder={this.state.username}
                    onChange={this.handleChange('username')}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Password"
                    className={classes.textField}
                    placeholder={this.state.password}
                    type="password"
                    onChange={this.handleChange('Password')}
                    fullWidth
                    margin="normal"
                />
                <Select role = {{role: this.state.role}}/>
                      <div style={{display:'flex',  justifyContent:'space-around'}}>
                      <ModalAccount addData={{username: this.state.username,
                                              password: this.state.password,
                                              role: this.state.role,
                                              }}
                      />
                          <Link to='/ManageShop' style={styles.noUnderline}>
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