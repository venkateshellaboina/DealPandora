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

import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';

class ShowProduct extends Component {
    constructor(props) {
      super(props);
      this.state = {
        infoArray: []
      }
  
    }
    componentDidMount() {
        this.getInfo();
      }
    
    
      getInfo = () => {
        fetch("http://localhost:5000/getProducts")
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
        <div style={{ backgroundColor: "#f3dfc1"}}>
        <h1>Deal Pandora</h1>
        <div style={{ marginTop: "3vw", width: "100w", marginLeft: "10vw",marginRight: "10vw" }}>
          {this.state && this.state.infoArray.length > 0 && this.state.infoArray.map(infarr =>
            <div style={{ background: '#ECECEC', padding: '30px',marginBottom:"2vw" }}>
              <Card
                title={infarr.productId}
                style={{ width: "60vw" }}
              >
              
                <p>{infarr.productName}</p>
                <p>{infarr.productCategory}</p>
                <p>{infarr.productSpecification}</p>
                <p>{infarr.productPrice}</p>
                <Link to={`${infarr.productId}`} ><Button>add</Button></Link> 

                <br></br>
              </Card>
              
            </div>
          )}
         
        </div>
        </div>
      );
  }    

}

export default ShowProduct;