import React, { Component } from 'react';
import './App.css';
import Login from './containers/views/pages/account/auth/Login'
import AdminDashboard from './containers/views/pages/admin/Dashboard'
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={Login}/>      
            <Route  path="/login" component={Login} />
            <Route  path="/admin" component={AdminDashboard} />      
          </div>
       </Router>
    );
  }
}

export default App;
