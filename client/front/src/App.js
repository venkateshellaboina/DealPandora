import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';
import './App.css';
import AddProduct from "./AddProduct"
import ShowProduct from "./ShowProduct"
import Checkout from "./Checkout"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <Switch>
          <Route  path="/home" exact component={ShowProduct} />
          <Route  path="/addproduct" component={AddProduct} />
          <Route path="/:productId" exact   render={(props) => <Checkout {...props}/>} />
         
        </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
