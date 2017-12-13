import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './App.css';
import Logo from "./img/logo-2D.png";
import Store from "./img/store.png";
import StoreMap from "./img/shopMap.png";
import Logo3D from "./img/logo-3d.svg";
import Gold from "./img/gold.png";
import Diamond from "./img/diamond.png";
import Watches from "./img/watches.png";
import Pearl from "./img/pearl.png";
import Sale from "./img/sale.png";
import Logo1 from './img/logo1-white.svg';
import Facebook from './img/facebook.svg';
import Google from './img/google.svg';
import Instagram from './img/instagram.svg';
import Pinterest from './img/pinterest.svg';
import Twitter from './img/twitter.svg';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Buttons from 'material-ui/Button';
import TwentyTwenty from 'react-twentytwenty';
import Scrollchor from 'react-scrollchor';
import {
 Route,
 NavLink
} from 'react-router-dom';


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    color:'white'
  },
});


export default class ItemName extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: '',
    currency: 'EUR',
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
      var style = {
     color: this.props.color,
     backgroundColor: this.props.bgColor,
     textAlign:'center',
   };
   if(this.props.divName=="Contact"){
    return (
      <div id="contact">
      <Container className="text-center">
        <div className="my-4 d-inline-block">
          <Scrollchor to="#top" animate={{offset: -50, duration: 800}}>
            <div className="logoMain"></div>
          </Scrollchor>
         </div>
        <Row className="justify-content-center">
          <Col xs="2" sm="3" md="4" className="bb-black mb-4">
          </Col>
          <Col xs="8" sm="5" md="4">
            <h3 className="text-black text-uppercase">Contact us</h3>
          </Col>
          <Col xs="2" sm="3" md="4" className="bb-black mb-4">
          </Col>
        </Row>
      </Container>
      <div className="px-0 mt-5" style={{backgroundImage: "url(" + this.props.img + ")", backgroundSize:'cover',}}>
      <Container>
        <Row className="justify-content-center pt-5" >
          <Col xs="12" md="6" className="py-5">
            <Form>
              <TextField
                label="Name*"
                placeholder="Please enter your good name"
                multiline
                className={styles.textField}
                margin="normal"
                fullWidth={true}
              />
              <TextField
                label="Phone*"
                placeholder="Please enter your Phone number"
                multiline
                className={styles.textField}
                margin="normal"
                fullWidth={true}
              />
              <TextField
                label="Address*"
                placeholder="Please write your address here"
                multiline
                className={styles.textField}
                margin="normal"
                fullWidth={true}
              />
              <TextField
                label="Visiting Through (e.g. Facebook, Friend, etc.)*"
                placeholder="Facebook"
                multiline
                className={styles.textField}
                margin="normal"
                fullWidth={true}
                style={{marginTop:23, textAlign:'left'}}
              />
            </Form>
          </Col>
          <Col xs="12" md="6" className="py-5">
            <Form style={{marginTop:22}}>
              <TextField
                id="date"
                label="Birthday*"
                type="date"
                defaultValue="2017-05-24"
                className={styles.textField}
                InputLabelProps={{
                shrink: true,
                }}
                fullWidth={true}
              />
              <TextField
                id="multiline-flexible"
                label="Multiline*"
                multiline
                fullWidth={true}
                value={this.state.multiline}
                onChange={this.handleChange('multiline')}
                style={styles.textField}
                rows={8}
                margin="normal"
              />

           </Form>
          </Col>
        </Row>
        <Row className="justify-content-end pb-5">
          <Col xs="3" className="text-right">
            <Buttons color="contrast">Submit</Buttons>
          </Col>
        </Row>
      </Container>
      </div>
      </div>
    );}
    else if(this.props.divName=="collections"){
     return (
       <div id="collections" style={{overflow:'hidden'}}>
         <Container className="text-center">
           <div className="my-4 d-inline-block">
             <Scrollchor to="#top" animate={{offset: -50, duration: 800}}>
               <div className="logoMain"></div>
             </Scrollchor>
            </div>
           <Row className="justify-content-center">
             <Col xs="2" sm="3" md="4" className="bb-black mb-4">
             </Col>
             <Col xs="8" sm="5" md="4">
               <h3 className="text-black text-uppercase">collections</h3>
             </Col>
             <Col xs="2" sm="3" md="4" className="bb-black mb-4">
             </Col>
           </Row>
           <Row>
            <Col xs="4" className="mt-5">
              <ul className="list-unstyled text-left pb-26">
                <li className="my-3"><h4><NavLink  to="/Bridal" className="navbar-brand text-uppercase mr--0 text-black">bridal jewellery</NavLink ></h4></li>
                <li className="my-3"><h4><NavLink  to="/Diamond" className="navbar-brand text-uppercase mr--0 text-black">diamond jewellery</NavLink ></h4></li>
                <li className="my-3"><h4><NavLink  to="/Engagements" className="navbar-brand text-uppercase mr--0 text-black">engagements</NavLink ></h4></li>
                <li className="my-3"><h4><NavLink  to="/Bangles" className="navbar-brand text-uppercase mr--0 text-black">bangles</NavLink ></h4></li>
                <li className="my-3"><h4><NavLink  to="/Rings" className="navbar-brand text-uppercase mr--0 text-black">rings</NavLink ></h4></li>
                <li className="my-3"><h4><NavLink  to="/Earings" className="navbar-brand text-uppercase mr--0 text-black">earings</NavLink ></h4></li>
                <li className="my-3"><h4><NavLink  to="/Pendents" className="navbar-brand text-uppercase mr--0 text-black">pendents</NavLink ></h4></li>
              </ul>
            </Col>
           </Row>
         </Container>
       </div>

     );}
     else if(this.props.divName=="About Us"){
      return (
      <div id="About Us" className="my-5">

        <Container className="text-center">
          <Row className="justify-content-center">
            <Col xs="12"><div className="w-100 h-100" style={style, {backgroundImage: "url(" + this.props.img + ")", backgroundSize:'cover', position:'absolute'}}></div>
              <div style={{position:'relative'}}>
                <img src={Logo3D} className="mt-4 mb-2" width="70px" height="110px" />
              </div>
              <Container>
                <Row className="justify-content-center">
                  <Col xs="3" md="4" className="bb-white mb-4">
                  </Col>
                  <Col xs="5" sm="4" md="3" lg="2">
                    <h3 className="text-white">About Us</h3>
                  </Col>
                  <Col xs="3" md="4" className="bb-white mb-4">
                  </Col>
                  <Col xs="12">
                    <p className="text-center text-white">The organization started in 1980 by Mr. RAZA Mahmood. RAZA Jewellers, a premier "Pakistan's" jewelry manufacturer, is a full service production company assisting fine jewelry retailers and designers for over a quarter century. Our heritage and reputation for quality makes us the single best source for all of your jewelry manufacturing needs.</p>
                  </Col>
                  <Col xs="12">
                    <Buttons color="contrast" className="mb-4"><NavLink  to="/about" className="text-white">Find out More</NavLink ></Buttons>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );}
     else if(this.props.divName=="Jewellery"){
      return (
    <div id="jewellery">
      <Container className="text-center">
        <div className="my-4 d-inline-block">
          <Scrollchor to="#top" animate={{offset: -50, duration: 800}}>
            <div className="logoMain"></div>
           </Scrollchor>
         </div>
        <Row className="justify-content-center">
          <Col xs="2" sm="3" md="4" className="bb-black mb-4">
          </Col>
          <Col xs="8" sm="5" sm="4" md="3">
            <h3 className="text-black text-uppercase">jewellery</h3>
          </Col>
          <Col xs="2" sm="3" md="4" className="bb-black mb-4">
          </Col>
        </Row>
        <Row className="justify-content-center my-5  no-gutters">
          <Col md="8" lg="5" className="">
            <a href="#"><img src={Gold} className="h-100 w-100 img-fluid" /></a>
          </Col>
          <Col lg="3" className="hidden-md-down">
            <Row>
              <a href="#"><img src={Diamond} className="h-100 w-100 img-fluid" /></a>
            </Row>
            <Row>
              <a href="#"><img src={Watches} className="w-100 img-fluid" /></a>
            </Row>
          </Col>
          <Col md="4" lg="4">
            <a href="#"><img src={Pearl} className="h-100 w-100 img-fluid" /></a>
          </Col>
          <Row md="12" lg="3" className="hidden-lg-up no-gutters">
            <Col xs="6">
              <a href="#"><img src={Diamond} className="h-75 w-100 img-fluid" /></a>
            </Col>
            <Col xs="6">
              <a href="#"><img src={Watches} className="w-100 h-75 img-fluid" /></a>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
      );}
      else if(this.props.divName=="Map"){
       return (
     <div id="Map">
       <Container className="text-center">
         <div className="my-4 d-inline-block">
           <Scrollchor to="#top" animate={{offset: -50, duration: 800}}>
             <div className="logoMain"></div>
           </Scrollchor>
          </div>
         <Row className="justify-content-center">
           <Col xs="2" sm="3" md="4" className="bb-black mb-4">
           </Col>
           <Col xs="8" sm="5" sm="4" md="3">
             <h3 className="text-black text-uppercase">Store</h3>
           </Col>
           <Col xs="2" sm="3" md="4" className="bb-black mb-4">
           </Col>
         </Row>
         <Row className="justify-content-center my-5  no-gutters">
           <Col xs="11">
            <TwentyTwenty>
              <img src={StoreMap} className="w-100" height="700px"/>
              <div className="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.448238253813!2d74.3409553150146!3d31.511846754716156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919045bc5d9b23d%3A0x748dbe5642a90987!2zUkFaQSBKZXdlbGxlcnMg2LHYttinINis24zZiNmE2LHYsg!5e0!3m2!1sen!2s!4v1507806747222" width="100%" height="700px" frameBorder="1" style={{border:0}} allowfullscreen />
              </div>
              <div className="sliderr" />
            </TwentyTwenty>
            </Col>
         </Row>
       </Container>
     </div>
       );}
     else if(this.props.divName=="Media"){
      return (
        <div id="media">
          <Container className="text-center">
            <div className="my-4 d-inline-block">
              <Scrollchor to="#top" animate={{offset: -50, duration: 800}}>
                <div className="logoMain"></div>
              </Scrollchor>
             </div>
            <Row className="justify-content-center">
              <Col xs="2" sm="3" md="4" className="bb-black mb-4">
              </Col>
              <Col xs="8" sm="5" md="4">
                <h3 className="text-black text-uppercase">media</h3>
              </Col>
              <Col xs="2" sm="3" md="4" className="bb-black mb-4">
              </Col>
            </Row>
          </Container>
          <div className="container-fluid">
            <Row className="justify-content-center">
              <Col xs="12" className="my-4">
                <img src={this.props.img} className="img-fluid"/>
              </Col>
            </Row>
          </div>
          <Container className="text-center" id="promotions">
            <div className="my-4 d-inline-block">
              <Scrollchor to="#top" animate={{offset: -50, duration: 800}}>
                <div className="logoMain"></div>
              </Scrollchor>
             </div>
            <Row className="justify-content-center">
              <Col xs="2" sm="3" md="4" className="bb-black mb-4">
              </Col>
              <Col xs="8" sm="5" sm="4" md="3">
                <h3 className="text-black text-uppercase">Promotions</h3>
              </Col>
              <Col xs="2" sm="3" md="4" className="bb-black mb-4">
              </Col>
              <Col xs="12" className="my-5">
                <img src={Sale} className="img-fluid"/>
              </Col>
            </Row>
          </Container>

        </div>

      );}
      else if(this.props.divName=="Footer"){
       return (
         <div id="footer">
           <div  className="py-sm-5 py-0" style={style}>
             <br/>
               <Container>
                 <Row className="justify-content-center">
                   <Col xs="10" md="4" className="bb-white px-0 mb-5">
                    <ul className="list-unstyled text-center text-md-left text-grey">

                      <li><h4>Opening Hours</h4></li>
                      <li>11:30am to 9:00pm, Sunday Close</li>

                      <li className="mt-5"><h4>Contact</h4></li>
                      <li><a href="https://www.gmail.com" target="_blank" className="text-grey">razajewellers1980@gmail.com</a></li>
                      <li>+92423578133, +923219888863, +923214669924.</li>
                    </ul>
                   </Col>
                   <Col xs="12" md="4" className="px-md-0">
                     <Scrollchor to="#top" animate={{offset: -50, duration: 800}}>
                        <img src={Logo3D} height="180px" width="180px" />
                        <img src={Logo1} className="mt-3 text-white" width="230px" />
                      </Scrollchor>
                   </Col>
                   <Col xs="10" md="4" className="bt-white-md bb-white px-0 mb-5 mt-5 mt-md-0">
                    <ul className="list-unstyled text-center text-md-right text-grey mt-5 mt-md-0">
                    <li className=""><h4>Go Social</h4></li>
                    <li className="hidden-md-up">
                      <div className="pt-3 d-flex justify-content-between w-100 ml-auto">
                        <a href="https://www.facebook.com/razajewellers"><img src={Facebook} className="size-logo"/></a>
                        <a href="https://www.plus.google.com/u/2/111738976259678807436"><img src={Google} className="size-logo"/></a>
                        <a href="https://www.instagram.com/razajewellers"><img src={Instagram} className="size-logo"/></a>
                        <a href="https://www.pinterest.com/razajewellers"><img src={Pinterest} className="size-logo"/></a>
                        <a href="https://www.twitter.com/razajewellers"><img src={Twitter} className="size-logo"/></a>
                      </div>
                    </li>
                    <li className="hidden-sm-down">
                      <div className="pt-3 d-flex justify-content-between w-75 ml-auto">
                        <a href="https://www.facebook.com/razajewellers"><img src={Facebook} className="size-logo"/></a>
                        <a href="https://www.plus.google.com/u/2/111738976259678807436"><img src={Google} className="size-logo"/></a>
                        <a href="https://www.instagram.com/razajewellers"><img src={Instagram} className="size-logo"/></a>
                        <a href="https://www.pinterest.com/razajewellers"><img src={Pinterest} className="size-logo"/></a>
                        <a href="https://www.twitter.com/razajewellers"><img src={Twitter} className="size-logo"/></a>
                      </div>
                    </li>

                      <li className="mt-3"><h4>Store</h4></li>
                      <Scrollchor to="#Map" animate={{offset: -50, duration: 800}} className="text-grey">
                        Hotel Sunfort Building 24-G, Liberty Market,Gulberg III, Lahore
                       </Scrollchor>
                      <li className="mt-3"></li>


                      </ul>
                   </Col>

                 </Row>
               </Container>
               </div>
            </div>
       );}
  }
}
