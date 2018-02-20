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
import { CircularProgress } from 'material-ui/Progress';
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
      disabled: false,
      shop: null,
      month: ' ',
      year: '2018',
      open: false,
      monthSelected: false,
      customerName: null,
      phoneNumber: null,
      items: null,
      claimPrice: 0,
      discount: 0,
      payment: 0,
      status: 'Paid',
      buttonText: 'ADD Claim'
    };

    componentWillMount(){
      if(cookies.get('accessToken') === undefined){
        window.location.href = '/'
      } else {
        if(window.location.href.split('shop=')[1] === undefined){
          window.location.href = '/Login'
        } else {
          let shop = window.location.href.split('shop=')[1].split('&')[0];
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
    };
  
    handleChange = ( month, monthSelected ) => event => {
      this.setState({
        [month]: event.target.value,
        monthSelected: true,
      });
    };

    addClaim(){
        console.log(this.state);
        let url = window.location.href.split('&')[1];
        if(url === undefined){
            alert('No product selected');
        } else {
            let products = url.split('&')[0].split(',');
            if (cookies.get('accessToken').accessToken === undefined) {
                window.location.href = '/';
            }
            if (cookies.get('billProductQuantity') === undefined) {
                alert('Please set product quantities');
            } else {
                var productsWithQuantities = cookies.get('billProductQuantity');
                productsWithQuantities.forEach((value, index) => {
                    productsWithQuantities[index].basePrice = 0;
                    productsWithQuantities[index].salePrice = 0;
                });
                if (products.length < 1) {
                    alert('No product selected');
                } else {
                    let today = new Date();
                    let data = {
                        customerName: this.state.customerName,
                        phoneNumber: this.state.phoneNumber,
                        discount: this.state.discount,
                        payment: this.state.payment,
                        shopId: this.state.shop,
                        items: this.state.items,
                        claimPrice: this.state.claimPrice,
                        status: this.state.status,
                        day: today.getDate(),
                        month: today.getMonth() + 1,
                        year: today.getFullYear(),
                        _products: productsWithQuantities
                    };
                    if(data.discount === null){
                        data.discount = 0;
                    }
                    if (data.customerName === null || data.customerName === undefined) {
                        alert('Please provide name');
                    }
                    else if (data.phoneNumber === null || data.phoneNumber === undefined) {
                        alert('Please provide phone number');
                    }
                    else if (data._products.length === 0) {
                        alert('Please select some products');
                    }
                    else if (data.payment === null) {
                        alert('Please provide total payment');
                    }
                    else if(data.items === null){
                      alert('Please provide claim items description');
                    }
                    else if(data.claimPrice === null){
                      alert('Please provide items price')
                    }
                    else if (data.status === null || data.status === undefined) {
                        alert('Please select bill status');
                    } else {
                        this.setState({
                            disabled: true,
                            buttonText: <CircularProgress />
                        });
                        let accessToken = cookies.get('accessToken').accessToken;
                        request.post(`${server.path}/api/Bills?access_token=${accessToken}`)
                            .send(data)
                            .end((err, res) => {
                                this.setState({
                                    disabled: false,
                                    buttonText:'ADD CLAIM'
                                });
                                if(res) {
                                    console.log(res);
                                    if (res.statusCode !== 200) {
                                        alert(res.body.error.message);
                                    } else {
                                        cookies.remove('billProductQuantity');
                                        window.location.href = `/Inventory?shop=${this.state.shop}`;
                                    }
                                } else {
                                    alert('Service Unreachable');
                                }
                            });
                    }
                }
            }
        }
    }

    repeat = () => {
      setInterval(() => {
          let billProducts = cookies.get('billProductQuantity');
          if(billProducts){
              let payment = 0;
                  billProducts.map(product => {
                  payment += (parseInt(product.quantity)*parseInt(product.salePrice))
              });
              let discount = parseInt(this.state.discount);
              let claimPrice = parseInt(this.state.claimPrice);
              if(billProducts){
                  this.setState({
                      payment: payment-discount-claimPrice
                  })
              }
          }
      }, 5000)
  };
  componentDidMount(){
    this.repeat();
    let billProducts = cookies.get('billProductQuantity');
    if(billProducts){
        cookies.remove('billProductQuantity');
    }
  }
  
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
                        <Link to={`/Shop?shop=${window.location.href.split('shop=')[1]}`} style={styles.noUnderline}>
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
                    <Paper elevation={24} style={{maxHeight:700, overflow:'auto', width:'inherit', padding:20, height:'inherit'}}>
                      <TextField
                      id="search"
                      label="Customer name"
                      type="search"
                      margin="normal"
                      style={{width:'100%'}}
                      onChange={this.handleChange('customerName')}
                      />
                      <TextField
                      id="search"
                      label="Phone number"
                      type="search"
                      margin="normal"
                      style={{width:'100%'}}
                      onChange={this.handleChange('phoneNumber')}
                      />
                      <TextField
                          id="search"
                          label="Items Taken"
                          type="search"
                          margin="normal"
                          style={{width:'100%'}}
                          onChange={this.handleChange('items')}
                      />
                      <ModalBills />
                      <TextField
                      id="search"
                      label="Claim price"
                      type="search"
                      margin="normal"
                      style={{width:'100%'}}
                      onChange={this.handleChange('claimPrice')}
                      />
                      <TextField
                      id="search"
                      label="Add discounts"
                      type="search"
                      margin="normal"
                      style={{width:'100%'}}
                      onChange={this.handleChange('discount')}
                      />
                      <TextField
                      id="search"
                      label="Total Payment"
                      type="search"
                      margin="normal"
                      style={{width:'100%'}}
                      value={this.state.payment}
                      />
                      <Button disabled={this.state.disabled} onClick={this.addClaim.bind(this)} raised style={styles.button}>
                          {this.state.buttonText}
                      </Button>
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
                  onChange={this.handleChange('customerName')}
                  />
                  <TextField
                  id="search"
                  label="Phone number"
                  type="search"
                  margin="normal"
                  style={{width:'100%'}}
                  onChange={this.handleChange('phoneNumber')}
                  />
                  <TextField
                     id="search"
                     label="Items Taken"
                     type="search"
                     margin="normal"
                     style={{width:'100%'}}
                     onChange={this.handleChange('items')}
                  />
                  <ModalBills />
                  <TextField
                  id="search"
                  label="Claim price"
                  type="search"
                  margin="normal"
                  style={{width:'100%'}}
                  onChange={this.handleChange('claimPrice')}
                  />
                  <TextField
                  id="search"
                  label="Add discounts"
                  type="search"
                  margin="normal"
                  style={{width:'100%'}}
                  onChange={this.handleChange('discount')}
                  />
                  <TextField
                  id="search"
                  label="Total Payment"
                  type="search"
                  margin="normal"
                  style={{width:'100%'}}
                  value = {this.state.payment}
                  />
                    <Button disabled={this.state.disabled} onClick={this.addClaim.bind(this)} raised style={styles.button}>
                        {this.state.buttonText}
                    </Button>
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
  