import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import { Row,Col,Form, Icon, Input, Button, Checkbox, Card } from 'antd';

class Checkout extends Component{
    constructor(props){
        super(props);
        this.state = {
            infoArray: []
          }
      
        }
        componentDidMount() {
            this.getInfo();
          }
        
        
          getInfo = () => {
            fetch("http://localhost:5000/getOffers",{
                method:"POST",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json'
                  },
                  body: JSON.stringify({
                      productId: this.props.match.params.productId
                  })
            })
              .then((response) => {
                return response.json();
              })
              .then((infarr) => {
                this.setState({
                  infoArray: infarr
                })
              })
              .catch((err) => {
                console.log(err)
              })
          }


    render(){
        return(
            <div>
                <Row>
                <Col span={18}>
                <div>
                 {this.state && this.state.infoArray.length > 0 && this.state.infoArray.map(infarr =>
                 <div style={{backgroundColor:"#368f8b",margin:"5vw",width:"70vw"}}>
                <Card
                title={infarr.productId}
                style={{ width: "60vw" }}
              >
                  <h1>Bank:{infarr.bankId}</h1>
                 <h1>Discount Price:{infarr.productDiscountPrice}</h1>
                 <Button>pay</Button>
              </Card>
              </div>
            
    
                 ) 
                }
                 </div>
                 </Col>
                 <Col span={6}>
                   <Route path={}
                 </Col>
                 </Row>
                

            </div>
        )
    }
}
export default Checkout;