import React from 'react';
import List, { ListItem, ListItemSecondaryAction, ListItemText, ListSubheader } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Modal from './ModalBillDetail';
import {DatePicker} from 'material-ui-pickers';
import { CircularProgress } from 'material-ui/Progress';

import server from "../constants";
import request from "superagent/superagent";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const styles = {
  listItem: {
    height:100,
  },
  };

class ManageDates extends React.Component {
    state = {
        orders: [],
        shop: null,
        drinks: 0,
        shopExp: 0,
        others: [],
        amountReceivedToday: 0,
        loading: true,
    };
    componentWillMount(){
        let url = window.location.href.split('shop=')[1];
        let accessToken = cookies.get('accessToken').accessToken;
        this.setState({
            shop: url
        });
        let today = new Date();
        let day =today.getDate();
        let month = today.getMonth()+1;
        let year = today.getFullYear();
        request.get(`${server.path}/api/Bills/bills?shopId=${url}&day=${day}&month=${month}&year=${year}&access_token=${accessToken}`)
        .end((err, bills) => {
          console.log(bills);
            if(bills) {
                this.setState({ loading: false});
                if (bills.statusCode !== 200) {
                    alert(bills.body.error.message);
                } else {
                    if(bills.body.bills.length <1) {
                        alert('No Record Found');
                    }
                    this.setState({
                        orders: bills.body.bills
                    });
                    if(bills.body.bills.length > 0){
                        let amount = 0;
                        bills.body.bills.map(value => {
                            amount += parseInt(value.payment);
                        });
                        this.setState({
                            amountReceivedToday: amount
                        });
                    }
                }
            } else {
                alert('Could not reach service');
            }
        });
        request.get(`${server.path}/api/DailyExpenses?filter=%7B%22where%22%3A%7B%22shopId%22%3A%22${url}%22%2C%22day%22%3A%22${day}%22%2C%22month%22%3A%22${month}%22%2C%22year%22%3A%22${year}%22%7D%7D&access_token=${accessToken}`)
            .end((err, res) => {
                if(res) {
                    console.log(res);
                    if(res.statusCode === 200){
                        if(res.body.length > 0) {
                            this.setState({
                                drinks: res.body[0].drinks,
                                shopExp: res.body[0].shopExp,
                                others: res.body[0].others,
                            });
                        }
                    } else {
                        alert(res.body.error.message);
                    }
                } else {
                    alert('Service Unreachable');
                }
            });
    }

    setDate = event => {
        this.setState({ loading: true});
        let date = event._d.toLocaleDateString().split('/');
        console.log(date);
        let accessToken = cookies.get('accessToken');
        if(accessToken === undefined){
            window.location.href = '/';
        } else {
            request.get(`${server.path}/api/Bills/bills?shopId=${this.state.shop}&day=${date[1]}&month=${date[0]}&year=${date[2]}&access_token=${accessToken.accessToken}`)
                .end((err, bills) => {
                    console.log(bills);
                    if (bills) {
                        this.setState({ loading: false});
                        if (bills.statusCode !== 200) {
                            alert(bills.body.error.message);
                        } else {
                            if (bills.body.bills.length < 1) {
                                alert('No Record Found');
                            }
                            this.setState({
                                orders: bills.body.bills
                            });
                            if(bills.body.bills.length > 0){
                                let amount = 0;
                                bills.body.bills.map(value => {
                                    amount += value.payment;
                                });
                                this.setState({
                                    amountReceivedToday: amount
                                });
                            }
                        }
                    } else {
                        alert('Could not reach service');
                    }
                });
        }
        request.get(`${server.path}/api/DailyExpenses?filter=%7B%22where%22%3A%7B%22shopId%22%3A%22${this.state.shop}%22%2C%22day%22%3A%22${date[1]}%22%2C%22month%22%3A%22${date[0]}%22%2C%22year%22%3A%22${date[2]}%22%7D%7D&access_token=${accessToken.accessToken}`)
            .end((err, res) => {
                if(res) {
                    console.log(res);
                    if(res.statusCode === 200){
                        if(res.body.length > 0) {
                            this.setState({
                                drinks: res.body[0].drinks,
                                shopExp: res.body[0].shopExp,
                                others: res.body[0].others,
                            });
                        }
                    } else {
                        alert(res.body.error.message);
                    }
                } else {
                    alert('Service Unreachable');
                }
            });
    };


    render() {
        if(this.state.loading === true){
            return (<CircularProgress/>);
        } else {
            return (
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
                    <Typography type="title" gutterBottom style={{alignSelf:'flex-start', color:'white', marginTop:10}} >
                        </Typography>
                    <div style={{display:'flex', width:'inherit'}}>
                        <Paper elevation={24} style={{maxHeight:400, overflow:'auto', width:'70%'}}>
                            {<DatePicker onChange={this.setDate} style={{color: 'white'}}/>}
                            <List>
                                {this.state.orders.map((value, index) => (
                                    <ListItem key={value} dense style={styles.listItem} divider button={false} >
                                        <Typography type="title" gutterBottom>
                                            {++index}
                                        </Typography>
                                        <ListItemText primary={<Typography type="title" gutterBottom style={{color:'black'}}>{value.customerName}</Typography>} secondary={<span>{value.phoneNumber}
                                            <Typography type="caption">
                            Rs. {value.payment}
                        </Typography></span>}/>
                                        <ListItemSecondaryAction />
                                        <Modal order={value} />
                                        {/*<Button color="accent">
                        DELETE
                        </Button>*/}
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                        <Paper elevation={24} style={{ maxHeight: 400, height:'100%', overflow:'auto', width:'30%', marginLeft:'2rem'}}>
                            <List subheader={<ListSubheader>Today's Expenses:</ListSubheader>}>
                                <ListItem key={'today'} dense style={styles.listItem} button={false} >
                                    <Typography type="body 2" gutterBottom>
                                        OnShop for customers Expenses: On drinks: {this.state.drinks} <br/> Shop: ${this.state.shopExp}
                                    </Typography>
                                    <Typography type="body 2" gutterBottom>
                                        Amount recieved: {this.state.amountReceivedToday}
                                    </Typography>
                                    <ListItemSecondaryAction />
                                </ListItem>
                            </List>
                        </Paper>
                    </div>
                </div>
            );
        }
    }
  }
          
export default ManageDates;
