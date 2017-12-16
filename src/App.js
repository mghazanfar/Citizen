import React, { Component } from 'react';
import Login from './img/slide3.jpg';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Owner from './login/Owner';
import Loginn from './login/login';
import Employee from './login/Employee';
import Shop from './inventory/Shop';
import Products from './inventory/Products';
import Inventory from './inventory/Inventory';
import Categories from './inventory/Categories';
import AddCategory from './inventory/AddCategory';
import './App.css';

import {
 Route,
 NavLink,
 Link,
 Switch,
 BrowserRouter as Router
} from 'react-router-dom';

const styles = {
  main: {
    position: 'relative',
    height: '100vh',
    backgroundImage: "url("+Login+")",
    backgroundSize: 'cover',
    },
  inner: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    height: 'inherit',
    },
  data: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'inherit',
    flexDirection: 'column',
  },
  noUnderline: {
    textDecoration: 'none',
  }
}

const Home = () => (
  <div style={styles.main}>
    <div style={styles.inner}>
      <div style={styles.data}>
      <Typography type="display3" gutterBottom style={{color:'white'}}>
        LOGIN AS
      </Typography>
      <Link to="/Owner" style={styles.noUnderline}>
      <Button raised component="span" style={{backgroundColor:'white', minWidth: 110}}>
      OWNER
      </Button>
      </Link>
      <Link to="/Employee" style={styles.noUnderline}>
      <Button raised component="span" style={{backgroundColor:'rgba(0,150,136,1)', marginTop: '1rem', color: 'white'}}>
      Employee
      </Button>
      </Link>
      </div>
    </div>
  </div>
)


const ModalGallery = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/Employee' component={Employee} />
      <Route path='/Owner' component={Owner} />
      <Route path='/Login'  component={Loginn}/>
      <Route path='/Shop'  component={Shop}/>
      <Route path='/ManageShop' component={Shop}/>
      <Route path='/Inventory'  component={Inventory}/>
      <Route path='/HandleProfit'  component={Shop}/>
      <Route path='/HandleExpenses'  component={Shop}/>
      <Route path='/ManageClaimStock'  component={Shop}/>
      <Route path='/ManageCompaniesBills'  component={Shop}/>
      <Route path='/Categories'  component={Categories}/>
      <Route path='/Products'  component={Products}/>
      <Route path='/AddProducts'  component={Shop}/>
      <Route path='/CreateBills'  component={Shop}/>
      <Route path='/ManageOrders'  component={Shop}/>
      <Route path='/AddCategory'  component={AddCategory}/>
    </Switch>
  </Router>
)

export default ModalGallery