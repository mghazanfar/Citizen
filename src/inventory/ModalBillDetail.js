import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Dialog, {
  DialogContent,
  withMobileDialog,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import BilledProductPanel from './BilledProductPanel';
import ChangeItems from './ChangeItemsModal';
import RSInput from './RsInput'
import BillStatus from './BillStatus'
import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const styles = {
  button: {
    color:'white',
    backgroundColor:'black',
  },
  noUnderline: {
    textDecoration: 'none',
  }
  };
  
const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      // Name of the styleSheet
      paperWidthSm: {
        // Name of the rule
        maxWidth: 'max-content',
      },
    },
  },
});

class ResponsiveDialog extends React.Component {
  state = {
    buttonText: 'UPDATE BILL',
    disabled: false,
    open: false,
    shop: null,
    order: [],
    customerName: null,
    phoneNumber: 0,
    discount: 0,
    payment: 0,
    status: null
  };

  componentWillMount(){
      let shop = window.location.href.split('shop=')[1].split('&')[0];
      if (shop === undefined){
          window.location.href = '/';
      } else {
          this.setState({
              shop: shop,
              customerName: this.props.order.customerName,
              customerNumber: this.props.order.customerNumber,
              discount: this.props.order.discount,
              payment: this.props.order.payment,
              status: this.props.order.status
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
    repeat = () => {
        setInterval(() => {
            let billProducts = cookies.get('billProductQuantity');
            if(billProducts){
                console.log(billProducts);
                let payment = 0;
                billProducts.map(product => {
                    payment += (parseInt(product.quantity)*parseInt(product.salePrice))
                });
                let discount = parseInt(this.state.discount);
                if(billProducts){
                    this.setState({
                        payment: payment-discount
                    })
                }
            }
        }, 5000)
    };

  handleClickOpen = (order) => {
    this.setState({ open: true, order: order });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };
  handleChange = (name, description) => event => {
    this.setState({
        [name]: event.target.value,
        [description]: event.target.value,
    });
  };
  updateBill() {
    this.setState({
       buttonText: <CircularProgress/>,
        disabled: true
    });
    let order = this.props.order;
    let billProductQuantity = cookies.get('billProductQuantity');

    console.log(billProductQuantity);
    let update= {}; 
    update.oldProducts = order._products;
    if(billProductQuantity !== undefined){
      update.newProducts= billProductQuantity;
    }
    update.status = window.location.href.split('status=')[1];
    if(this.state.customerName !== this.props.order.customerName){
      update.customerName = this.state.customerName;
    }
    if(this.state.phoneNumber !== this.props.order.phoneNumber){
      update.phoneNumber = this.state.phoneNumber;
    }
    if(this.state.discount !== this.props.order.discount){
      update.discount = this.state.discount;
    }
    if(this.state.payment !== this.props.order.payment){
      update.payment = this.state.payment;
    }
    if(update.status === undefined){
      alert('Please select status');
    }
    let accessToken = cookies.get('accessToken').accessToken;
    request.patch(`${server.path}/api/Bills/${this.props.order.id}?access_token=${accessToken}`)
    .send(update)
    .end((err, res) => {
        this.setState({
       buttonText: 'UPDATE BILL',
        disabled: false
    });
      if(res){
          if(res.status === 200){
            alert('Updated Successfully');
            window.location.href = `/ManageOrders?shop=${this.state.shop}`;
            cookies.remove('billProductQuantity');
          } else {
            alert(res.body.error.message);
          }
      } else {
        alert('Server Unreachable');
      }
    });
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <div style={{display:'flex'}}>
        <Button color='primary' onClick={this.handleClickOpen.bind(null, this.props.order)}>
        Details
        </Button>
    
    <MuiThemeProvider theme={theme}>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
        <div style={{backgroundColor:'#424242'}}>
          <DialogContent>
            <Paper style={{padding:20, minWidth:700}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <FormControl disabled>
                    <InputLabel htmlFor="name-disabled"> {this.state.order.id} </InputLabel>
                    <Input id="name-disabled" value={this.state.name} onChange={this.handleChange} />
                </FormControl>
                <FormControl disabled>
                    <InputLabel htmlFor="name-disabled"> {this.state.order.createdAt} </InputLabel>
                    <Input id="name-disabled" value={this.state.name} onChange={this.handleChange} />
                </FormControl>
                <FormControl disabled>
                    <InputLabel htmlFor="name-disabled"> {this.state.order.updatedAt} </InputLabel>
                    <Input id="name-disabled" value={this.state.name} onChange={this.handleChange} />
                </FormControl>
            </div>
            <div style={{marginTop:15}}>
            <Input
              defaultValue={this.state.order.customerName}
              inputProps={{
                'aria-label': 'Description',
              }}
              fullWidth
              onChange={this.handleChange('customerName')}
            />
            <Input
            style={{marginTop:15}}
              value={this.state.order.phoneNumber}
              inputProps={{
                'aria-label': 'Description',
              }}
              fullWidth
              onChange={this.handleChange('phoneNumber')}
            />
            </div>
            <Paper style={{marginTop:15, maxHeight:200, overflow:'scroll'}}>
                <BilledProductPanel products={this.state.order._products} />
            </Paper>
            <ChangeItems />
                <Paper>
                    {'Items Detail (In case of claims):'}
                    {this.props.order.items}
                </Paper>
            <div style={{marginTop:15}}>
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
                    label="Total Payment"
                    type="search"
                    margin="normal"
                    value={this.state.payment}
                    // onChange={this.handleChange('payment')}
                    style={{width: '100%'}}
                />
                <BillStatus status={this.state.status}/>
            </div>
            <div style={{marginTop:5, display:'flex', justifyContent:'space-around'}}>
                <Button disabled={this.state.disabled} raised style={styles.button} onClick={this.updateBill.bind(this)}>
                    {this.state.buttonText}
                </Button>
                <Button onClick={this.handleRequestClose} raised style={styles.button}>
                ok
                </Button>
            </div>
                </Paper>
          </DialogContent>
          </div>
        </Dialog>
    </MuiThemeProvider>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);