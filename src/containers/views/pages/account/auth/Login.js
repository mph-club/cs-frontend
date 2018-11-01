import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { connect } from "react-redux";
import { CognitoState, Login } from 'react-cognito';

class LoginContainer extends React.Component {

  constructor(props){

    super(props)
      
    // Check user authentication initally.
    this.__SessionCheck__()
      
    this.state = {
        email:{
            value:"",
            error:false,
            message:"",
        },
        password:{
            value:"",
            error:false,
            message:"",
        },
        loading:false
    }
}

    /*
     * __SessionCheck__() to determine User is logged in or no.
     * It redirects user to Welcome if already logged in.
     */
    
    __SessionCheck__(){
        if(this.props.state === CognitoState.LOGGED_IN){
          this.props.history.push("/admin/vehicles")
        }
      
    }
    
  render() {
    if(this.props.state === CognitoState.LOGGED_IN){
        this.props.history.push("/admin/vehicles")
        return ('');
    }else{
        return (
            <Login>
                <LoginForm />
            </Login>
        );
    }
  }
}

LoginContainer.propTypes = {
  user: PropTypes.object,
  attributes: PropTypes.object,
  state: PropTypes.string,
};

const mapStateToProps = state => ({
  state: state.cognito.state,
  user: state.cognito.user,
  attributes: state.cognito.attributes,
});

export default connect(mapStateToProps, null)(LoginContainer);