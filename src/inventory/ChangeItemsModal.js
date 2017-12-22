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
import { Link } from 'react-router-dom';
import ProductSellingPanel from './ProductSellingPanel';

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
  };

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
        Change items
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
          <Link to="/Categories" style={{ textDecoration: 'none' }}>
          <Button onClick={this.handleRequestClose} color="primary">
              OK
        </Button>
        </Link>
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