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
import StatusMenu from './StatusMenu'

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
  };

  componentWillMount(){
      //console.log(this.props);
      let shop = window.location.href.split('shop=')[1].split('&')[0];
      if (shop === undefined){
          window.location.href = '/';
      } else {
          this.setState({
              shop: shop
          });
      }
  }

  handleClickOpen = (order) => {
    this.setState({ open: true, order: order });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

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
            />
            <Input
            style={{marginTop:15}}
              defaultValue={this.state.order.phoneNumber}
              inputProps={{
                'aria-label': 'Description',
              }}
              fullWidth
            />
            </div>
            <Paper style={{marginTop:15, maxHeight:200, overflow:'scroll'}}>
                <BilledProductPanel products={this.state.order._products} />
            </Paper>
            <ChangeItems />
            <div style={{marginTop:15}}>
                <RSInput
                defaultValue={this.state.order.discount}
                />
                <RSInput
                style={{marginTop:15}}
                defaultValue={this.state.order.payment}
                />
                <StatusMenu style={{marginTop:15}} />
            </div>
            <div style={{marginTop:5, display:'flex', justifyContent:'space-around'}}>
                <Link to={`/Inventory?shop=${this.state.shop}`} style={styles.noUnderline}>
                <Button raised style={styles.button}>
                update bill
                </Button>
                </Link>
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