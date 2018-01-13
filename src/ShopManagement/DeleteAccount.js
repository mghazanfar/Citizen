import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/delete.svg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Logout from '../inventory/Logout';

import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
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

class FullWidthGrid extends React.Component <props, {}>{

  state = {
    users: []
  }

  componentWillMount(){
    if(cookies.get('accessToken').accessToken === undefined){
      window.location.href = '/';
    }
    request.get(`${server.path}/api/Accounts?access_token=${cookies.get('accessToken').accessToken}`)
        .end((err, res) => {
          if(res.status === 200){
            this.setState({
                users: res.body
            });
          } else {
              alert(res.body.error.message);
          }
        });
  }

  delete(id, username){

    if(username === 'superadmin') {
      alert('Authorization Required');
    } else {
        request.delete(`${server.path}/api/Accounts/${id}?access_token=${cookies.get('accessToken').accessToken}`)
            .end((err, res) => {
                if(res.statusCode === 200) {
                    window.location.href = '/DeleteAccount'
                } else {
                    alert(res.body.error.message);
                }
            });
    }

  }

  render() {
      return (
          <div style={styles.root}>
            <Grid container spacing={0} style={styles.container}>
              <Hidden lgDown>
                <Grid item xs={12} lg={8} style={styles.right}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '95%'}}>
                    <Paper elevation={24} style={{maxHeight: 400, overflow: 'auto', width: 'inherit'}}>
                      <List>
                          {this.state.users.map(value => (
                              <ListItem key={value.username} button style={styles.listItem} divider>
                                <ListItemText primary={<Typography type="title" gutterBottom style={{color: 'black'}}>{value.username}</Typography>}/>
                                <ListItemSecondaryAction/>
                                <Button color="accent" onClick={this.delete.bind(null, value.id)}>
                                  DELETE
                                </Button>
                              </ListItem>
                          ))}
                      </List>
                    </Paper>
                  </div>
                </Grid>
              </Hidden>

              <Grid item xs={12} lg={4} style={styles.left}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '4rem',
                    marginBottom: '4rem',
                }}>
                  <Typography type="display3" gutterBottom style={{color: 'white', textAlign: 'center'}}>
                    DELETE ACCOUNT
                  </Typography>
                  <Typography type="headline" paragraph style={{color: 'white', textAlign: 'center', width: '60%',}}>Here,
                    you can delete a user.</Typography>
                  <Link to='/ManageShop' style={styles.noUnderline}>
                    <Button raised style={styles.button}>
                      GO TO SHOP MANAGEMENT
                    </Button>
                  </Link>
                  <Logout/>
                </div>
              </Grid>

              <Hidden lgUp>
                <Grid item xs={12} lg={8} style={styles.right}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '95%'}}>
                    <Paper elevation={24} style={{maxHeight: 400, overflow: 'auto', width: 'inherit'}}>
                      <List>
                          {this.state.users.map(value => (
                              <ListItem key={value.username} button style={styles.listItem} divider>
                                <ListItemText primary={<Typography type="title" gutterBottom style={{color: 'black'}}>{value.username}</Typography>}/>
                                <ListItemSecondaryAction/>
                                <Button color="accent" onClick={this.delete.bind(null, value.id, value.username)}>
                                  DELETE
                                </Button>
                              </ListItem>
                          ))}
                      </List>
                    </Paper>
                  </div>
                </Grid>
              </Hidden>
            </Grid>
          </div>
      );
  }
}

export default withStyles(styles)(FullWidthGrid);