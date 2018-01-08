import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import { Link } from 'react-router-dom';
import request from "../../node_modules/superagent/superagent";
import server from "../constants";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class ResponsiveDialog extends React.Component {
  state = {
    open: false,
    name: null,
    category: null
  };
  handleClickOpen = () => {
      console.log(this.props.addData.img);
    var data = {
        category: this.props.addData.category,
        name: this.props.addData.productName,
        color: this.props.addData.color,
        image: this.props.addData.img,
        quanity: this.props.addData.quantity,
        brand: this.props.addData.brandName,
        salePrice: this.props.addData.salePrice,
        basePrice: this.props.addData.basePrice,
        model: this.props.addData.modelNumber
    }
    request.post(server.path+'/api/Products?access_token='+(cookies.get('accessToken').accessToken))
      .send(data)
      .end((err, res) => {
        if(res.status === 200) {
            this.setState({ open: true, name: res.body.name, category: res.body.category });
            window.location.href = '/Products';
        }
      });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen, addData } = this.props;

    return (
      <div style={{display:'flex', justifyContent:'center'}}>
        <Button raised style={{ color:'white', backgroundColor:'black', marginTop:'4rem',}} onClick={this.handleClickOpen}>
        ADD PRODUCT
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
        <div style={{backgroundColor:'#424242'}}>
          <DialogTitle><span  style={{color:'white'}}>Confirmation!</span></DialogTitle>
          <DialogContent>
            <DialogContentText style={{color:'white'}}>
            Your Product with name '{this.state.name}' in category '{this.state.category}' has been added.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
                OK
            </Button>
          </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);