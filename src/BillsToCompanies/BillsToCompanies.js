import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/manageBills.svg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import Logout from '../inventory/Logout';

const data = [
    {
        company:'Citizen',
        amount: 120,
},
    {
        company:'Citizen',
        amount: 120,
},
    {
        company:'Citizen',
        amount: 120,
},
    {
        company:'Citizen',
        amount: 120,
},
    {
        company:'Citizen',
        amount: 120,
}
];

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
  background: 'rgba(0, 0, 0, 0.6)',
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
      month: ' ',
      year: '2018',
      open: false,
      monthSelected: false,
    };

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
                        Companies' Bills
                        </Typography>
                        <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here you can see bills, you have to pay.</Typography>
                        <Link to='/Shop' style={styles.noUnderline}>
                        <Button raised style={styles.button}>
                        back
                        </Button>
                        </Link>
                        <Logout />
                        </Hidden>
                        <Hidden smUp>
                        <Typography type="display1" gutterBottom style={{color:'white', width:'75%', textAlign:'center'}}>
                        Companies' Bills
                        </Typography>
                        <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here you can see bills, you have to pay.</Typography>
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
                  <div style={{width:'95%', display:'flex', flexWrap:'wrap', maxHeight:800, overflowY:'auto', justifyContent:'center'}}>
                    {data.map(details => (
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:10, marginLeft:10, width: 'auto' }}>
                            <Paper elevation={24} style={{maxHeight:700, overflow:'auto', width:'inherit', padding:20, height:'inherit'}}>
                            <TextField
                            id="search"
                            label={details.company}
                            type="search"
                            margin="normal"
                            style={{width:'100%'}}
                            disabled
                            />
                            <TextField
                            id="search"
                            label={details.amount}
                            type="search"
                            margin="normal"
                            style={{width:'100%'}}
                            disabled
                            />
                        </Paper>
                        </div> 
                    ))}
              </div>
              </Grid>
              </Hidden>
            
      
              <Hidden lgUp>
                <Grid item xs={12} lg={8} style={styles.right}>
                <div style={{width:'95%', display:'flex', flexWrap:'wrap', maxHeight:800, overflowY:'auto', justifyContent:'center'}}>
                  {data.map(details => (
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:10, marginLeft:10, width: 'auto' }}>
                          <Paper elevation={24} style={{maxHeight:700, overflow:'auto', width:'inherit', padding:20, height:'inherit'}}>
                          <TextField
                          id="search"
                          label={details.company}
                          type="search"
                          margin="normal"
                          style={{width:'100%'}}
                          disabled
                          />
                          <TextField
                          id="search"
                          label={details.amount}
                          type="search"
                          margin="normal"
                          style={{width:'100%'}}
                          disabled
                          />
                      </Paper>
                      </div> 
                  ))}
            </div>
            </Grid>
              </Hidden>
            </Grid>
          </div>
        );
    }
  }
  
  export default withStyles(styles)(TextFields);
  