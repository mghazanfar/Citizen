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
import { Link } from 'react-router-dom';
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
    open: false,
    shop: null,
    order: [],
    customerName: null,
    phoneNumber: null,
    discount: null,
    payment: null,
    status: null,
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
    console.log(this.props);
    let order = this.props.order;
    let billProductQuantity = cookies.get('billProductQuantity');
    let update= {}; 
    update.oldProducts = order._products;
    if(billProductQuantity !== undefined){
      update.newProducts= billProductQuantity;
    }
    update.status = window.location.href.split('status=');
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
      update.payment = this.props.order.payment;
    }
    if(update.status === undefined){
      alert('Please select status');
    }
    let accessToken = cookies.get('accessToken').accessToken;
    request.patch(`${server.path}/api/Bills/${this.props.order.id}?access_token=${accessToken}`)
    .send(update)
    .end((err, res) => {
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
              defaultValue={this.state.order.phoneNumber}
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
            <div style={{marginTop:15}}>
                <RSInput
                defaultValue={this.state.order.discount}
                onChange={this.handleChange('discount')}
                />
                <RSInput
                style={{marginTop:15}}
                defaultValue={this.state.order.payment}
                onChange={this.handleChange('payment')}
                />
                <BillStatus/>
            </div>
            <div style={{marginTop:5, display:'flex', justifyContent:'space-around'}}>
                <Button raised style={styles.button} onClick={this.updateBill.bind(this)}>
                update bill
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