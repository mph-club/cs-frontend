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
import FormHelper from '../../../../../account/signup/helper/confirm_form'
import RequestHelper from '../../../../../account/signup/helper/request';
import Presenter from '../../../../../account/signup/presenter';
import { connect } from "react-redux";
import { compose } from 'redux'
import { VerifyStyle,NLabel as Label } from './Styles/VerifyStyle';
import ConfirmationDialog from '../../../dialogs/confirmation';

class Verify extends Component {

  constructor(props){
      super(props)
      
      // Check user authentication initally.
      this.__SessionCheck__()
      
      this.state = {
        email:{
          value: props.match.params.email,
          error:false,
          message:"",
        },
        confirmcode:{
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
         verified:false,
         codeSent:false
      }

      this.__Verify__ = this.__Verify__.bind(this)
      this.__TogglePostRequest__ = this.__TogglePostRequest__.bind(this)
      this.__OnVerifySucceed__= this.__OnVerifySucceed__.bind(this)
      this.__OnVerifyFailed__= this.__OnVerifyFailed__.bind(this)
      this.__signin__= this.__signin__.bind(this)
      this.__resendCode__= this.__resendCode__.bind(this)
      this.__OnSendSucceed__= this.__OnSendSucceed__.bind(this)
      this.__OnSendFailed__ = this.__OnSendFailed__.bind(this)
      this.CodeConfirmClose = this.CodeConfirmClose.bind(this)

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

    
    __Verify__(event){
        event.preventDefault();
        this.__TogglePostRequest__();            
        FormHelper.CleanError(this)
        if(FormHelper.ValidateForm(this)){
          Presenter.UserConfirm(RequestHelper.UserConfirm(this.__OnVerifySucceed__,this.__OnVerifyFailed__,this.state,this.props,this))
        }else{
          setTimeout(function() {this.__TogglePostRequest__()}.bind(this),400);  
          return false;
        }
    }
    
    __OnVerifySucceed__(response){
        if(response === 'SUCCESS'){
            this.__TogglePostRequest__();
            this.setState({
                loading:!this.state.loading,
                verified:true
            })
        }else{
            this.setState({
                error:'Some error occured while performing operation',
                loading:!this.state.loading,
                verified:false
            })
        }
    }

    __OnVerifyFailed__(response){
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
            verified:false
        });
        this.props.history.push("/")
    };
    
    __resendCode__(event){
        Presenter.resendCode(RequestHelper.resendCode(this.__OnSendSucceed__,this.__OnSendFailed__,this.state,this.props,this))
    }

    __OnSendSucceed__(response){
      this.setState({
        codeSent:true,
      })
    }
    
    __OnSendFailed__(response){
      this.setState({
        error: response, 
        codeSent:false,
      })
    }
    
    CodeConfirmClose = value => {
        this.setState({ 
            codeSent:false
        });
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
          <Typography variant="headline">User Confirmation</Typography>
          {this.state.error?<Label >{this.state.error}</Label>:''}
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="confirmcode">Email</InputLabel>
              <Input
                name="email"
                type="email"
                id="email"
                value={this.state.email.value}
                onChange={(event)=> this.setState(
                            {
                              email:{
                                ...this.state.email,
                                value : event.target.value,
                              }
                            }
                          )}
              />
            {this.state.email.error?<Label >{'*'+this.state.email.message}</Label>:''}
            </FormControl><FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="confirmcode">Confirmation Code</InputLabel>
              <Input
                name="confirmcode"
                type="confirmcode"
                id="confirmcode"
                onChange={(event)=> this.setState(
                            {
                              confirmcode:{
                                ...this.state.confirmcode,
                                value : event.target.value,
                              }
                            }
                          )}
              />
            {this.state.confirmcode.error?<Label >{'*'+this.state.confirmcode.message}</Label>:''}
            </FormControl>
            <Button
              disabled={loading}
              variant="raised"
              color="primary"
              className={classes.submit}
              onClick={this.__Verify__}                  
            >
            Comfirm              
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
            <Button
              variant="raised"
              className={classes.submit}
              onClick={this.__resendCode__}                  
            >
            Resend Code
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
          {this.state.verified ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.verified}
                  onCancel={this.handleConfirmClose}
                  onOk={this.handleConfirmClose}
                  value=""
                  is_ok={true}
                  ok_label="Ok"
                  is_cancel={false}                  
                  cancel_label="Cancel"
                  message='You account has been confirmed, you can login now.'
                  get_value={false}
                />
            : ''}
            {this.state.codeSent ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.codeSent}
                  onCancel={this.CodeConfirmClose}
                  onOk={this.CodeConfirmClose}
                  value=""
                  is_ok={true}
                  ok_label="Ok"
                  is_cancel={false}                  
                  cancel_label="Cancel"
                  message='Confirmation code sent to your email.'
                  get_value={false}
                />
            : ''}                    
        </Paper>
      </main>
    </React.Fragment>
  )};
}

Verify.propTypes = {
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
                withStyles(VerifyStyle),
                connect(mapStateToProps, mapDispatchToProps)
                )(Verify);