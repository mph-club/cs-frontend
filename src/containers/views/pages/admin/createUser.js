import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormHelper from '../../../../account/createuser/helper/form'
import RequestHelper from '../../../../account/createuser/helper/request';
import Presenter from '../../../../account/createuser/presenter';
import { connect } from "react-redux";
import { compose } from 'redux'
import {NTitle, Nstyles,NLabel as Label } from './Styles/CreateUserStyle';
import Grid from '@material-ui/core/Grid';
import ConfirmationDialog from '../../dialogs/confirmation';


class CreateUser extends Component {

  constructor(props){
      super(props)
      
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

      this.__CreateUser__ = this.__CreateUser__.bind(this)
      this.__TogglePostRequest__ = this.__TogglePostRequest__.bind(this)
      this.__OnCreateUserSucceed__= this.__OnCreateUserSucceed__.bind(this)
      this.__OnCreateUserFailed__= this.__OnCreateUserFailed__.bind(this)
      this.__clear__= this.__clear__.bind(this)

    }

    __TogglePostRequest__(){

      this.setState({
        loading:!this.state.loading
      })

    }

    
    __CreateUser__(event){
      event.preventDefault();
      this.__TogglePostRequest__();            
      FormHelper.CleanError(this)
      if(FormHelper.ValidateForm(this)){
        Presenter.SignUp(RequestHelper.SignUp(this.__OnCreateUserSucceed__,this.__OnCreateUserFailed__,this.state,this.props,this))
      }else{
        setTimeout(function() {this.__TogglePostRequest__()}.bind(this),400);  
        return false;
      }

    }
    
    __OnCreateUserSucceed__(response){
        this.setState({ 
            success:true
        });
        this.__TogglePostRequest__();
    }

    __OnCreateUserFailed__(response){
      this.setState({
        error:response,
        loading:!this.state.loading
      })
    }
    
    __clear__(){
        document.getElementsByName('create_user')[0].email.value = '';
        document.getElementsByName('create_user')[0].phone.value = '';
        document.getElementsByName('create_user')[0].password.value = '';
        
        this.setState({ 
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
        });
    }
    
    handleConfirmClose = value => {
        this.__clear__();
    };

  render() {
  const { classes } = this.props;
  const { loading } = this.state;
  return (
        <div>
        <NTitle> Create User</NTitle>
        <Paper className={classes.root}>
          <Grid container justify="center">
            <Grid item lg={10}>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>&nbsp;</Typography>
                  <Grid container >                  
                    <Grid item xs={12}>
                        {this.state.error?<Label >{this.state.error}</Label>:''}
                        <form className={classes.form} name="create_user">
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
                            onClick={this.__CreateUser__}                  
                          >
                          Submit             
                          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                          </Button>
                          <Button
                            variant="raised"
                            color="secondary"
                            className={classes.submit}
                            onClick={this.__clear__}                  
                          >
                          Clear
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
                  message='User created successfully.'
                  get_value={false}
                />
            : ''}
                    </Grid>
                  </Grid>
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>&nbsp;</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>                
        </Paper>
      </div>
  )};
}

CreateUser.propTypes = {
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
                withStyles(Nstyles,{withTheme: true}),
                connect(mapStateToProps, mapDispatchToProps)
                )(CreateUser);