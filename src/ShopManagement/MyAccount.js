import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/profile.jpg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import ModalAccount from './ModalAccount';
import Logout from '../inventory/Logout';

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
    background: 'rgba(227, 98, 9, 0.7)',
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
buttonUsername: {
  color:'white',
  backgroundColor:'black',
  width:'100%',
  marginTop:'1rem',
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
      username: 'Choose Username',
      password: 'Choose password',
      prevPassword: 'Previous password',
      shop: null,
      user: cookies.get('username').username,
    };

    componentWillMount(){
        if(cookies.get('accessToken')){

        } else {
            window.location.href = '/';
        }
        let shop = window.location.href.split('?shop=');
        if(shop === undefined){
            window.location.href = '/Login';
        }else {
            this.setState({
                shop: shop,
                user: cookies.get('username').username
            });
        }
    }
  
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
        console.log(event);
      this.setState({
        [username]: event.target.value,
        [password]: event.target.value,
      });
    };

    changeUsername(){
        if(this.state.username === 'Choose Username'){
            alert('Please enter the user name');
        } else if (this.state.password === 'Choose password'){
            alert('Please enter the password');
        } else {
            let userId = cookies.get('userId').userId;
            let accessToken =cookies.get('accessToken').accessToken;
            request.post(`${server.path}/api/Accounts/change-password?access_token=${accessToken}`)
                .send({oldPassword: this.state.password, newPassword: this.state.password})
                .end((err, res) => {
                    if(!res){
                        alert('Service Unreachable');
                    } else {
                        if(res.statusCode === 204){
                            request.patch(`${server.path}/api/Accounts/${userId}?access_token=${accessToken}`).
                            send({username: this.state.username}).
                            end((err, res) => {
                                if(!res){
                                    alert('Serverice Unreachable');
                                } else if(res.statusCode === 200){
                                    alert('Username Changed');
                                } else {
                                    alert(res.body.error.message);
                                }
                            });
                        } else {
                            alert(res.body.error.message);
                        }
                    }
                });
        }
    }

    changePassword(){
        if(this.state.password === 'Choose password'){
            alert('Please enter new password');
        } else if (this.state.prevPassword === 'Previous password'){
            alert('Please enter your current password');
        } else {
            let accessToken =cookies.get('accessToken').accessToken;
            request.post(`${server.path}/api/Accounts/change-password?access_token=${accessToken}`)
                .send({oldPassword: this.state.password, newPassword: this.state.password})
                .end((err, res) => {
                    if(!res){
                        alert('Service Unreachable');
                    } else {
                        if(res.statusCode === 204){
                            alert('Password Changed');
                        } else {
                            alert(res.body.error.message);
                        }
                    }
                });
        }
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
                        MY PROFILE
                        </Typography>
                        <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can change your username and password.</Typography>
                        <Link to={`/ManageShop?shop=${this.state.shop}`} style={styles.noUnderline}>
                        <Button raised style={styles.button}>
                        GO To Shop Management
                        </Button>
                        </Link>
                        <Logout />
                        </Hidden>
                        <Hidden smUp>
                        <Typography type="display1" gutterBottom style={{color:'white', width:'75%', textAlign:'center'}}>
                        MY PROFILE
                        </Typography>
                        <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can see all the products of all/specific categories.</Typography>
                        <Link to={`/ManageShop?shop=${this.state.shop}`} style={styles.noUnderline}>
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
                            label={this.state.user}
                            className={classes.textField}
                            onChange={this.handleChange('username')}
                            fullWidth
                            disabled
                            margin="normal"
                          />
                          <div style={{display:'flex', justifyContent:'space-evenly'}}>
                            <TextField
                              label="Change Username"
                              className={classes.textField}
                              onChange={this.handleChange('username')}
                              margin="normal"
                            />
                            <TextField
                              label="Current Password"
                              className={classes.textField}
                              type="password"
                              onChange={this.handleChange('password')}
                              required
                              margin="normal"
                          />
                          </div>
                            <Button raised style={styles.buttonUsername} onClick={this.changeUsername.bind(this)} >
                                change username
                            </Button>
                          <div style={{display:'flex', justifyContent:'space-evenly'}}>
                          <TextField
                            label="Change Password"
                            className={classes.textField}
                            type="password"
                            onChange={this.handleChange('password')}
                            
                            margin="normal"
                          />
                          <TextField
                            label="Previous Password"
                            className={classes.textField}
                            type="password"
                            onChange={this.handleChange('prevPassword')}
                            
                            required
                            margin="normal"
                        />
                        </div>
                        <ModalAccount profile addData={{username: this.state.username,
                                                password: this.state.password,
                                                }}
                        />
                        <div style={{display:'flex',  justifyContent:'space-around'}}>
                            <Link to={`/ManageShop?shop=${this.state.shop}`} style={styles.noUnderline}>
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
                    label={this.state.user}
                    className={classes.textField}
                    placeholder={this.state.username}
                    onChange={this.handleChange('username')}
                    fullWidth
                    disabled
                    margin="normal"
                  />
                  <TextField
                    label="Change Username"
                    className={classes.textField}
                    placeholder={this.state.username}
                    onChange={this.handleChange('username')}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Change Password"
                    className={classes.textField}
                    placeholder={this.state.password}
                    type="password"
                    onChange={this.handleChange('Password')}
                    fullWidth
                    margin="normal"
                />
                  <TextField
                    label="Previous Password"
                    className={classes.textField}
                    placeholder={this.state.password}
                    type="password"
                    onChange={this.handleChange('Password')}
                    fullWidth
                    required
                    margin="normal"
                />
                <div style={{display:'flex',  justifyContent:'space-around'}}>
                <ModalAccount profile addData={{username: this.state.username,
                                        password: this.state.password,
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