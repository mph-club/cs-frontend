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
        <Router basename={'/cs-dashboard'}>
          <div>
            <Route exact path={`${process.env.PUBLIC_URL}`} component={Login}/>      
            <Route  path={`${process.env.PUBLIC_URL}/login`} component={Login} /> 
            <Route exact path={`${process.env.PUBLIC_URL}/signup`} component={Signup} />
            <Route path={`${process.env.PUBLIC_URL}/verify/:email`} component={Verify} />
            <Route  path={`${process.env.PUBLIC_URL}/admin`} component={AdminDashboard} />      
          </div>
       </Router>
    );
  }
}

export default App;
