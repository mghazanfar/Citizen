import React from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Menu, { MenuItem } from 'material-ui/Menu';

import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class StatusMenu extends React.Component<props, {}> {

    state = {
        open: false,
        status: this.props.status
    };
    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = (event, status) => {
        let url = window.location.href;
        if(url.search('status=') === -1){
            url += `&status=${status}`;
            window.history.pushState("index.html", "Title", url);
            this.setState({
                status: 'Status'
            });
        } else {
            url = `${url.split('status=')[0]}status=${status}`;
            window.history.pushState('index.html', 'title', url);
            this.setState({
                status: status,
                open: false
            });
            console.log(url);
        }

    };

    render() {
        return (
            <Paper elevation={12} style={{marginBottom:'1rem', alignSelf:'flex-end', width:'max-content', marginTop:'1rem'}} >
                <Button
                    aria-owns={this.state.open ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    {this.state.status}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    <MenuItem onClick={event => this.handleRequestClose(event, 'Paid')}>Paid</MenuItem>
                    <MenuItem onClick={event => this.handleRequestClose(event, 'Unpaid')}>Unpaid</MenuItem>
                    <MenuItem onClick={event => this.handleRequestClose(event, 'Partial')}>Partial</MenuItem>
                </Menu>
            </Paper>
        )
    }
}
export default StatusMenu;