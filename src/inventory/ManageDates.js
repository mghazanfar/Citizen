import React from 'react';
import List, { ListItem, ListItemSecondaryAction, ListItemText, ListSubheader } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Modal from './ModalBillDetail';
import {DatePicker} from 'material-ui-pickers';

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
    };
    componentWillMount(){
        let url = window.location.href.split('?shop=')[1];
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
                if (bills.statusCode !== 200) {
                    alert(bills.body.error.message);
                } else {
                    if(bills.body.bills.length <1) {
                        alert('No Record Found');
                    }
                    this.setState({
                        orders: bills.body.bills
                    });
                }
            } else {
                alert('Could not reach service');
            }
        });
    }

    setDate = event => {
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
                        if (bills.statusCode !== 200) {
                            alert(bills.body.error.message);
                        } else {
                            if (bills.body.bills.length < 1) {
                                alert('No Record Found');
                            }
                            this.setState({
                                orders: bills.body.bills
                            });
                        }
                    } else {
                        alert('Could not reach service');
                    }
                });
        }
    };


    render() {
      return (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
            <Typography type="title" gutterBottom style={{alignSelf:'flex-start', color:'white', marginTop:10}} >{<DatePicker onChange={this.setDate} style={{marginLeft: 0}}/>}</Typography>
            <div style={{display:'flex', width:'inherit'}}>
                <Paper elevation={24} style={{maxHeight:400, overflow:'auto', width:'70%'}}>
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
                        OnShop for customers Expenses: On drinks: 200 <br/> onDrinks: 200
                    </Typography>
                    <Typography type="body 2" gutterBottom>
                        Amount recieved: 20000
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
          
export default ManageDates;
