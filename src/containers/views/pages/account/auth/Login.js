import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormHelper from '../../../../../account/login/helper/form'
import RequestHelper from '../../../../../account/login/helper/request';
import Presenter from '../../../../../account/login/presenter';
import { connect } from "react-redux";
import { compose } from 'redux'
import { LoginStyle,NLabel as Label } from './Styles/LoginStyle';

class Login extends Component {

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
        result:{
          error:false,
          message:"",
        },
         loading:false,
         error:false
      }

      this.__Login__ = this.__Login__.bind(this)
      this.__TogglePostRequest__ = this.__TogglePostRequest__.bind(this)
      this.__OnLoginSucceed__= this.__OnLoginSucceed__.bind(this)
      this.__OnLoginFailed__= this.__OnLoginFailed__.bind(this)

    }

    /*
     * __SessionCheck__() to determine User is logged in or no.
     * It redirects user to Welcome if already logged in.
     */
    
    __SessionCheck__(){
      
        if(this.props.SessionReducer.auth){
          this.props.history.push("/admin/vehicles")
        }
      
    }
    
    __TogglePostRequest__(){

      this.setState({
        loading:!this.state.loading
      })

    }

    
    __Login__(event){
      event.preventDefault();
      this.__TogglePostRequest__();            
      FormHelper.CleanError(this)
      if(FormHelper.ValidateForm(this)){
        Presenter.Auth(RequestHelper.Auth(this.__OnLoginSucceed__,this.__OnLoginFailed__,this.state,this.props,this))
      }else{
        setTimeout(function() {this.__TogglePostRequest__()}.bind(this),400);  
        return false;
      }

    }
    
    __OnLoginSucceed__(response){
        this.props.history.push("/admin/vehicles")
        this.__TogglePostRequest__();
    }

    __OnLoginFailed__(response){
      this.setState({
        error:response.message,
        loading:!this.state.loading
      })
    }

  render() {
  const { classes } = this.props;
  const { loading } = this.state;
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="headline">Sign in</Typography>
          {this.state.error?<Label >{this.state.error}</Label>:''}
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input 
                type="email"
                id="email" 
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event)=> this.setState(
                {
                  email:{
                    ...this.state.email,
                    value : event.target.value,
                  }
                }
                )} />
            </FormControl>
                     {this.state.email.error?<Label >{'*'+this.state.email.message}</Label>:''} 
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event)=> this.setState(
                            {
                              password:{
                                ...this.state.password,
                                value : event.target.value,
                              }
                            }
                          )}
              />
            </FormControl>
            {this.state.password.error?<Label >{'*'+this.state.password.message}</Label>:''}
            <Button
              disabled={loading}
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
              onClick={this.__Login__}                  
            >
         
              Sign in
               {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
            
          </form>
        </Paper>
      </main>
    </React.Fragment>
  )};
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
      SessionReducer: state.SessionReducer
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        RunRedux: (data) => {
            dispatch(data);
        },
    };
};

export default compose(
                withStyles(LoginStyle),
                connect(mapStateToProps, mapDispatchToProps)
                )(Login);