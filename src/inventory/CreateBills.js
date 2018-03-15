import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Background from '../img/receipt.jpg';
import Citizen from '../img/logo.jpeg';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import ModalBills from './ModalBills';
import BilledProductPanel from './BilledProductPanel';
import BillStatus from './BillStatus';
import Menu from './Menu';
import './clickables.css';
import Logout from './Logout';
import { CircularProgress } from 'material-ui/Progress';
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
    phoneNumber: 0,
    products: [],
    discount: 0,
    payment: 0,
    status: 'Status',
    back: null,
    billProducts: [],
    buttonText: 'Create Bill',
    address: {},
    discountPercentage: 0,
  };

  componentWillMount() {
    let url = window.location.href.search('shop=');
      let shop;
    if(url === -1){
      window.location.href = '/Login';
    }else{
      shop = window.location.href.split('shop=')[1];
      shop = shop.split('&')[0];
     this.setState({ shop: shop});
    }
    let role = cookies.get('role');
    if(role === 'Employee'){
        this.setState({
            back: `/Shop?shop=${window.location.href.split('shop=')[1].split('&')[0]}`
        })
    } else {
        this.setState({
            back: `/Inventory?shop=${window.location.href.split('shop=')[1].split('&')[0]}`
        })
    }
    if(cookies.get('accessToken')){
        request.get(`${server.path}/api/Shops/${shop}?access_token=${cookies.get('accessToken').accessToken}`)
            .end((err, res) => {
                console.log(res);
                if(res){
                    if(res.statusCode === 200){
                        this.setState({
                            address: res.body
                        })
                    } else {
                        alert(res.body.error.message);
                    }
                }
            });
    }
  }

  componentDidMount(){
        this.repeat();
        let billProducts = cookies.get('billProductQuantity');
        if(billProducts){
            cookies.remove('billProductQuantity');
        }
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
                    this.setState({
                        buttonText: <CircularProgress />
                    });
                    let accessToken = cookies.get('accessToken').accessToken;
                    request.post(`${server.path}/api/Bills?access_token=${accessToken}`)
                        .send(data)
                        .end((err, res) => {
                        this.setState({
                            buttonText:'Create Bill'
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
              if(billProducts){
                  this.setState({
                      billProducts: billProducts,
                      payment: payment-discount
                  })
              }
          }
      }, 5000)
  };

  discountPercentage = (discountPercentage) => event => {
        let payment = this.state.payment;
        this.setState({
            discountPercentage: event.target.value,
            discount: (event.target.value/100)*payment
        });
  };

  render() {
      return (
          <div style={styles.root}>
              <div className="no-print">
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
                        <Table>
                            <TableHead>
                                <TableRow style={{fontSize: '1rem', fontWeight: 700, color: 'black'}}>
                                    <TableCell numeric style={{fontWeight: 700}}>Brand</TableCell>
                                    <TableCell numeric style={{fontWeight: 700}}>Name</TableCell>
                                    <TableCell numeric style={{fontWeight: 700}}>Model</TableCell>
                                    <TableCell numeric style={{fontWeight: 700}}>Color</TableCell>
                                    <TableCell numeric style={{fontWeight: 700}}>Quantity</TableCell>
                                    <TableCell numeric style={{fontWeight: 700}}>Sale Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.billProducts.map(n => {
                                    return (
                                        <TableRow key={n.productId}>
                                            <TableCell>{n.brand}</TableCell>
                                            <TableCell numeric>{n.name}</TableCell>
                                            <TableCell numeric>{n.model}</TableCell>
                                            <TableCell numeric>{n.color}</TableCell>
                                            <TableCell numeric>{n.quantity}</TableCell>
                                            <TableCell numeric>{n.salePrice}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                      <TextField
                          id="search"
                          label="Add discounts"
                          type="search"
                          margin="normal"
                          onChange={this.handleChange('discount')}
                          value={this.state.discount}
                          style={{width: '100%'}}
                      />
                        <TextField
                            id="search"
                            label="Add discount in Percentage"
                            type="search"
                            margin="normal"
                            onChange={this.discountPercentage('discountPercentage')}
                            value={this.state.discountPercentage}
                            style={{width: '100%'}}
                        />
                      <TextField
                          id="search"
                          label="Total Payment"
                          type="search"
                          margin="normal"
                          value={this.state.payment}
                          // onChange={this.handleChange('payment')}
                          style={{width: '100%'}}
                      />
                      <BillStatus status={this.state.status}/>
                    </Paper>
                    <div style={{display: 'flex', justifyContent: 'space-around', width: 'inherit'}}>
                        <Button onClick={this.createBill.bind(this)} raised style={styles.button}>
                            {this.state.buttonText}
                        </Button>
                        <Link to={this.state.back} style={styles.noUnderline}>
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
                      {this.state.buttonText}
                  </Typography>
                  <Typography type="headline" paragraph style={{color: 'white', textAlign: 'center', width: '60%',}}>Create
                    bills for your customers here.</Typography>
                  <Link to={this.state.back} style={styles.noUnderline}>
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
                        <BilledProductPanel print={true} data={'DataofSelectedItems'}/>
                      <TextField
                          id="search"
                          label="Add discounts"
                          type="search"
                          margin="normal"
                          onChange={this.handleChange('discount')}
                          value={this.state.discount}
                          style={{width: '100%'}}
                      />
                        <TextField
                            id="search"
                            label="Add discount in Percentage"
                            type="search"
                            margin="normal"
                            onChange={this.discountPercentage('discountPercentage')}
                            value={this.state.discountPercentage}
                            style={{width: '100%'}}
                        />
                      <TextField
                          id="search"
                          label="Total Payment"
                          type="search"
                          margin="normal"
                         /* onChange={this.handleChange('payment')}*/
                          style={{width: '100%'}}
                      />
                      <BillStatus status={this.state.status} />
                    </Paper>
                    <div style={{display: 'flex', justifyContent: 'space-around', width: 'inherit'}}>
                        <Button onClick={this.createBill.bind(this)} raised style={styles.button}>
                            {this.state.buttonText}
                        </Button>
                        <Link to={this.state.back} style={styles.noUnderline}>
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
              <div className='print-only'>
                  <div style={{
                      width: '100%',
                      height: '100vh',
                      background: '-webkit-linear-gradient(-125deg, #D000F0, #E60080, #FF0000)',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column'
                  }}>
                      <img src={Citizen} height={150} width={150} alt="Citizen"/>
                      <Paper elevation={24}
                             style={{maxHeight: 700, overflow: 'auto', width: '96%', padding: 10, height: 'inherit'}}>
                          <TextField
                              value={this.state.customerName}
                              id="search"
                              label="Customer name"
                              type="search"
                              margin="normal"
                              style={{width: '100%'}}
                          />
                          <TextField
                              value={this.state.phoneNumber}
                              id="search"
                              label="Phone number"
                              type="search"
                              margin="normal"
                              style={{width: '100%'}}
                          />
                          <Table>
                              <TableHead>
                                  <TableRow style={{fontSize: '1rem', fontWeight: 700, color: 'black'}}>
                                      <TableCell numeric style={{fontWeight: 700}}>Brand</TableCell>
                                      <TableCell numeric style={{fontWeight: 700}}>Name</TableCell>
                                      <TableCell numeric style={{fontWeight: 700}}>Model</TableCell>
                                      <TableCell numeric style={{fontWeight: 700}}>Color</TableCell>
                                      <TableCell numeric style={{fontWeight: 700}}>Quantity</TableCell>
                                      <TableCell numeric style={{fontWeight: 700}}>Sale Price</TableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {this.state.billProducts.map(n => {
                                      return (
                                          <TableRow key={n.productId}>
                                              <TableCell>{n.brand}</TableCell>
                                              <TableCell numeric>{n.name}</TableCell>
                                              <TableCell numeric>{n.model}</TableCell>
                                              <TableCell numeric>{n.color}</TableCell>
                                              <TableCell numeric>{n.quantity}</TableCell>
                                              <TableCell numeric>{n.salePrice}</TableCell>
                                          </TableRow>
                                      );
                                  })}
                              </TableBody>
                          </Table>
                          <TextField
                              value={this.state.discount}
                              id="search"
                              label="Add discounts"
                              type="search"
                              margin="normal"
                              style={{width: '100%'}}
                          />
                          <TextField
                              value={this.state.payment}
                              id="search"
                              label="Total Payment"
                              type="search"
                              margin="normal"
                              style={{width: '100%'}}
                          />
                          {window.location.href.split('status=')[1]}
                      </Paper>
                      <div style={{
                          backgroundColor: 'rgba(255,255,255,0.65)',
                          display: 'flex',
                          width: '100%',
                          height: 100,
                          marginTop: 'auto',
                          justifyContent: 'space-between'
                      }}>
                          <div style={{width: '30%', fontSize: 13, marginTop: 'auto', marginBottom: 'auto'}}>
                              <b>Address:</b> {this.state.address.address} <br/>
                              <b>Phone:</b> {this.state.address.mobile} <br/>
                              <b>Email:</b> {this.state.address.email}
                          </div>
                          <div style={{width: '25%', fontSize: 13, marginTop: 'auto', marginBottom: 'auto'}}>
                              <b>NOTE:</b> <br/>
                              Booked furniture will not be handed over without showing bill. Original reciept is required
                              in order to recieve furniture.
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      );
  }
}

export default withStyles(styles)(FullWidthGrid);