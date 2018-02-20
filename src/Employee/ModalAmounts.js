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
import Cookies from 'universal-cookie';
import server from "../constants";
import request from "superagent/superagent";
import {CircularProgress} from 'material-ui/Progress';
const cookies = new Cookies();

class ResponsiveDialog extends React.Component {
  state = {
    open: false,
    buttonText: 'ADD AMOUNTS',
    disabled: false,
  };

  handleClickOpen = () => {
    if(!window.location.href.split('shop')){
      window.location.href = '/Shop'
    }
    this.setState({
        buttonText: <CircularProgress/>,
        disabled: true
    });
    let data = {
      type: 'daily',
      shopId: window.location.href.split('shop=')[1].split('&')[0],
      drinks: this.props.addData.drinks,
      shopExp: this.props.addData.shopExpenses,
      others: this.props.addData.expenses[0].name,
      day: this.props.addData.date[1],
      month: this.props.addData.date[0],
      year: this.props.addData.date[2]
    };
    if(!cookies.get('accessToken')){
      window.location.href = '/'
    }
    console.log(data);
    let token = cookies.get('accessToken').accessToken;
    request.post(`${server.path}/api/DailyExpenses?access_token=${token}`)
        .send(data)
        .end((err, res) => {
          this.setState({
              buttonText: 'ADD AMOUNTS',
              disabled: false,
          });
          if(res){
            if(res.statusCode === 200){
                this.setState({ open: true });
            } else {
              alert(res.body.error.message);
            }
          } else {
            alert('Server Unreachable');
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
        <Button disabled={this.state.disabled} raised style={{ color:'white', backgroundColor:'black', marginTop:'4rem',}} onClick={this.handleClickOpen}>
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
            Your expenses with year '{addData.date[2]}', month '{addData.date[0]}', drinks '{addData.drinks}', shop expenses '{addData.shopExpenses}', and Other Expenses '{addData.expenses[0].name}' has been added.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to={`/LoginEmployee?shop=${window.location.href.split('shop=')[1]}`} style={{ textDecoration: 'none' }}>
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