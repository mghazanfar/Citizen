import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
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
import cloudinary from 'cloudinary';

const cookies = new Cookies();

cloudinary.config({
    cloud_name: 'my-furniture-shop',
    api_key: '842684991763488',
    api_secret: 'JTWKG9czuqaFywMA3xCkrZuA-ls'
});

class ResponsiveDialog extends React.Component <props, {}>{
  state = {
    shopId: null,
    open: false,
    name: null,
    description: null,
    disabled: false,
    addCategory: 'ADD CATEGORY',
    modifyCategory: 'MODIFY CATEGORY'
  };

  handleClickOpen = () => {
      this.setState({
          disabled: true
      });
    if(this.props.category==="modify"){
        console.log('modify', this.props.addData);
        this.setState({
            modifyCategory: <CircularProgress />
        });
        cloudinary.v2.uploader.upload(this.props.addData.image,
            (error, result) => {
                console.log(result)
                if (error) {
                    alert("Error uploading image")
                } else {
                    var data = {
                        shopId: this.props.addData.shopId,
                        name: this.props.addData.name,
                        description: this.props.addData.description,
                        image: result.secure_url,
                    }
                    request.patch(`${server.path}/api/Categories/${this.props.addData.id}?access_token=${cookies.get('accessToken').accessToken}`,
                        data, (err, res) => {
                            console.log(res);
                            if (res) {
                                this.setState({
                                    modifyCategory: 'MODIFY CATEGODY'
                                });
                                if (res.statusCode === 200) {
                                    this.setState({open: true});
                                } else {
                                    alert(res.body.error.message);
                                    this.setState({
                                        modifyCategory: 'MODIFY CATEGODY'
                                    });
                                }
                            } else {
                                alert('Service Unreachable');
                                this.setState({
                                    modifyCategory: 'MODIFY CATEGODY'
                                });
                            }
                        });
                }
            });
    } else {
        this.setState({
            addCategory: <CircularProgress />
        });
        cloudinary.v2.uploader.upload(this.props.addData.image,
            (error, result) => {
                console.log(error, result)
                if (error) {
                    alert("Error uploading image")
                } else {
                    var data = {
                        shopId: this.props.addData.shopId,
                        name: this.props.addData.name,
                        description: this.props.addData.description,
                        image: result.secure_url,
                    };
                    console.log('add', data);
                    request.post(`${server.path}/api/Categories?access_token=${cookies.get('accessToken').accessToken}`)
                        .send(data)
                        .end((err, res) => {
                            if (res) {
                                this.setState({
                                    addCategory: 'ADD CATEGORY'
                                });
                                if (res.statusCode === 200) {
                                    this.setState({open: true});
                                } else {
                                    alert(res.body.error.message);
                                }
                            } else {
                                alert('Service Unreachable');
                                this.setState({
                                    addCategory: 'ADD CATEGORY'
                                });
                            }
                        });
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
          <Button disabled={this.state.disabled} type='submit' raised style={{ color:'white', backgroundColor:'black', marginTop:'4rem',}} onClick={this.handleClickOpen}>
          {this.state.modifyCategory}
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
        <Button disabled={this.state.disabled} raised style={{ color:'white', backgroundColor:'black', marginTop:'4rem',}} onClick={this.handleClickOpen}>
        {this.state.addCategory}
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