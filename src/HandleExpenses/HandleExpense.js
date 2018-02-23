import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/expenses.png';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import ModalExpenses from './ModalExpenses';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Logout from '../inventory/Logout';
import { CircularProgress } from 'material-ui/Progress';

import request from "../../node_modules/superagent/superagent";
import server from "../constants";
import Cookies from 'universal-cookie';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'];

var cookies = new Cookies();

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
      type: 'monthly',
      month: 0,
      year: '2018',
      salary: 0,
      kameti: 0,
      household: 0,
      expenses: [{ name: 0 }],
      shop: null,
      buttonText: 'ADD EXPENSE',
      disabled: false
    };

    componentWillMount(){

        if(cookies.get('accessToken') === undefined) {
            window.location.href = '/';
        } else {
            let url = window.location.href.split('shop=')[1].split('&')[0];
            if(url === undefined){
                window.location.href = '/Login';
            }
            this.setState({
                shop: url
            });
        }
    }

    handleShareholderNameChange = (idx) => (evt) => {
      const newExpenses = this.state.expenses.map((expense, sidx) => {
        if (idx !== sidx) return expense;
        return { ...expense, name: evt.target.value };
      });
  
      this.setState({ expenses: newExpenses });
    };
  
    handleAddShareholder = () => {
      this.setState({
        expenses: this.state.expenses.concat([{ name: '' }])
      });
    };
  
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
      };
      reader.readAsDataURL(file)
    }
  
    handleChange = (salary, kameti, household, month, year, label) => event => {
      this.setState({
        [salary]: event.target.value,
        [kameti]: event.target.value,
        [household]: event.target.value,
        [month]: months.indexOf(event.target.value)+1,
        [year]: event.target.value,
        [label]: event.target.value,
      });
    };

    saveExpense(){
        let data = {
            "shopId": window.location.href.split('shop=')[1].split('&')[0],
            "type": this.state.type,
            "salaries": this.state.salary,
            "committee": this.state.kameti,
            "extra": this.state.expenses[0].name,
            "housholds": this.state.household,
            "month": months.indexOf(this.state.month)+1,
            "year": this.state.year,
        };
        console.log(data);
        let accessToken = cookies.get('accessToken').accessToken;
        if(data.salaries === ' '){
            alert('Please enter salaries');
        } else if(this.state.month === ' '){
            alert('Please enter correct date');
        } else if(data.committee === ' ' || data.housholds === ' '){
            alert('Please enter missing data');
        } else {
            this.setState({
                disabled: true,
                buttonText: <CircularProgress/>
            });
            request.post(`${server.path}/api/Expenses?access_token=${accessToken}`)
                .send(data)
                .end((err, res) => {
                    this.setState({
                        disabled: true,
                        buttonText: 'ADD EXPENSE'
                    });
                    if(!res){
                        alert('Service Unreachable');
                    } else{
                        if(res.statusCode === 200){
                            console.log(res);
                            alert('Expense saved');
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
                      Handle Expenses
                      </Typography>
                      <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can handle your expenses.</Typography>
                      <Link to={`/Shop?shop=${window.location.href.split('shop=')[1]}`} style={styles.noUnderline}>
                      <Button raised style={styles.button}>
                      back
                      </Button>
                      </Link>
                      <Logout />
                      </Hidden>
                      <Hidden smUp>
                      <Typography type="display1" gutterBottom style={{color:'white', width:'75%', textAlign:'center'}}>
                      Handle Expenses
                      </Typography>
                      <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here, you can see all the products of all/specific categories.</Typography>
                      <Link to={`/Shop?shop=${window.location.href.split('shop=')[1]}`} style={styles.noUnderline}>
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
                          <div style={{width:'30%'}}>
                        <FormControl className={classes.formControl} fullWidth>
                          <InputLabel htmlFor="age-simple">Month</InputLabel>
                          <Select
                            value={this.state.month}
                            onChange={this.handleChange('month')}
                            input={<Input name="age" id="age-simple" />}
                            autoWidth
                          >
                          {months.map(month => (
                            <MenuItem value={month}>{month}</MenuItem>
                    ))}
                          </Select>
                          <FormHelperText>Please select the month</FormHelperText>
                        </FormControl>
                        </div>
                        <div style={{width:'30%'}}>
                        <FormControl className={classes.formControl} fullWidth>
                          <InputLabel htmlFor="age-simple">Year</InputLabel>
                          <Select
                            value={this.state.year}
                            onChange={this.handleChange('year')}
                            input={<Input name="age" id="age-simple" />}
                            autoWidth
                            placeholder={this.state.year}
                          >
                          {years.map(year => (
                            <MenuItem value={year}>{year}</MenuItem>
                    ))}
                          </Select>
                          <FormHelperText>Please select the year</FormHelperText>
                        </FormControl>
                        </div>  
                        </div>    
                        <FormControl fullWidth style={{marginTop:14}}>
                            <InputLabel htmlFor="amount">Salaries</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.salary}
                                onChange={this.handleChange('salary')}
                                startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                                type="number"
                            />
                        </FormControl>      
                        <FormControl fullWidth style={{marginTop:14}}>
                            <InputLabel htmlFor="amount">Kameti</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.kameti}
                                onChange={this.handleChange('kameti')}
                                startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                                type="number"
                            />
                        </FormControl>      
                        <FormControl fullWidth style={{marginTop:14}}>
                            <InputLabel htmlFor="amount">Households</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.household}
                                onChange={this.handleChange('household')}
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
                          {/*<Button type="button" onClick={this.handleRemoveShareholder(idx)} style={{ color:'white', backgroundColor:'black', marginTop:12}} dense>-</Button>*/}
                          </div>
                      ))}
                        {/*<Button raised style={{ color:'white', backgroundColor:'black', fontSize:'1.5rem', marginTop:12}} fab mini onClick={this.handleAddShareholder}>
                            +
                        </Button>*/}
                              <div style={{display:'flex',  justifyContent:'space-around'}}>
                                  <Button disabled={this.state.disabled} onClick={this.saveExpense.bind(this)} raised style={styles.button}>
                                      {this.state.buttonText}
                                  </Button>
                                  <Link to={`/Shop?shop=${window.location.href.split('shop=')[1]}`} style={styles.noUnderline}>
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
                  <div style={{width:'30%'}}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="age-simple">Month</InputLabel>
                  <Select
                    value={this.state.month}
                    onChange={this.handleChange('month')}
                    input={<Input name="age" id="age-simple" />}
                    autoWidth
                  >
                  {months.map(month => (
                    <MenuItem value={month}>{month}</MenuItem>
            ))}
                  </Select>
                  <FormHelperText>Please select the month</FormHelperText>
                </FormControl>
                </div>
                <div style={{width:'30%'}}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="age-simple">Year</InputLabel>
                  <Select
                    value={this.state.year}
                    onChange={this.handleChange('year')}
                    input={<Input name="age" id="age-simple" />}
                    autoWidth
                    placeholder={this.state.year}
                  >
                  {years.map(year => (
                    <MenuItem value={year}>{year}</MenuItem>
            ))}
                  </Select>
                  <FormHelperText>Please select the year</FormHelperText>
                </FormControl>
                </div>  
                </div>    
                <FormControl fullWidth style={{marginTop:14}}>
                    <InputLabel htmlFor="amount">Salaries</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={this.state.salary}
                        onChange={this.handleChange('salary')}
                        startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                        type="number"
                    />
                </FormControl>      
                <FormControl fullWidth style={{marginTop:14}}>
                    <InputLabel htmlFor="amount">Kameti</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={this.state.kameti}
                        onChange={this.handleChange('kameti')}
                        startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                        type="number"
                    />
                </FormControl>      
                <FormControl fullWidth style={{marginTop:14}}>
                    <InputLabel htmlFor="amount">Households</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={this.state.household}
                        onChange={this.handleChange('household')}
                        startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                        type="number"
                    />
                </FormControl>
                <TextField
                  id="label"
                  placeholder={this.state.label}
                  className={classes.textField}
                  onChange={this.handleChange('label')}
                  margin="normal"
                />
                <Button raised style={{ color:'white', backgroundColor:'black', fontSize:'1.5rem', marginTop:12}} fab mini onClick={this.onAddChild}>
                    +
                </Button>
                      <div style={{display:'flex',  justifyContent:'space-around'}}>
                          <Button onClick={this.saveExpense.bind(this)} raised style={styles.button}>

                          </Button>
                          <Link to={`/Shop?shop=${this.state.shop}`} style={styles.noUnderline}>
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
  