import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormHelper from '../../../../../account/signup/helper/form'
import RequestHelper from '../../../../../account/signup/helper/request';
import Presenter from '../../../../../account/signup/presenter';
import { connect } from "react-redux";
import { compose } from 'redux'
import { SignupStyle,NLabel as Label } from './Styles/SignupStyle';
import ConfirmationDialog from '../../../dialogs/confirmation';

class Signup extends Component {

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
        phone:{
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
         error:false,
         success:false
      }

      this.__Signup__ = this.__Signup__.bind(this)
      this.__TogglePostRequest__ = this.__TogglePostRequest__.bind(this)
      this.__OnSignupSucceed__= this.__OnSignupSucceed__.bind(this)
      this.__OnSignupFailed__= this.__OnSignupFailed__.bind(this)
      this.__signin__= this.__signin__.bind(this)

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

    
    __Signup__(event){
      event.preventDefault();
      this.__TogglePostRequest__();            
      FormHelper.CleanError(this)
      if(FormHelper.ValidateForm(this)){
        Presenter.SignUp(RequestHelper.SignUp(this.__OnSignupSucceed__,this.__OnSignupFailed__,this.state,this.props,this))
      }else{
        setTimeout(function() {this.__TogglePostRequest__()}.bind(this),400);  
        return false;
      }

    }
    
    __OnSignupSucceed__(response){
        this.setState({ 
            success:true
        });
        this.__TogglePostRequest__();
    }

    __OnSignupFailed__(response){
      this.setState({
        error:response,
        loading:!this.state.loading
      })
    }
    
    __signin__(){
        this.props.history.push("/")
    }
    
    handleConfirmClose = value => {
        this.setState({ 
            success:false
        });
        this.props.history.push("/verify/"+this.state.email.value);
    };

  render() {
  const { classes } = this.props;
  const { loading } = this.state;
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountIcon />
          </Avatar>
          <Typography variant="headline">Sign up</Typography>
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
                {this.state.email.error?<Label >{'*'+this.state.email.message}</Label>:''} 
            </FormControl>            
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Input
                name="phone"
                type="phone"
                id="phone"
                onChange={(event)=> this.setState(
                            {
                              phone:{
                                ...this.state.phone,
                                value : event.target.value,
                              }
                            }
                          )}
              />
            {this.state.phone.error?<Label >{'*'+this.state.phone.message}</Label>:''}
            </FormControl>           
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
            {this.state.password.error?<Label >{'*'+this.state.password.message}</Label>:''}
            </FormControl>
            <Button
              disabled={loading}
              variant="raised"
              color="primary"
              className={classes.submit}
              onClick={this.__Signup__}                  
            >
            Sign up              
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
            <Button
              variant="raised"
              color="secondary"
              className={classes.submit}
              onClick={this.__signin__}                  
            >
            Sign in
            </Button>
            
          </form>
            {this.state.success ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.success}
                  onCancel={this.handleConfirmClose}
                  onOk={this.handleConfirmClose}
                  value=""
                  is_ok={true}
                  ok_label="Ok"
                  is_cancel={false}                  
                  cancel_label="Cancel"
                  message='Account has been created successfully, verification code has been sent to your email, please verify your account..'
                  get_value={false}
                />
            : ''}
        </Paper>
      </main>
    </React.Fragment>
  )};
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
      SessionReducer: state.SessionReducer,
      UnConfirmedReducer: state.UnConfirmedReducer,
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
                withStyles(SignupStyle),
                connect(mapStateToProps, mapDispatchToProps)
                )(Signup);