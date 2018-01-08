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

import request from "../../node_modules/superagent/superagent";
import server from "../constants";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class ResponsiveDialog extends React.Component<props, {}> {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        var accessToken = cookies.get('accessToken').accessToken;
        console.log(accessToken);
        if(accessToken == undefined) {
            window.location.href = '/'
        }
        var url = server.path+'/api/Products/'+this.props.id.id+'?access_token='+accessToken;
        request.delete(url)
            .end((err, res) => {
                if(res.status == 401) {
                    alert(res.body.error.message);
                } else {
                    this.setState({ open: true });
                    window.location.href = '/Products';
                }
            });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { fullScreen } = this.props;

        return (
            <div style={{display:'flex', justifyContent:'center'}}>
                <Button color="accent" onClick={this.handleClickOpen}>
                    Delete
                </Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    <div style={{backgroundColor:'#424242'}}>
                        <DialogTitle><span  style={{color:'white'}}>Are you sure?</span></DialogTitle>
                        <DialogContent>
                            <DialogContentText style={{color:'white'}}>
                                Are you sure you want to delete your product?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions><Button onClick={this.handleRequestClose} color="primary">
                            YES
                        </Button><Button onClick={this.handleRequestClose} color="primary">
                            NO
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