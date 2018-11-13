import React, { Component } from 'react';
import './App.css';
import Login from './containers/views/pages/account/auth/Login'
import Signup from './containers/views/pages/account/auth/Signup'
import Verify from './containers/views/pages/account/auth/Verify'
import AdminDashboard from './containers/views/pages/admin/Dashboard'
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={Login}/>      
            <Route  path="/login" component={Login} /> 
            <Route exact path="/signup" component={Signup} />
            <Route path="/verify/:email" component={Verify} />
            <Route  path="/admin" component={AdminDashboard} />      
          </div>
       </Router>
    );
  }
}

export default App;
