import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/profit.jpg';
import Grid from 'material-ui/Grid';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Logout from '../inventory/Logout';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'];

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
      const { classes, fullScreen } = this.props;
      return (
        <div style={styles.root}>
          <Grid container spacing={0} style={styles.container} justify='center'>
              <Grid item xs={12} lg={4} style={styles.left}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:'4rem', marginBottom:'4rem', }}>
                      <Hidden smDown>
                        <Typography type="display3" gutterBottom style={{color:'white', width:'60%', textAlign:'center'}}>
                        Profit Reports
                        </Typography>
                        <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here you can view your daily, monthly and yearly profit reports.</Typography>
                        <Link to='/Shop' style={styles.noUnderline}>
                        <Button raised style={styles.button}>
                        back
                        </Button>
                        </Link>
                        <Logout />
                        </Hidden>
                        <Hidden smUp>
                        <Typography type="display1" gutterBottom style={{color:'white', width:'75%', textAlign:'center'}}>
                        Profit Reports
                        </Typography>
                        <Typography type="headline" paragraph style={{color:'white', textAlign:'center', width:'60%',}}>Here you can view your daily, monthly and yearly profit reports.</Typography>
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
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                          <div style={{width:'30%'}}>
                            <TextField
                              id="date"
                              label="Date"
                              type="date"
                              defaultValue="2018-05-24"
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              fullWidth
                            />
                          <FormHelperText>Please select the date</FormHelperText>
                          </div>
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
                            onChange={this.handleRequestOpen('year')}
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
                            <InputLabel htmlFor="amount">Amount Recieved Today</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.salary}
                                onChange={this.handleChange('salary')}
                                startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                                type="number"
                                disabled
                            />
                        </FormControl>      
                        <FormControl fullWidth style={{marginTop:14}}>
                            <InputLabel htmlFor="amount">Base Prices</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.kameti}
                                onChange={this.handleChange('kameti')}
                                startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                                type="number"
                                disabled
                            />
                        </FormControl>      
                        <FormControl fullWidth style={{marginTop:14}}>
                            <InputLabel htmlFor="amount">Shop Expenses</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.household}
                                onChange={this.handleChange('household')}
                                startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                                type="number"
                                disabled
                            />
                        </FormControl>      
                        <FormControl fullWidth style={{marginTop:14}}>
                            <InputLabel htmlFor="amount">Total Profit Today</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.household}
                                onChange={this.handleChange('household')}
                                startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                                type="number"
                                disabled
                            />
                        </FormControl>      
                        <FormControl fullWidth style={{marginTop:14}}>
                            <InputLabel htmlFor="amount">Total Profit Current Month</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.household}
                                onChange={this.handleChange('household')}
                                startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                                type="number"
                                disabled
                            />
                        </FormControl>      
                        <FormControl fullWidth style={{marginTop:14}}>
                            <InputLabel htmlFor="amount">Total Profit Current Year</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.household}
                                onChange={this.handleChange('household')}
                                startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                                type="number"
                                disabled
                            />
                        </FormControl>
                        <Dialog
                          fullScreen={fullScreen}
                          open={this.state.open}
                          onRequestClose={this.handleRequestClose}
                        >
                        <div style={{backgroundColor:'#424242'}}>
                          <DialogTitle><span style={{color:'white'}}>Profit Report for {this.state.year} </span></DialogTitle>
                          <div style={{width:'100%'}}>
                          {months.map(month => (
                          <DialogContent>
                            <DialogContentText style={{color:'white'}}>
                            {month}'s Profit: Rs. Profit
                            </DialogContentText>
                          </DialogContent>
                          ))}
                          <DialogActions>
                              <Button onClick={this.handleRequestClose} color="primary">
                                  OK
                              </Button>
                          </DialogActions>
                        </div>
                        </div>
                        </Dialog>
                         {/*The display property will turn into block when a month or year is selected to show
                            the profit of the selected month or year  */}
                        <FormControl fullWidth style={{marginTop:14, display:this.state.monthSelected===true? 'block': 'none'}}>
                            <InputLabel htmlFor="amount">Total Profit {this.state.month}</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.household}
                                onChange={this.handleChange('household')}
                                startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                                type="number"
                                disabled
                            />
                        </FormControl>
                      </Paper>
                  </div>
              </Grid>
              </Hidden>
            
      
              <Hidden lgUp>
                <Grid item xs={12} lg={8} style={styles.right}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
                    
                  <Paper elevation={24} style={{maxHeight:600, overflow:'auto', width:'inherit', padding: 20}}>
                  <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div style={{width:'30%'}}>
                      <TextField
                        id="date"
                        label="Date"
                        type="date"
                        defaultValue="2018-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    <FormHelperText>Please select the date</FormHelperText>
                    </div>
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
                      onChange={this.handleRequestOpen('year')}
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
                      <InputLabel htmlFor="amount">Amount Recieved Today</InputLabel>
                      <Input
                          id="adornment-amount"
                          value={this.state.salary}
                          onChange={this.handleChange('salary')}
                          startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                          type="number"
                          disabled
                      />
                  </FormControl>      
                  <FormControl fullWidth style={{marginTop:14}}>
                      <InputLabel htmlFor="amount">Base Prices</InputLabel>
                      <Input
                          id="adornment-amount"
                          value={this.state.kameti}
                          onChange={this.handleChange('kameti')}
                          startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                          type="number"
                          disabled
                      />
                  </FormControl>      
                  <FormControl fullWidth style={{marginTop:14}}>
                      <InputLabel htmlFor="amount">Shop Expenses</InputLabel>
                      <Input
                          id="adornment-amount"
                          value={this.state.household}
                          onChange={this.handleChange('household')}
                          startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                          type="number"
                          disabled
                      />
                  </FormControl>      
                  <FormControl fullWidth style={{marginTop:14}}>
                      <InputLabel htmlFor="amount">Total Profit Today</InputLabel>
                      <Input
                          id="adornment-amount"
                          value={this.state.household}
                          onChange={this.handleChange('household')}
                          startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                          type="number"
                          disabled
                      />
                  </FormControl>      
                  <FormControl fullWidth style={{marginTop:14}}>
                      <InputLabel htmlFor="amount">Total Profit Current Month</InputLabel>
                      <Input
                          id="adornment-amount"
                          value={this.state.household}
                          onChange={this.handleChange('household')}
                          startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                          type="number"
                          disabled
                      />
                  </FormControl>      
                  <FormControl fullWidth style={{marginTop:14}}>
                      <InputLabel htmlFor="amount">Total Profit Current Year</InputLabel>
                      <Input
                          id="adornment-amount"
                          value={this.state.household}
                          onChange={this.handleChange('household')}
                          startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                          type="number"
                          disabled
                      />
                  </FormControl>
                  <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                  >
                  <div style={{backgroundColor:'#424242'}}>
                    <DialogTitle><span style={{color:'white'}}>Profit Report for {this.state.year} </span></DialogTitle>
                    <div style={{width:'100%'}}>
                    {months.map(month => (
                    <DialogContent>
                      <DialogContentText style={{color:'white'}}>
                      {month}'s Profit: Rs. Profit
                      </DialogContentText>
                    </DialogContent>
                    ))}
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                  </div>
                  </div>
                  </Dialog>
                   {/*The display property will turn into block when a month or year is selected to show
                      the profit of the selected month or year  */}
                  <FormControl fullWidth style={{marginTop:14, display:this.state.monthSelected===true? 'block': 'none'}}>
                      <InputLabel htmlFor="amount">Total Profit {this.state.month}</InputLabel>
                      <Input
                          id="adornment-amount"
                          value={this.state.household}
                          onChange={this.handleChange('household')}
                          startAdornment={<InputAdornment position="start">Rs. </InputAdornment>}
                          type="number"
                          disabled
                      />
                  </FormControl>
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
  