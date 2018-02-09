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
import Cookies from 'universal-cookie'
import cloudinary from 'cloudinary';
const cookies = new Cookies();


cloudinary.config({ 
    cloud_name: 'my-furniture-shop', 
    api_key: '842684991763488', 
    api_secret: 'JTWKG9czuqaFywMA3xCkrZuA-ls' 
  });
  
  
class ResponsiveDialog extends React.Component {
  state = {
    buttonText: 'ADD PRODUCT',
    open: false,
    name: null,
    category: null
  };
  componentWillMount() {
      if(cookies.get('accessToken').accessToken === undefined) {
          window.location.href = '/';
      }
      if(window.location.href.split('?')[1] === undefined){
          window.location.href = '/Login';
      }
      var params = window.location.href.split("?")[1].split('&');
      var shop = params[0].split('=')[1] ;
      this.setState({
          shop: shop
      });
      if(params.length > 1){
          var product = params[1].split('=')[1];

      }
      if(window.location.href.split('id=')[1] !== undefined) {
          this.setState({
              buttonText: 'MODIFY PRODUCT'
          });
      }
  }
  handleClickOpen = () => {
      var id = window.location.href.split("cat=");
      if(this.props.addData.id) {
          var data = {
              shopId: this.props.addData.shop,
              category: this.props.addData.category,
              name: this.props.addData.productName,
              color: this.props.addData.color,
              image: this.props.addData.img,
              quantity: this.props.addData.quantity,
              brand: this.props.addData.brandName,
              salePrice: this.props.addData.salePrice,
              basePrice: this.props.addData.basePrice,
              model: this.props.addData.modelNumber
          };
          request.patch(server.path + '/api/Products/'+this.props.addData.id+'?access_token=' + (cookies.get('accessToken').accessToken),
              data,
              (err, res) => {
                  console.log(res)
                  if (res.status === 200) {
                      this.setState({open: true, name: res.body.name, category: res.body.category});
                  }
              });

      } else {
          console.log("image test");
          cloudinary.v2.uploader.upload(this.props.addData.img, 
          (error, result) =>  {console.log(result)
            if(error){
                alert("Error uploading image")
            } else {
                console.log(this);
                var data = {
                    shopId: this.props.addData.shop,
                    category: this.props.addData.category,
                    name: this.props.addData.productName,
                    color: this.props.addData.color,
                    image: result.secure_url,
                    quantity: this.props.addData.quantity,
                    brand: this.props.addData.brandName,
                    salePrice: this.props.addData.salePrice,
                    basePrice: this.props.addData.basePrice,
                    model: this.props.addData.modelNumber
                }
                request.post(`${server.path}/api/Products?access_token=${(cookies.get('accessToken').accessToken)}`)
                    .send(data)
                    .end((err, res) => {
                        if(res){
                            if (res.status === 200) {
                                this.setState({open: true, name: res.body.name, category: res.body.category});
                            } else {
                                alert(res.body.error.message);
                            }
                        } else {
                            alert('Service Unreachable');
                        }
                    });
            }
        });
        
      }
  };

  handleRequestClose = () => {
    this.setState({ open: false });
      window.location.href = `/Products?shop=${this.state.shop}`;
  };

  render() {
    const { fullScreen, addData } = this.props;

    return (
      <div style={{display:'flex', justifyContent:'center'}}>
        <Button raised style={{ color:'white', backgroundColor:'black', marginTop:'4rem',}} onClick={this.handleClickOpen}>
            {this.state.buttonText}
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