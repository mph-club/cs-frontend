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
import {NTitle,NTitle1,NTitle2,NCarouselbutton,Nstyles} from './Styles/VehicleDetailStyle';
import ConfirmationDialog from '../../dialogs/confirmation';
import axios from 'axios';
import Server from '../../../../config/server.js';

/*
 * Static list of images for Carousel
 */

const vehicleSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=900&h=565&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=900&h=565&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&h=565&q=80',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=900&h=565&q=60',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=900&h=565&q=60',
  },
];

class VehicleDetail extends Component {

    constructor(props){

        super(props)

        this.state = {
            direction: 'row',
            justify: 'center',
            activeStep: 0,
            open_approve_dialog: false,
            open_reject_dialog:false,
            open_success_dialog:false,
            vehicle_detail:{}
        };

    }
  
    componentDidMount() {
        let vehicle_id = this.props.match.params.Vehicle;
        this.getData(vehicle_id);
    }

    getData = (vehicle_id) => {
      this.getVehicleDetailAPI(vehicle_id).then(response => {
              this.setState({
                  vehicle_detail:response.data
              });
          });
    };
    
    getVehicleDetailAPI = (vehicle_id) => {
        return new Promise((resolve, reject) => {
            axios.get(Server.VEHICAL.APICI + 'api/v1/vehicles/getItemById?vehicle_id='+vehicle_id,{}).then(function (response) {
                setTimeout(() => {
                    resolve(response.data);
                }, 250);
            }).catch((error) => {
                resolve([{data:[],recordsTotal:0}]);
            });
   
        });
        
    }
  

  /*
   * Handle of right Arrow button for Carousel
   * Load the immediate right image
   */
  
  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };
  
  /*
   * Handle of left Arrow button for Carousel
   * Load the immediate left image
   */

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };
  
  handleClickOpenApproveDialog = () => {
    this.setState({ 
        open_approve_dialog: true,
        open_reject_dialog: false,
        open_success_approve_dialog:false,
        open_success_decline_dialog:false,
        open_block_dialog:false,
        open_unblock_dialog:false,
        open_success_block_dialog:false,
        open_success_unblock_dialog:false,
        open_delete_dialog:false,
        open_delete_detail_dialog:false,
        open_success_delete_dialog:false,
    });
  };
  
  handleClickOpenRejectDialog = () => {
    this.setState({ 
        open_approve_dialog: false,
        open_reject_dialog: true,
        open_success_approve_dialog:false,
        open_success_decline_dialog:false,
        open_block_dialog:false,
        open_unblock_dialog:false,
        open_success_block_dialog:false,
        open_success_unblock_dialog:false,
        open_delete_dialog:false,
        open_delete_detail_dialog:false,
        open_success_delete_dialog:false,
    });
  };

  handleConfirmClose = value => {
    this.setState({ 
        open_approve_dialog: false,
        open_reject_dialog: false,
        open_success_approve_dialog:false,
        open_success_decline_dialog:false,
        open_block_dialog:false,
        open_unblock_dialog:false,
        open_success_block_dialog:false,
        open_success_unblock_dialog:false,
        open_delete_dialog:false,
        open_delete_detail_dialog:false,
        open_success_delete_dialog:false,
    });    
  };
  
  handleApprove = value => {
    this.setState({ 
        open_approve_dialog: false,
        open_reject_dialog: false,
        open_success_approve_dialog:true,
        open_success_decline_dialog:false,
        open_block_dialog:false,
        open_unblock_dialog:false,
        open_success_block_dialog:false,
        open_success_unblock_dialog:false,
        open_delete_dialog:false,
        open_delete_detail_dialog:false,
        open_success_delete_dialog:false,
    });  
  }
  
  handleReject = value => {
    this.setState({ 
        open_approve_dialog: false,
        open_reject_dialog: false,
        open_success_approve_dialog:false,
        open_success_decline_dialog:true,
        open_block_dialog:false,
        open_unblock_dialog:false,
        open_success_block_dialog:false,
        open_success_unblock_dialog:false,
        open_delete_dialog:false,
        open_delete_detail_dialog:false,
        open_success_delete_dialog:false,
    });
  }  
    
  handleClickOpenBlockDialog = value => {
    this.setState({ 
        open_approve_dialog: false,
        open_reject_dialog: false,
        open_success_approve_dialog:false,
        open_success_decline_dialog:false,
        open_block_dialog:true,
        open_unblock_dialog:false,
        open_success_block_dialog:false,
        open_success_unblock_dialog:false,
        open_delete_dialog:false,
        open_delete_detail_dialog:false,
        open_success_delete_dialog:false,
    }); 
  } 
    
  handleClickBlock = value => {
    this.setState({ 
        open_approve_dialog: false,
        open_reject_dialog: false,
        open_success_approve_dialog:false,
        open_success_decline_dialog:false,
        open_block_dialog:false,
        open_unblock_dialog:false,
        open_success_block_dialog:true,
        open_success_unblock_dialog:false,
        open_delete_dialog:false,
        open_delete_detail_dialog:false,
        open_success_delete_dialog:false,
    }); 
  }
  
  handleClickOpenUnblockDialog = value => {
    this.setState({
        open_approve_dialog: false,
        open_reject_dialog: false,
        open_success_approve_dialog:false,
        open_success_decline_dialog:false,
        open_block_dialog:false,
        open_unblock_dialog:true,
        open_success_block_dialog:false,
        open_success_unblock_dialog:false,
        open_delete_dialog:false,
        open_delete_detail_dialog:false,
        open_success_delete_dialog:false,
    }); 
  };
    
  handleClickUnblock = value => {
    this.setState({ 
        open_approve_dialog: false,
        open_reject_dialog: false,
        open_success_approve_dialog:false,
        open_success_decline_dialog:false,
        open_block_dialog:false,
        open_unblock_dialog:false,
        open_success_block_dialog:false,
        open_success_unblock_dialog:true,
        open_delete_dialog:false,
        open_delete_detail_dialog:false,
        open_success_delete_dialog:false,
    }); 
  }
  
  handleClickOpenDeleteDialog = value => {
    this.setState({
        open_approve_dialog: false,
        open_reject_dialog: false,
        open_success_approve_dialog:false,
        open_success_decline_dialog:false,
        open_block_dialog:false,
        open_unblock_dialog:false,
        open_success_block_dialog:false,
        open_success_unblock_dialog:false,
        open_delete_dialog:true,
        open_delete_detail_dialog:false,
        open_success_delete_dialog:false,
    }); 
  };

  handleClickDeleteConfirm = value => {
    this.setState({ 
        open_approve_dialog: false,
        open_reject_dialog: false,
        open_success_approve_dialog:false,
        open_success_decline_dialog:false,
        open_block_dialog:false,
        open_unblock_dialog:false,
        open_success_block_dialog:false,
        open_success_unblock_dialog:false,
        open_delete_dialog:false,
        open_delete_detail_dialog:true,
        open_success_delete_dialog:false,
    }); 
  }
  handleClickDelete = value => {
    this.setState({ 
        open_approve_dialog: false,
        open_reject_dialog: false,
        open_success_approve_dialog:false,
        open_success_decline_dialog:false,
        open_block_dialog:false,
        open_unblock_dialog:false,
        open_success_block_dialog:false,
        open_success_unblock_dialog:false,
        open_delete_dialog:false,
        open_delete_detail_dialog:false,
        open_success_delete_dialog:true,
    }); 
  }
  render() {
    const { classes, theme } = this.props;
    const { alignItems, direction, activeStep } = this.state;
    const maxSteps = vehicleSteps.length;
    return (
    <div>        
        <NTitle> Detail of Vehical</NTitle>
        <Paper className={classes.root}>
            {this.state.vehicle_detail.hosted_by !== undefined ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.open_approve_dialog}
                  onCancel={this.handleConfirmClose}
                  onOk={this.handleApprove}
                  value=""
                  is_ok={true}
                  is_cancel={true}
                  ok_label="Approve"
                  cancel_label="Cancel"
                  message={`Are you sure you want to approve ${this.state.vehicle_detail.hosted_by}'s listing?`}
                  get_value={false}
                />
            : ''}
            {this.state.vehicle_detail.hosted_by !== undefined ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.open_reject_dialog}
                  onCancel={this.handleConfirmClose}
                  onOk={this.handleReject}
                  value=""
                  is_ok={true}
                  is_cancel={true}
                  ok_label="Decline"
                  cancel_label="Cancel"
                  message={`Why are you declining ${this.state.vehicle_detail.hosted_by}'s listing?`}
                  get_value={true}
                />
            : ''}
            {this.state.vehicle_detail.hosted_by !== undefined ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.open_success_approve_dialog}
                  onCancel={this.handleConfirmClose}
                  onOk={this.handleConfirmClose}
                  value=""
                  is_ok={true}
                  ok_label="Ok"
                  is_cancel={false}                  
                  cancel_label="Cancel"
                  message={`${this.state.vehicle_detail.hosted_by}'s listing has been approved.`}
                  get_value={false}
                />
            : ''}
            {this.state.vehicle_detail.hosted_by !== undefined ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.open_success_decline_dialog}
                  onCancel={this.handleConfirmClose}
                  onOk={this.handleConfirmClose}
                  value=""
                  is_ok={true}
                  is_cancel={false}
                  ok_label="Ok"
                  cancel_label="Cancel"
                  message={`${this.state.vehicle_detail.hosted_by}'s listing is declined.`}
                  get_value={false}
                />
            : ''}            
            {this.state.vehicle_detail.hosted_by !== undefined ?
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
                  message={`Why are you blocking ${this.state.vehicle_detail.hosted_by}'s ${this.state.vehicle_detail.make} ${this.state.vehicle_detail.model}?`}
                  get_value={true}
                />
            : ''}
            {this.state.vehicle_detail.hosted_by !== undefined ?
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
                  message={`${this.state.vehicle_detail.hosted_by}'s ${this.state.vehicle_detail.make} ${this.state.vehicle_detail.model} has been blocked.`}
                  get_value={false}
                />
            : ''}
            {this.state.vehicle_detail.hosted_by !== undefined ?
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
                  message={`Why are you unblocking ${this.state.vehicle_detail.hosted_by}'s ${this.state.vehicle_detail.make} ${this.state.vehicle_detail.model}?`}
                  get_value={true}
                />
            : ''}            
            {this.state.vehicle_detail.hosted_by !== undefined ?
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
                  message={`${this.state.vehicle_detail.hosted_by}'s ${this.state.vehicle_detail.make} ${this.state.vehicle_detail.model} has been unblocked.`}
                  get_value={false}
                />
            : ''}
         
            {this.state.vehicle_detail.hosted_by !== undefined ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.open_delete_dialog}
                  onCancel={this.handleConfirmClose}
                  onOk={this.handleClickDeleteConfirm}
                  value=""
                  is_ok={true}
                  is_cancel={true}
                  ok_label="Yes"
                  cancel_label="Cancel"
                  message={`Are you sure you want to delete ${this.state.vehicle_detail.hosted_by}'s ${this.state.vehicle_detail.make} ${this.state.vehicle_detail.model}?`}
                  get_value={false}
                />
            : ''}
            {this.state.vehicle_detail.hosted_by !== undefined ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.open_delete_detail_dialog}
                  onCancel={this.handleConfirmClose}
                  onOk={this.handleClickDelete}
                  value=""
                  is_ok={true}
                  is_cancel={true}
                  ok_label="Delete"
                  cancel_label="Cancel"
                  message={`Why are you deleting ${this.state.vehicle_detail.hosted_by}'s ${this.state.vehicle_detail.make} ${this.state.vehicle_detail.model}?`}
                  get_value={true}
                />
            : ''}
            {this.state.vehicle_detail.hosted_by !== undefined ?
                <ConfirmationDialog
                  classes={{
                      paper: classes.paper,
                  }}
                  open={this.state.open_success_delete_dialog}
                  onCancel={this.handleConfirmClose}
                  onOk={this.handleConfirmClose}
                  value=""
                  is_ok={true}
                  ok_label="Ok"
                  is_cancel={false}                  
                  cancel_label="Cancel"
                  message={`${this.state.vehicle_detail.hosted_by}'s ${this.state.vehicle_detail.make} ${this.state.vehicle_detail.model} has been deleted.`}
                  get_value={false}
                />
            : ''}
          <Grid container justify="center">
            <Grid item lg={8} className={classes.positionRelative}>
              <img
                className={classes.carouselimg}
                src={vehicleSteps[activeStep].imgPath}
                alt={vehicleSteps[activeStep].label}
              />
              <MobileStepper
                steps={maxSteps}
                position="top"
                activeStep={activeStep}
                variant="text"
                className={classes.mobileStepper}
                nextButton={
                  <NCarouselbutton size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </NCarouselbutton>
                }
                backButton={
                  <NCarouselbutton size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  </NCarouselbutton>
                }
              />

            </Grid>
            <Grid item lg={8}>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <NTitle1> {this.state.vehicle_detail.make} {this.state.vehicle_detail.model} {this.state.vehicle_detail.Year} </NTitle1>
                  <Typography variant="body1">10 Tips</Typography>
                  <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                  <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                  <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                  <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                  <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                  <Typography variant="caption">8 ml</Typography>
                  <Divider className={classes.divider} />
                  <Grid container spacing={16} alignItems={alignItems} direction={direction}>
                    <Grid item align="center">
                      <Icon className={classes.fontXlarge}>event_seat</Icon>
                      <Typography variant="body1">2 Seats</Typography>
                    </Grid>
                    <Grid item align="center">
                      <Icon className={classes.fontXlarge}>note</Icon>
                      <Typography variant="body1">2 Door</Typography>
                    </Grid>
                    <Grid item align="center">
                      <Icon className={classes.fontXlarge}>important_devices</Icon>
                      <Typography variant="body1">13 MPG</Typography>
                    </Grid>
                    <Grid item align="center">
                      <Icon className={classes.fontXlarge}>gps_fixed</Icon>
                      <Typography variant="body1">GPS</Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>DESCRIPTION </Typography>
                  <Typography variant="body1">Mercedes-Benz (German: [mɛʁˈtseːdəsˌbɛnts]) is a global automobile marque and a division of the German company Daimler AG... <a href="/">read more</a></Typography>
                  <Divider className={classes.divider} />
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>FEATURES</Typography>
                  <Grid container >
                    <Grid item xs={6}>
                      <List>
                        <ListItem className={classes.featurelist}>
                          <Icon fontSize="large">important_devices</Icon>
                          <ListItemText primary="Manual" />
                        </ListItem>
                        <ListItem className={classes.featurelist}>
                          <Icon fontSize="large">bluetooth</Icon>
                          <ListItemText primary="Bluetooth" />
                        </ListItem>
                        <ListItem className={classes.featurelist}>
                          <Icon fontSize="large">wb_sunny</Icon>
                          <ListItemText primary="Sunroof" />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={6}>
                      <List>
                        <ListItem className={classes.featurelist}>
                          <Icon fontSize="large">audiotrack</Icon>
                          <ListItemText primary="Audio input" />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                  <Divider className={classes.divider} />
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>RENTER REVIEWS</Typography>
                  <List>
                    <ListItem className={classes.featurelist}>
                      <Avatar alt="Remy Sharp" src="../../../../../../images/uxceo-128.jpg" className={classes.reviewsavatar} />
                      <ListItemText primary="Jenny S." secondary="Apr 2018" />
                    </ListItem>
                  </List>
                  <Typography variant="body1" gutterBottom>Mercedes-Benz (German: [mɛʁˈtseːdəsˌbɛnts]) is a global automobile marque and a division of the German company Daimler AG... <a href="/">read more</a></Typography>
                  <Typography variant="body1" gutterBottom>
                    <a href="/" className={classes.reviewlink} >Read all 18 reviews</a>
                    <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                    <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                    <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                    <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                    <Icon color="primary" style={{ fontSize: 14 }}>star</Icon></Typography>
                  <Divider className={classes.divider} />
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>OWNED BY</Typography>
                  <Grid container >
                    <Grid item xs={8}>
                      <NTitle1> Mike L.</NTitle1>
                      <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                      <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                      <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                      <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                      <Icon color="primary" style={{ fontSize: 14 }}>star</Icon>
                      <Grid container >
                        <Grid item xs={6}>
                          <NTitle2> Mike L.</NTitle2>
                          <Typography variant="body1">90%</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <NTitle2> Mike L.</NTitle2>
                          <Typography variant="body1">3 min</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4} align="right">
                      <Avatar alt="Remy Sharp" src="../../../../../../images/uxceo-128.jpg" className={classes.ownedavatar} />
                    </Grid>
                  </Grid>
                  <Divider className={classes.divider} />
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>GUIDELINES</Typography>
                  <List>
                    <ListItem className={classes.guideline}>
                      <ListItemText primary="&bull; A deposite will be required." />
                    </ListItem>
                    <ListItem className={classes.guideline}>
                      <ListItemText primary="&bull; A minimum of 1 day is required to rent this car." />
                    </ListItem>
                    <ListItem className={classes.guideline}>
                      <ListItemText primary="&bull; No smoking" />
                    </ListItem>
                  </List>
                  <Divider className={classes.divider} />
                </Grid>
                <Grid item xs={6}>
                  <NTitle1> Rejects / Approve</NTitle1>
                  <TextField
                    id="filled-multiline-static"
                    label="Reason"
                    multiline
                    rows="10"
                    defaultValue=""
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <Grid container spacing={24}>
                    <Grid item align="left" xs={6}>
                      {(this.state.vehicle_detail.status !== undefined && (this.state.vehicle_detail.status === 'Deny' || this.state.vehicle_detail.status === 'Pending')) ?
                        <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.handleClickOpenApproveDialog}>
                            Approve
                        </Button>
                    : ''}                    
                    {this.state.vehicle_detail.status === 'Approve' ?
                        <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.handleClickOpenBlockDialog}>
                            Block
                        </Button>
                    : ''}                   
                    {this.state.vehicle_detail.status === 'Block' ?
                        <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.handleClickOpenUnblockDialog}>
                            Unblock
                        </Button>
                    : ''}
                    </Grid>
                    <Grid item align="right" xs={6}>
                      {(this.state.vehicle_detail.status !== undefined && this.state.vehicle_detail.status === 'Pending') ?
                        <Button variant="contained" size="large" color="secondary" className={classes.button} onClick={this.handleClickOpenRejectDialog}>
                         Decline
                        </Button>
                    : ''}
                       {(this.state.vehicle_detail.status === 'Approve') || (this.state.vehicle_detail.status === 'Block') || (this.state.vehicle_detail.status === 'Unblock') || (this.state.vehicle_detail.status === 'Deny') ?
                        <Button variant="contained" size="large" color="secondary" className={classes.button} onClick={this.handleClickOpenDeleteDialog}>
                            Delete
                        </Button>
                    : ''}     
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
  
        </Paper>
      </div>
    )
  }
}

VehicleDetail.propTypes = {
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
                )(VehicleDetail);