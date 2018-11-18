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

class Payment extends Component{
    constructor(props){
        super(props);
        }
        render()
        {
            return(
                <div>
                <h1>order placed</h1>
                </div>
            )
        }
}
export default Payment;