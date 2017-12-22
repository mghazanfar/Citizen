import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
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
      <div style={{display:'flex'}}>
        <Button color='primary' onClick={this.handleClickOpen}>
        Details
        </Button>
    
    <MuiThemeProvider theme={theme}>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
        <div style={{backgroundColor:'#424242'}}>
          <DialogTitle><span style={{color:'white'}}>Usman</span></DialogTitle>
          <DialogContent>
            <Paper style={{padding:20, width:1000, minWidth:700}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <FormControl disabled>
                    <InputLabel htmlFor="name-disabled">OrderNumber</InputLabel>
                    <Input id="name-disabled" value={this.state.name} onChange={this.handleChange} />
                </FormControl>
                <FormControl disabled>
                    <InputLabel htmlFor="name-disabled">Date</InputLabel>
                    <Input id="name-disabled" value={this.state.name} onChange={this.handleChange} />
                </FormControl>
                <FormControl disabled>
                    <InputLabel htmlFor="name-disabled">Time</InputLabel>
                    <Input id="name-disabled" value={this.state.name} onChange={this.handleChange} />
                </FormControl>
            </div>
            <div style={{marginTop:15}}>
            <Input
              defaultValue="Hello world"
              inputProps={{
                'aria-label': 'Description',
              }}
              fullWidth
            />
            <Input
            style={{marginTop:15}}
              defaultValue="0312-3857670"
              inputProps={{
                'aria-label': 'Description',
              }}
              fullWidth
            />
            </div>
                </Paper>
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