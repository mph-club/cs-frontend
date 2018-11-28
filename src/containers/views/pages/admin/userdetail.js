import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {connect} from "react-redux";
import {compose} from 'redux'
import {NTitle,NTitle1,Nstyles} from './Styles/GuestDetailStyle';
import ConfirmationDialog from '../../dialogs/confirmation';
import RequestHelper from '../../../../account/users/helper/request';
import Presenter from '../../../../account/users/presenter';
import Utils from '../../../../helpers/utils'

class GuestDetail extends Component {

    constructor(props){
        super(props)

        this.state = {
          direction: 'row',
          justify: 'center',
          activeStep: 0,
          user_detail:{}
        };
        
    this.getData= this.getData.bind(this)      
    this.__OnGetUserFailed__= this.__OnGetUserFailed__.bind(this)      
    this.__OnGetUserSucceed__= this.__OnGetUserSucceed__.bind(this)

    }
    
    
    getData = () => {
        Presenter.getUserDetail(RequestHelper.getUserDetail(this.__OnGetUserSucceed__,this.__OnGetUserFailed__,this.state,this.props,this))
    };
    
    __OnGetUserFailed__(error){
    }
    
    __OnGetUserSucceed__(response){
        if(response.data.error === undefined){
            this.setState({
                user_detail:response.data.User
                },() => {
            });
        }else{
            if(Utils.RefreshSession(this.state, this.props, this)){
                Presenter.getUserDetail(RequestHelper.getUserDetail(this.__OnGetUserSucceed__,this.__OnGetUserFailed__,this.state,this.props,this))
            }
        }
    }
    
  
    componentDidMount() {
        this.getData();
    }
    
    handleOpenMessageDialog = () => {
        this.setState({ 
            open_message_dialog: true,
            open_message_success_dialog: false,
            open_block_dialog:false,
            open_unblock_dialog:false,
            open_success_block_dialog:false,
            open_success_unblock_dialog:false
        });
    };
  
    handleSendMessage = () => {
        this.setState({ 
            open_message_dialog: false,
            open_message_success_dialog: true,
            open_block_dialog:false,
            open_unblock_dialog:false,
            open_success_block_dialog:false,
            open_success_unblock_dialog:false
        });
    };

    handleConfirmClose = value => {
        this.setState({ 
            open_message_dialog: false,
            open_message_success_dialog: false,
            open_block_dialog:false,
            open_unblock_dialog:false,
            open_success_block_dialog:false,
            open_success_unblock_dialog:false
        });   
    };
    
    handleClickOpenBlockDialog = value => {
    this.setState({ 
        open_message_dialog: false,
        open_message_success_dialog: false,
        open_block_dialog:true,
        open_unblock_dialog:false,
        open_success_block_dialog:false,
        open_success_unblock_dialog:false
    }); 
  } 
    
  handleClickBlock = value => {
    this.setState({ 
        open_message_dialog: false,
        open_message_success_dialog: false,
        open_block_dialog:false,
        open_unblock_dialog:false,
        open_success_block_dialog:true,
        open_success_unblock_dialog:false
    }); 
  }
  
  handleClickOpenUnblockDialog = value => {
    this.setState({
        open_message_dialog: false,
        open_message_success_dialog: false,
        open_block_dialog:false,
        open_unblock_dialog:true,
        open_success_block_dialog:false,
        open_success_unblock_dialog:false
    }); 
  };
    
  handleClickUnblock = value => {
    this.setState({ 
        open_message_dialog: false,
        open_message_success_dialog: false,
        open_block_dialog:false,
        open_unblock_dialog:false,
        open_success_block_dialog:false,
        open_success_unblock_dialog:true
    }); 
  }

  

  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <NTitle> Detail of User</NTitle>
        <Paper className={classes.root}>
          <Grid container justify="center">
            <Grid item lg={10}>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>&nbsp;</Typography>
                  <Grid container >                  
                    <Grid item xs={5}>
                      <Avatar alt='profile_pic' src={(this.state.user_detail.profile_photo !== '' ? this.state.user_detail.profile_photo : '../../images/users/No_Image_Available.png')} className={classes.ownedavatar} />
                      <Grid item xs={12}>
                      </Grid>
                    </Grid>
                    <Grid item xs={7}>
                    <Grid container >
                        <Grid item xs={12}>
                          <NTitle1> Phone Number </NTitle1>
                          <Typography variant="body1">{(this.state.user_detail.phone!== '' ? this.state.user_detail.phone : ' - ' )}</Typography>
                          <NTitle1> Email </NTitle1>
                          <Typography variant="body1">{(this.state.user_detail.email !== '' ? this.state.user_detail.email : ' - ')}</Typography>

                        </Grid>
                    </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={7}>
                                <Button variant="contained" size="large" color="primary" className={classes.button} onClick={() => this.handleOpenMessageDialog()}>
                                      Message
                                </Button>
                            </Grid>
                            <Grid item xs={5}>
                                {this.state.user_detail.status === 'Block' ?
                                <Button variant="contained" size="large" color="secondary" className={classes.button} onClick={this.handleClickOpenUnblockDialog}>
                                      Unblock
                                  </Button>
                                : ''} 
                                {this.state.user_detail.status !== 'Block' ?
                                <Button variant="contained" size="large" color="secondary" className={classes.button} onClick={this.handleClickOpenBlockDialog}>
                                      Block
                                  </Button>
                                : ''}  
                            </Grid>
                        </Grid>    
                    </Grid>
                  </Grid>
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>&nbsp;</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
                {(this.state.user_detail.user_name !== undefined && this.state.user_detail.user_name !== '') ?
                      <ConfirmationDialog
                        classes={{
                            paper: classes.paper,
                        }}
                        open={this.state.open_message_dialog}
                        onCancel={this.handleConfirmClose}
                        onOk={this.handleSendMessage}
                        value=""
                        is_ok={true}
                        is_cancel={true}
                        ok_label="Send"
                        cancel_label="Cancel"
                        message={`Message to ${this.state.user_detail.user_name}`}
                        get_value={true}
                        value_field_name='Message'
                      />
                : ''}
                {(this.state.user_detail.user_name !== undefined && this.state.user_detail.user_name !== '') ?
                            <ConfirmationDialog
                              classes={{
                                  paper: classes.paper,
                              }}
                              open={this.state.open_message_success_dialog}
                              onCancel={this.handleConfirmClose}
                              onOk={this.handleConfirmClose}
                              value=""
                              is_ok={true}
                              is_cancel={false}
                              ok_label="Ok"
                              cancel_label="Cancel"
                              message={`Message sent to ${this.state.user_detail.user_name}`}
                              get_value={false}
                            />
                : ''}
                {this.state.user_detail.user_name !== undefined ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.open_block_dialog}
                  onCancel={this.handleConfirmClose}
                  onOk={this.handleClickBlock}
                  value=""
                  is_ok={true}
                  is_cancel={true}
                  ok_label="Block"
                  cancel_label="Cancel"
                  message={`Why are you blocking ${this.state.user_detail.user_name}?`}
                  get_value={true}
                />
            : ''}
            {this.state.user_detail.user_name !== undefined ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.open_success_block_dialog}
                  onCancel={this.handleConfirmClose}
                  onOk={this.handleConfirmClose}
                  value=""
                  is_ok={true}
                  ok_label="Ok"
                  is_cancel={false}                  
                  cancel_label="Cancel"
                  message={`${this.state.user_detail.user_name} has been blocked.`}
                  get_value={false}
                />
            : ''}
            {this.state.user_detail.user_name !== undefined ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.open_unblock_dialog}
                  onCancel={this.handleConfirmClose}
                  onOk={this.handleClickUnblock}
                  value=""
                  is_ok={true}
                  is_cancel={true}
                  ok_label="Unblock"
                  cancel_label="Cancel"
                  message={`Why are you unblocking ${this.state.user_detail.user_name}?`}
                  get_value={true}
                />
            : ''}            
            {this.state.user_detail.user_name !== undefined ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.open_success_unblock_dialog}
                  onCancel={this.handleConfirmClose}
                  onOk={this.handleConfirmClose}
                  value=""
                  is_ok={true}
                  ok_label="Ok"
                  is_cancel={false}                  
                  cancel_label="Cancel"
                  message={`${this.state.user_detail.user_name} has been unblocked.`}
                  get_value={false}
                />
            : ''}       
        </Paper>
      </div>
    )
  }
}

GuestDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
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
                  withStyles(Nstyles,{withTheme: true}), 
                  connect(mapStateToProps, mapDispatchToProps)
                )(GuestDetail);