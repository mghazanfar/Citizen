import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import ProductSellingPanel from './ProductSellingPanel';

import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

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

class ResponsiveDialog extends React.Component<props, {}> {
  state = {
    open: false,
    products: []
  };
  componentWillMount() {
      if(cookies.get('accessToken').accessToken){
          let accessToken = cookies.get('accessToken').accessToken;
          let shop = window.location.href.split('?')[1].split('=')[1].split('&')[0];
          request.get(`${server.path}/api/Shops/${shop}?access_token=${accessToken}`)
          .end((err, res) => {
              if(res.statusCode === 200) {
                  this.setState({
                      products : res.body
                  });
              }
          });
      } else {
          window.location.href = '/';
      }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div style={{display:'flex', marginTop:'1rem'}}>
        <Button raised style={{ color:'white', backgroundColor:'black'}} onClick={this.handleClickOpen}>
        ADD ITEMS
        </Button>
        
    <MuiThemeProvider theme={theme}>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
        <div style={{backgroundColor:'#424242'}}>
          <DialogTitle><span  style={{color:'white'}}>Add Items!</span></DialogTitle>
          <DialogContent>
            <ProductSellingPanel />
          </DialogContent>
          <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
              OK
        </Button>
          </DialogActions>
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