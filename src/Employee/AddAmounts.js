import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/AddMoney.png';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import ModalAmounts from './ModalAmounts';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Logout from '../inventory/Logout';
import { DatePicker } from 'material-ui-pickers';

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
  background: 'rgba(255, 255, 255, 0.9)',
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
        drinks: ' ',
        shopExpenses: ' ',
        expenses: [{ name: '' }],
    };

    handleShareholderNameChange = (idx) => (evt) => {
      const newExpenses = this.state.expenses.map((expense, sidx) => {
        if (idx !== sidx) return expense;
        return { ...expense, name: evt.target.value };
      });
  
      this.setState({ expenses: newExpenses });
    }
  
    handleAddShareholder = () => {
      this.setState({
        expenses: this.state.expenses.concat([{ name: '' }])
      });
    }
  
    handleRemoveShareholder = (idx) => () => {
      this.setState({
        expenses: this.state.expenses.filter((s, sidx) => idx !== sidx)
      });
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
  
    handleChange = ( drinks, shopExpenses) => event => {
      this.setState({
        [drinks]: event.target.value,
        [shopExpenses]: event.target.value,
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
                        Add Amounts
                      </Typography>
                      <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can add daily shop expenses.</Typography>
                      <Link to='/Shop' style={styles.noUnderline}>
                      <Button raised style={styles.button}>
                      back
                      </Button>
                      </Link>
                      <Logout />
                      </Hidden>
                      <Hidden smUp>
                      <Typography type="display1" gutterBottom style={{color:'white', width:'75%', textAlign:'center'}}>
                      Add Amounts
                      </Typography>
                      <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can add daily shop expenses.</Typography>
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
                      <Paper elevation={24} style={{maxHeight:600, overflow:'auto', width:'inherit', padding: 20}}>
                        <div style={{display:'flex', justifyContent:'space-around'}}>
                        <DatePicker />  
                        </div>    
                        <FormControl fullWidth style={{marginTop:14}}>
                            <InputLabel htmlFor="amount">Drinks for customers</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.drinks}
                                onChange={this.handleChange('drinks')}
                                startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                                type="number"
                            />
                        </FormControl>    
                        <FormControl fullWidth style={{marginTop:14}}>
                            <InputLabel htmlFor="amount">Shop Expenses</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.shopExpenses}
                                onChange={this.handleChange('shopExpenses')}
                                startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                                type="number"
                            />
                        </FormControl>
                        {this.state.expenses.map((expense, idx) => (
                        <div style={{display:"flex"}}> 
                          <FormControl fullWidth style={{marginTop:14}} key={idx}>
                              <InputLabel htmlFor="amount">Others</InputLabel>
                              <Input
                                  id="adornment-amount"
                                  value={expense.name}
                                  onChange={this.handleShareholderNameChange(idx)}
                                  startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                                  type="number"
                              />
                          </FormControl>
                          <Button type="button" onClick={this.handleRemoveShareholder(idx)} style={{ color:'white', backgroundColor:'black', marginTop:12}} dense>-</Button>
                          </div>
                      ))}
                        <Button raised style={{ color:'white', backgroundColor:'black', fontSize:'1.5rem', marginTop:12}} fab mini onClick={this.handleAddShareholder}>
                            +
                        </Button>
                              <div style={{display:'flex',  justifyContent:'space-around'}}>
                              <ModalAmounts addData={{
                                  drinks: this.state.drinks,
                                  shopExpenses: this.state.shopExpenses,
                                  expenses: this.state.expenses}} />
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
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
              <Paper elevation={24} style={{maxHeight:600, overflow:'auto', width:'inherit', padding: 20}}>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                <DatePicker />  
                </div>    
                <FormControl fullWidth style={{marginTop:14}}>
                    <InputLabel htmlFor="amount">Drinks for customers</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={this.state.drinks}
                        onChange={this.handleChange('drinks')}
                        startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                        type="number"
                    />
                </FormControl>    
                <FormControl fullWidth style={{marginTop:14}}>
                    <InputLabel htmlFor="amount">Shop Expenses</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={this.state.shopExpenses}
                        onChange={this.handleChange('shopExpenses')}
                        startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                        type="number"
                    />
                </FormControl>
                {this.state.expenses.map((expense, idx) => (
                <div style={{display:"flex"}}> 
                  <FormControl fullWidth style={{marginTop:14}} key={idx}>
                      <InputLabel htmlFor="amount">Others</InputLabel>
                      <Input
                          id="adornment-amount"
                          value={expense.name}
                          onChange={this.handleShareholderNameChange(idx)}
                          startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                          type="number"
                      />
                  </FormControl>
                  <Button type="button" onClick={this.handleRemoveShareholder(idx)} style={{ color:'white', backgroundColor:'black', marginTop:12}} dense>-</Button>
                  </div>
              ))}
                <Button raised style={{ color:'white', backgroundColor:'black', fontSize:'1.5rem', marginTop:12}} fab mini onClick={this.handleAddShareholder}>
                    +
                </Button>
                      <div style={{display:'flex',  justifyContent:'space-around'}}>
                      <ModalAmounts addData={{
                        drinks: this.state.drinks,
                        shopExpenses: this.state.shopExpenses,
                        expenses: this.state.expenses}} />
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
  