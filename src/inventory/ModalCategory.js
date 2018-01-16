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

class ResponsiveDialog extends React.Component <props, {}>{
  state = {
    shopId: null,
    open: false,
    name: null,
    description: null,
  };

  handleClickOpen = () => {

    if(this.props.category==="modify"){
        console.log(this.props.addData);
        var data = {
            name: this.props.addData.name,
            description: this.props.addData.description,
            image: this.props.addData.image,
        }
        request.put(`${server.path}/api/Shops/${this.props.addData.shopId}/categories/${this.props.addData.id}?access_token=${cookies.get('accessToken').accessToken}`)
            .send(data)
            .end((err, res) => {
                if(res.statusCode === 200){
                    this.setState({ open: true });
                } else {
                    alert('Error');
                }
            });
    } else {
        var data = {
            name: this.props.addData.name,
            description: this.props.addData.description,
            image: this.props.addData.image,
        }
        request.post(server.path+'/api/Shops/'+this.props.addData.shopId+'/Categories?access_token='+(cookies.get('accessToken').accessToken))
            .send(data)
            .end((err, res) => {
                console.log((res));
                if(res.status === 200) {
                    this.setState({ open: true, name: res.body.name, category: res.body.category });
                }
            });
    }
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen, category, addData } = this.props;
    if(category==='modify'){
      return (
        <div style={{display:'flex', justifyContent:'center'}}>
          <Button type='submit' raised style={{ color:'white', backgroundColor:'black', marginTop:'4rem',}} onClick={this.handleClickOpen}>
          MODIFY CATEGORY
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
              Your Category with name "{addData.name}" and description "{addData.description}" has been modified.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Link to={`/Categories?shop=${this.props.addData.shopId}`} style={{ textDecoration: 'none' }}>
            <Button onClick={this.handleRequestClose} color="primary">
                OK
          </Button>
          </Link>
            </DialogActions>
            </div>
          </Dialog>
        </div>
      );
    }
    return (
      <div style={{display:'flex', justifyContent:'center'}}>
        <Button raised style={{ color:'white', backgroundColor:'black', marginTop:'4rem',}} onClick={this.handleClickOpen}>
        ADD CATEGORY
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
            Your Category with name "{this.state.name}" and description "{this.state.description}" has been added.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Link to={`/Categories?shop=${this.props.addData.shopId}`} style={{ textDecoration: 'none' }}>
          <Button onClick={this.handleRequestClose} color="primary">
              OK
        </Button>
        </Link>
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