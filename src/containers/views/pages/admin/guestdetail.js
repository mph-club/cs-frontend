import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {connect} from "react-redux";
import {compose} from 'redux'
import {NTitle,NTitle1,NTitle2,NCarouselbutton,Nstyles} from './Styles/GuestDetailStyle';
import axios from 'axios';
import Server from '../../../../config/server.js';
import ConfirmationDialog from '../../dialogs/confirmation';

class GuestDetail extends Component {

    constructor(props){
        super(props)

        this.state = {
          direction: 'row',
          justify: 'center',
          activeStep: 0,
          guest_detail:{}
        };

    }
    
    componentDidMount() {
        let guest_id = this.props.match.params.guestId;
        this.getData(guest_id);
    }

    getData = (guest_id) => {
        this.getGuestDetailAPI(guest_id).then(response => {
              this.setState({
                  guest_detail:response.data
              });
        });
    };
    
    getGuestDetailAPI = (guest_id) => {
        return new Promise((resolve, reject) => {
            axios.get(Server.VEHICAL.APICI + 'api/v1/users/getItemById?user_id='+guest_id,{}).then(function (response) {
                setTimeout(() => {
                    resolve(response.data);
                }, 250);
            }).catch((error) => {
                resolve([{data:[],recordsTotal:0}]);
            });
   
        });
        
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
    const { classes, theme } = this.props;
    const { alignItems, direction, activeStep } = this.state;
   
    return (
      <div>
        <NTitle> Detail of Guest</NTitle>
        <Paper className={classes.root}>
          <Grid container justify="center">
            <Grid item lg={10}>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>&nbsp;</Typography>
                  <Grid container >                  
                    <Grid item xs={5}>
                      <Avatar alt={this.state.guest_detail.user_name} src={`../../../../images/users/${this.state.guest_detail.picture}`} className={classes.ownedavatar} />
                      <Grid item xs={12}>
                      <NTitle1> {this.state.guest_detail.user_name} </NTitle1>
                    </Grid>
                    </Grid>
                    <Grid item xs={7}>
                    <Grid container >
                        <Grid item xs={12}>
                          <NTitle1> Phone Number </NTitle1>
                          <Typography variant="body1">{this.state.guest_detail.phone_number}</Typography>
                          <NTitle1> Email </NTitle1>
                          <Typography variant="body1">{this.state.guest_detail.email}</Typography>
                          <NTitle1> Status </NTitle1>
                          <Typography variant="body1">{this.state.guest_detail.status}</Typography>
                        </Grid>
                    </Grid>
                        <Grid container spacing={24}>
                            <Grid item xs={7}>
                                <Button variant="contained" size="large" color="primary" className={classes.button} onClick={() => this.handleOpenMessageDialog()}>
                                      Message
                                </Button>
                            </Grid>
                            <Grid item xs={5}>
                                {this.state.guest_detail.status === 'Block' ?
                                <Button variant="contained" size="large" color="secondary" className={classes.button} onClick={this.handleClickOpenUnblockDialog}>
                                      Unblock
                                  </Button>
                                : ''} 
                                {this.state.guest_detail.status !== 'Block' ?
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
                {(this.state.guest_detail.user_name !== undefined && this.state.guest_detail.user_name !== '') ?
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
                        message={`Message to ${this.state.guest_detail.user_name}`}
                        get_value={true}
                        value_field_name='Message'
                      />
                : ''}
                {(this.state.guest_detail.user_name !== undefined && this.state.guest_detail.user_name !== '') ?
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
                              message={`Message sent to ${this.state.guest_detail.user_name}`}
                              get_value={false}
                            />
                : ''}
                {this.state.guest_detail.user_name !== undefined ?
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
                  message={`Why are you blocking ${this.state.guest_detail.user_name}?`}
                  get_value={true}
                />
            : ''}
            {this.state.guest_detail.user_name !== undefined ?
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
                  message={`${this.state.guest_detail.user_name} has been blocked.`}
                  get_value={false}
                />
            : ''}
            {this.state.guest_detail.user_name !== undefined ?
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
                  message={`Why are you unblocking ${this.state.guest_detail.user_name}?`}
                  get_value={true}
                />
            : ''}            
            {this.state.guest_detail.user_name !== undefined ?
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
                  message={`${this.state.guest_detail.user_name} has been unblocked.`}
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