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
import { LoginStyle,NLabel as Label } from './Styles/LoginStyle';

class LoginForm extends Component {

  constructor(props){

      super(props)
      
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
         loading:false
      }

      this.__TogglePostRequest__ = this.__TogglePostRequest__.bind(this)
      this.__Login__ = this.__Login__.bind(this)

    }

    __TogglePostRequest__(){

      this.setState({
        loading:!this.state.loading
      })

    }
    
    
    __Login__(event){
      
      event.preventDefault();
      setTimeout(function() {this.__TogglePostRequest__()}.bind(this),400);            
      FormHelper.CleanError(this)
      if(FormHelper.ValidateForm(this)){
                
        this.props.onSubmit(this.state.email.value, this.state.password.value);
        this.__TogglePostRequest__();

      }else{

        this.__TogglePostRequest__()

      }

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
          {this.props.error?<Label >{this.props.error}</Label>:''}
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

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  clearCache: PropTypes.func,
  username: PropTypes.string,
  error: PropTypes.string,
  email: PropTypes.string,
};

export default withStyles(LoginStyle) (LoginForm);