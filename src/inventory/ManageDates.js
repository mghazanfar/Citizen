import React from 'react';
import List, { ListItem, ListItemSecondaryAction, ListItemText, ListSubheader } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Modal from './ModalBillDetail';
import { DatePicker } from 'material-ui-pickers';


const styles = {
  listItem: {
    height:100,
  },
  };
  
class ManageDates extends React.Component {
  
    render() {
  
      return (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'95%' }}>
            <Typography type="title" gutterBottom style={{alignSelf:'flex-start', color:'white', marginTop:10}} >January 12, 2018</Typography>
            <Paper elevation={20} style={{padding: 20, alignSelf: 'flex-start', marginBottom: 16 }}>
                Select Date:
                <DatePicker style={{marginLeft: 10}}/>
            </Paper>
            <div style={{display:'flex', width:'inherit'}}>
                <Paper elevation={24} style={{maxHeight:400, overflow:'auto', width:'70%'}}>
                <List>
                    {this.props.data.map(value => (
                    <ListItem key={value} dense style={styles.listItem} divider button={false} >
                    <Typography type="title" gutterBottom>
                        102.
                    </Typography>
                        <ListItemText primary={<Typography type="title" gutterBottom style={{color:'black'}}>Usman</Typography>} secondary={<span>0333-4928475
                        <Typography type="caption">
                        Rs. 800
                        </Typography></span>}/>
                        <ListItemSecondaryAction />
                        <Modal />
                        <Button color="accent">
                        DELETE
                        </Button>
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