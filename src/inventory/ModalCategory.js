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
    const { fullScreen, category } = this.props;

    if(category==='modify'){
      return (
        <div style={{display:'flex', justifyContent:'center'}}>
          <Button raised style={{ color:'white', backgroundColor:'black', marginTop:'4rem',}} onClick={this.handleClickOpen}>
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
              Your Category with name "Sofa" has been modified.
              </DialogContentText>
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
            Your Category with name "Sofa" has been added.
            </DialogContentText>
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
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);