import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';
import Slick from './SlickCarousel';
import ItemName from './ItemName';
import About from './img/cover.png';
import Strips from './img/strips.png';
import Soon from './img/SOON.png';
import Store from './img/store.png';




class Root extends Component {
  render() {
    return (
      <div className="App" id="top">

        <ItemName  color="black" bgColor="white" divName="Contact" img={Store}/>

      </div>
    );
  }
}

export default Root;
