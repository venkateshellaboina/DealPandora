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

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
        productId: '',
        productName: '',
        productCategory:'',
        productSpecification :'',
        productPrice : ''
    }

  }

//   componentDidMount() {
//     this.getInfo();
//   }


//   getInfo = () => {
//     fetch("http://localhost:5000/getInfo")
//       .then((response) => {
//         return response.json();
//       })
//       .then((infarr) => {
//         this.setState({
//           infoArray: infarr
//         })
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

  modify = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    fetch("http://localhost:5000/addProducts", {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Accept': 'Application/json'
      },
      body: JSON.stringify(this.state)

    })
      .then((response) => {
        if (response.status === 200) {
          console.log("sent to db");
         
        }
        else
          console.log("some error");
      })
      .catch(err => {
        console.log('error');
      })


  }
 


 

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ backgroundColor: "white", height: "500vw", width: "100%" }}>

        <Form style={{ paddingLeft: "30vw", paddingTop: "20vw" }} onSubmit={(e) => { this.handleSubmit(e) }} className="login-form">

          <FormItem >
            {getFieldDecorator('productId', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input style={{ width: "30vw" }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="productId" id="productId" value={this.state.productId} onChange={(e) => { this.modify(e) }} placeholder="productId" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('productName', {
              rules: [{ required: true, message: 'Please input your productName!' }],
            })(
              <Input style={{ width: "30vw" }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="productName" id="productName" value={this.state.productName} onChange={(e) => { this.modify(e) }} placeholder="productName" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('productCategory', {
              rules: [{ required: true, message: 'Please input your productCategory!' }],
            })(
              <Input style={{ width: "30vw" }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="productCategory" id="productCategory" value={this.state.productCategory} onChange={(e) => { this.modify(e) }} placeholder="productCategory" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('productSpecification', {
              rules: [{ required: true, message: 'Please input your productSpecification!' }],
            })(
              <Input style={{ width: "30vw" }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="productSpecification" id="productSpecification" value={this.state.productSpecification} onChange={(e) => { this.modify(e) }} placeholder="productSpecification" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('productPrice', {
              rules: [{ required: true, message: 'Please input your productPrice!' }],
            })(
              <Input style={{ width: "30vw" }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="productPrice" id="productPrice" value={this.state.productPrice} onChange={(e) => { this.modify(e) }} placeholder="productPrice" />
            )}
          </FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            submit
          </Button>

        </Form>
       
      </div>

    );
  }
}



export default Form.create()(AddProduct);
