import React, {  } from 'react';
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
import Logout from './Logout';

import Cookies from 'universal-cookie';
import server from "../constants";
import request from "superagent/superagent";
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


class FullWidthGrid extends React.Component<props, {}> {
    state = {
        shop: null,
        categories: [],
        id: null,
    }
    componentWillMount= () => {
        if(cookies.get('accessToken').accessToken === undefined) {
            window.location.href = '/';
        }
        if(window.location.href.split('?')[1] === undefined){
            window.location.href = '/Login';
        }
        let url = window.location.href.split('?')[1];
        this.setState({
            shop: url.split('=')[1]
        });
        request.get(server.path + '/api/Categories?filter=%7B%22shopId%22%3A%22'+url.split('=')[1]+'%22%7D&access_token=' + cookies.get('accessToken').accessToken).
        end((err, category) => {
                if(category) {
                    if (category.body.length > 0) {
                        this.setState({
                            categories: category.body
                        });
                    } else {
                        alert('No Categrories Found');
                    }
                }else {
                    alert('Service Unreachable');
                }
            }
        );
    }

    delete = function(e) {
        var r = window.confirm("Are you sure you want to delete?");
        if (r === true) {
            request.delete(`${server.path}/api/Categories/${e}?access_token=${cookies.get('accessToken').accessToken}`)
                .end((err, res) => {
                    if (res.status !==200) {
                        alert(res.status);
                    }
                    window.location.href = '/Categories?shop='+this.state.shop;
                });
        }
    };
  render() {

  return (
  <div style={styles.root}>
    <Grid container spacing={0} style={styles.container}>
      <Hidden lgDown>
        <Grid item xs={12} lg={8} style={styles.right}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
          <Paper elevation={24} style={{maxHeight:400, overflow:'auto', width:'inherit'}}>
          <List>
            {this.state.categories.map(value => (
                <Link to={`/Products?shop=${this.state.shop}&cat=${value.id}`} style={styles.noUnderline}>
                <ListItem key={value.name} dense button style={styles.listItem} divider>
                <Avatar src={value.image} style={styles.avatar}/>
                <ListItemText primary={<Typography type="title" gutterBottom style={{color:'black'}}>{value.name}</Typography>} secondary={value.description}/>
                <ListItemSecondaryAction />
                <Link to={`/ModifyCategory?shop=${this.state.shop}&id=${value.id}`} style={styles.noUnderline}>
                  <Button color="primary">
                    MODIFY
                  </Button>
                </Link>
                <Button color="accent" id={value.id} onClick={this.delete.bind(this, value.id)}>
                  DELETE
                </Button>
              </ListItem>
                </Link>
            ))}
          </List>
          </Paper>
         <Link to={`/AddCategory?shop=${this.state.shop}`} style={styles.noUnderline}>
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
            <Link to={`/Inventory?shop=${this.state.shop}`} style={styles.noUnderline}>
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
              {this.state.categories.map(value => (
                  <Link to={`/Products?shop=${this.state.shop}&cat=${value.id}`}style={styles.noUnderline}>
                <ListItem key={value} dense button style={styles.listItem} divider>
                  <Avatar src={value.image} style={styles.avatar}/>
                  <ListItemText primary={<Typography type="title" gutterBottom style={{color:'black'}}>{value.name}</Typography>} secondary={value.description}/>
                  <ListItemSecondaryAction />
                  <Link to={`/ModifyCategory?shop=${this.state.shop}&id=${value.id}`} style={styles.noUnderline}>
                    <Button color="primary">
                      MODIFY
                    </Button>
                  </Link>
                  <Button color="accent" id={value.id} onClick={this.delete.bind(null, value.id)}>
                    DELETE
                  </Button>
                </ListItem>
                  </Link>
              ))}
            </List>
            </Paper>
          <Link to={`/AddCategory?shop=${this.state.shop}`} style={styles.noUnderline}>
          <Button raised style={styles.button}>
            ADD CATEGORY
            </Button>
            </Link>
          </div>
        </Grid>e
        </Hidden>
      </Grid>
    </div>
  );
  }
}

export default withStyles(styles)(FullWidthGrid);