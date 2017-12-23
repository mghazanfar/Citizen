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
          <DialogContent>
            <Paper style={{padding:20, minWidth:700}}>
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
            <Paper style={{marginTop:15, maxHeight:200, overflow:'scroll'}}>
                <BilledProductPanel />
            </Paper>
            <ChangeItems />
            <div style={{marginTop:15}}>
                <RSInput
                defaultValue={300}
                />
                <RSInput
                style={{marginTop:15}}
                defaultValue={800}
                />
                <StatusMenu style={{marginTop:15}} />
            </div>
            <div style={{marginTop:5, display:'flex', justifyContent:'space-around'}}>
                <Link to='/Inventory' style={styles.noUnderline}>
                <Button raised style={styles.button}>
                update bill
                </Button>
                </Link>
                <Link to='/..' style={styles.noUnderline}>
                <Button raised style={styles.button}>
                ok
                </Button>
                </Link>
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