import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/receipt.jpg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import ModalBills from './ModalBills';
import BillStatus from './BillStatus';
import Logout from './Logout';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import request from "../../node_modules/superagent/superagent";
import server from "../constants";
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
    background: 'rgba(12, 134, 12, 0.9)',
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
avatar: {
  width:70,
  height:70,
},
noUnderline: {
  textDecoration: 'none',
}
};

class FullWidthGrid extends React.Component<props, {}>{
  state = {
    shop: null,
    customerName: null,
    phoneNumber: null,
    products: [],
    discount: null,
    payment: null,
    status: null,
  };

  componentWillMount() {
    let url = window.location.href.search('shop=');
    if(url === -1){
      window.location.href = '/Login';
    }else{
      let shop = window.location.href.split('shop=')[1];
      shop = shop.split('&')[0];
     this.setState({ shop: shop});
    }
  }
    componentDidMount(){
        this.setState({
            shop: window.location.href.split('shop=')[1]
        });
    }

    handleChange = (name, description) => event => {
        this.setState({
            [name]: event.target.value,
            [description]: event.target.value,
        });
    };

  createBill(){
    let url = window.location.href.split('&')[1];
    if(url === undefined){
        alert('No product selected');
    } else {
        let products = url.split('&')[0].split(',');
        let status = window.location.href.split('&status=')[1];
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
                    status: status,
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
                else if (data.status === null || data.status === undefined) {
                    alert('Please select bill status');
                } else {
                    let accessToken = cookies.get('accessToken').accessToken;
                    request.post(`${server.path}/api/Bills?access_token=${accessToken}`).send(data).end((err, res) => {
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

  render() {
      return (
          <div style={styles.root}>
            <Grid container spacing={0} style={styles.container}>
              <Hidden lgDown>
                <Grid item xs={12} lg={8} style={styles.right}>
                  <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '95%',
                      height: 'inherit'
                  }}>
                    <Paper elevation={24}
                           style={{maxHeight: 700, overflow: 'auto', width: 'inherit', padding: 20, height: 'inherit'}}>
                      <TextField
                          id="search"
                          label="Customer name"
                          type="search"
                          margin="normal"
                          onChange={this.handleChange('customerName')}
                          style={{width: '100%'}}
                      />
                      <TextField
                          id="search"
                          label="Phone number"
                          type="search"
                          margin="normal"
                          onChange={this.handleChange('phoneNumber')}
                          style={{width: '100%'}}
                      />
                      <ModalBills/>
                      <TextField
                          id="search"
                          label="Add discounts"
                          type="search"
                          margin="normal"
                          onChange={this.handleChange('discount')}
                          style={{width: '100%'}}
                      />
                      <TextField
                          id="search"
                          label="Total Payment"
                          type="search"
                          margin="normal"
                          onChange={this.handleChange('payment')}
                          style={{width: '100%'}}
                      />
                      <BillStatus/>
                    </Paper>
                    <div style={{display: 'flex', justifyContent: 'space-around', width: 'inherit'}}>
                        <Button onClick={this.createBill.bind(this)} raised style={styles.button}>
                          Create Bill
                        </Button>
                        <Link to={`/Inventory?shop=${this.state.shop}`} style={styles.noUnderline}>
                        <Button raised style={styles.button}>
                          Cancel
                        </Button>
                        </Link>
                    </div>
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
                    textAlign: 'center'
                }}>
                  <Typography type="display3" gutterBottom style={{color: 'white'}}>
                    CREATE BILL
                  </Typography>
                  <Typography type="headline" paragraph style={{color: 'white', textAlign: 'center', width: '60%',}}>Create
                    bills for your customers here.</Typography>
                  <Link to={`/Inventory?shop=${this.state.shop}`} style={styles.noUnderline}>
                    <Button raised style={styles.button}>
                      GO TO INVENTORY
                    </Button>
                  </Link>
                  <Logout/>
                </div>
              </Grid>

              <Hidden lgUp>
                <Grid item xs={12} lg={8} style={styles.right}>
                  <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '95%',
                      height: 'inherit'
                  }}>
                    <Paper elevation={24}
                           style={{maxHeight: 700, overflow: 'auto', width: 'inherit', padding: 10, height: 'inherit'}}>
                      <TextField
                          id="search"
                          label="Customer name"
                          type="search"
                          margin="normal"
                          onChange={this.handleChange('customerName')}
                          style={{width: '100%'}}
                      />
                      <TextField
                          id="search"
                          label="Phone number"
                          type="search"
                          margin="normal"
                          onChange={this.handleChange('phoneNumber')}
                          style={{width: '100%'}}
                      />
                      <ModalBills/>
                      <TextField
                          id="search"
                          label="Add discounts"
                          type="search"
                          margin="normal"
                          onChange={this.handleChange('discount')}
                          style={{width: '100%'}}
                      />
                      <TextField
                          id="search"
                          label="Total Payment"
                          type="search"
                          margin="normal"
                          onChange={this.handleChange('payment')}
                          style={{width: '100%'}}
                      />
                      <BillStatus/>
                    </Paper>
                    <div style={{display: 'flex', justifyContent: 'space-around', width: 'inherit'}}>
                        <Button onClick={this.createBill.bind(this)} raised style={styles.button}>
                          Create Bill
                        </Button>
                        <Link to={`/Inventory?shop=${this.state.shop}`} style={styles.noUnderline}>
                        <Button raised style={styles.button}>
                          Cancel
                        </Button>
                        </Link>
                    </div>
                  </div>
                </Grid>
              </Hidden>
            </Grid>
          </div>
      );
  }
}

export default withStyles(styles)(FullWidthGrid);