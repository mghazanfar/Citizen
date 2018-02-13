import React from 'react';
import { withStyles } from 'material-ui/styles';
import Background from '../img/receipt.jpg';
import Citizen from '../img/logo.jpeg';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import BilledProductPanel from './BilledProductPanel';
import Menu from './Menu';
import './clickables.css';

const styles = {
    left: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        minHeight:'100vh',
    },
    right: {
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        minHeight:'100vh',
    },
    container: {
        height:'inherit',
        background: 'rgba(12, 134, 12, 0.9)',
    },
    root: {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
    },
    rightInner: {
        minHeight: '100vh',
        background: '-webkit-linear-gradient(-125deg, rgba(208,0,240,0.45), rgba(230,0,128,0.45), rgba(255,0,0,0.45))',
        display: 'flex',
        alignItems:'center',
        flexDirection:'column',
        textAlign:'left',
    },
    button: {
        color:'white',
        backgroundColor:'black',
        marginTop:'4rem',
    },
    headline: {
        textDecoration: 'none',
        color: 'white',
    },
    avatar: {
        width:70,
        height:70,
    },
    noUnderline: {
        textDecoration: 'none',
    }
};

class print extends React.Component{

    render() {
        return (
            <div className='print-only'>
                <div style={{
                    width: '100%',
                    height: '100vh',
                    background: '-webkit-linear-gradient(-125deg, #D000F0, #E60080, #FF0000)',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <img src={Citizen} height={150} width={150} alt="Citizen"/>
                    <Paper elevation={24}
                           style={{maxHeight: 700, overflow: 'auto', width: '96%', padding: 10, height: 'inherit'}}>
                        <TextField
                            id="search"
                            label="Customer name"
                            type="search"
                            margin="normal"
                            style={{width: '100%'}}
                        />
                        <TextField
                            id="search"
                            label="Phone number"
                            type="search"
                            margin="normal"
                            style={{width: '100%'}}
                        />
                        <BilledProductPanel print={true} data={'DataofSelectedItems'}/>
                        <TextField
                            id="search"
                            label="Add discounts"
                            type="search"
                            margin="normal"
                            style={{width: '100%'}}
                        />
                        <TextField
                            id="search"
                            label="Total Payment"
                            type="search"
                            margin="normal"
                            style={{width: '100%'}}
                        />
                        <Menu/>
                    </Paper>
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.65)',
                        display: 'flex',
                        width: '100%',
                        height: 100,
                        marginTop: 'auto',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{width: '30%', fontSize: 13, marginTop: 'auto', marginBottom: 'auto'}}>
                            <b>Address:</b> Main G.T. Road, Ravi Toll Plaza, Lahore. <br/>
                            <b>Phone:</b> 0324-4417414 , 0323-9999333 <br/>
                            <b>Email:</b> nabeelsameer950@gmail.com
                        </div>
                        <div style={{width: '25%', fontSize: 13, marginTop: 'auto', marginBottom: 'auto'}}>
                            <b>NOTE:</b> <br/>
                            Booked furniture will not be handed over without showing bill. Original reciept is required
                            in order to recieve furniture.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(print);