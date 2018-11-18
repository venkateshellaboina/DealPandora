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
            infoArray: [],
            bankid:'',
            bankDetails:[],
            flag:false
        }

    }
    componentDidMount() {
        this.getInfo();
    }
    modify = (e) => {

        this.setState({
          [e.target.name]: e.target.value
        })
      }

    getPros = () => {
        fetch("http://localhost:5000/getBankProducts",
        {
            method:"POST",
            headers: {
            'Content-Type': 'Application/json',
            'Accept': 'Application/json'
          },
          body: JSON.stringify({
              bankId:  this.state.bankid
          })
        })  
            .then((response) => {
                return response.json();
            })
            .then((bankarr) => {
                this.setState({
                    bankDetails: bankarr,
                    flag: true
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getInfo=() =>{
        fetch("http://localhost:5000/getProducts")
        .then((response) => {
            return response.json();
        })
        .then((infarr) => {
            this.setState({
                infoArray: infarr,
                flag: false
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        
        return (


            <div style={{ backgroundColor: "#f3dfc1" }}>
                <h1>Deal Pandora</h1>
                <Form  onSubmit={(e) => { this.handleSubmit(e) }} className="login-form">

                    <FormItem >
                        {getFieldDecorator('product to search', {
                            rules: [{ required: true, message: 'Please input your bank id!' }],
                        })(
                            <Input style={{ width: "30vw" }} prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} name="bankid" id="bankid" value={this.state.bankid} onChange={(e) => { this.modify(e) }} placeholder="enter bank id" />
                        )}
                    </FormItem>
                    <Button onClick={(e)=>{this.getPros(e)}}>Submit</Button>
                </Form>
                {this.state && !this.state.flag &&
                <div style={{ marginTop: "3vw", width: "100w", marginLeft: "10vw", marginRight: "10vw" }}>
                    {this.state && this.state.infoArray.length > 0 && this.state.infoArray.map(infarr =>
                        <div style={{ background: '#ECECEC', padding: '30px', marginBottom: "2vw" }}>
                            <Card
                                title={infarr.productName}
                                style={{ width: "60vw" }}
                            >

                                <p>{infarr.productId}</p>
                                <p>{infarr.productCategory}</p>
                                <p>{infarr.productSpecification}</p>
                                <p>{infarr.productPrice}</p>
                                <Link to={`${infarr.productId}`} ><Button>add</Button></Link>

                                <br></br>
                            </Card>

                        </div>
                    )}

                </div>
                }
                {this.state && this.state.flag && 
                  this.state.bankDetails.map((bankarr)=>
                      <div style={{backgroundColor:"#b9cdda",padding:"5vw",border:"2px",borderColor:"Black"}}>
                          <Card
                                title={bankarr.productId}
                                style={{ width: "60vw" }}
                            >

                            <Link to={`${bankarr.productId}`} ><Button>add</Button></Link>
                                <br></br>
                            </Card>

                      </div>
                  )
                }
            </div>
        );
    }

}

export default Form.create()(ShowProduct);