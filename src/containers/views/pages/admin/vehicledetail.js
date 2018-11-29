import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//import Avatar from '@material-ui/core/Avatar';
//import MobileStepper from '@material-ui/core/MobileStepper';
//import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
//import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {connect} from "react-redux";
import {compose} from 'redux'
import {NTitle,NTitle1,Nstyles} from './Styles/VehicleDetailStyle';
//import ConfirmationDialog from '../../dialogs/confirmation';
import RequestHelper from '../../../../account/vehicles/helper/request';
import Presenter from '../../../../account/vehicles/presenter';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.css"
import Utils from '../../../../helpers/utils'

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
            vehicle_id:this.props.match.params.Vehicle,
            vehicle_detail:{},
            vehicleSteps:[]
        };
        
      this.getData= this.getData.bind(this)      
      this.__OnGetVehiclesFailed__= this.__OnGetVehiclesFailed__.bind(this)      
      this.__OnGetVehiclesSucceed__= this.__OnGetVehiclesSucceed__.bind(this)
    }

    getData = () => {
        Presenter.getVehicleDetail(RequestHelper.getVehicleDetail(this.__OnGetVehiclesSucceed__,this.__OnGetVehiclesFailed__,this.state,this.props,this))
    };
    
    __OnGetVehiclesFailed__(error){
    }
    
    __OnGetVehiclesSucceed__(response){
        if(response.data.error === undefined){
            let vehicleSteps = [];
                    let imgObj = {};
                    if(response.data.Vehicle.photos){
                      for(var p=0;p<response.data.Vehicle.photos.length;p++){
                      
                        if(response.data.Vehicle.photos[p]){
                          imgObj.imgPath = response.data.Vehicle.photos[p];  
                        }
                        else{
                         imgObj.imgPath = '../images/users/No_Image_Available.png';   
                        }                        
                        
                      }
                    }
                    else{
                        imgObj.imgPath = '../../images/users/No_Image_Available.png';   
                    }
                    vehicleSteps.push(imgObj);
                    this.setState({
                        vehicle_detail:response.data.Vehicle,
                        vehicleSteps:vehicleSteps
                        },() => {
                    });
        }else{
            if(Utils.RefreshSession(this.state, this.props, this)){
                Presenter.getVehicleDetail(RequestHelper.getVehicleDetail(this.__OnGetVehiclesSucceed__,this.__OnGetVehiclesFailed__,this.state,this.props,this))
            }
        }
    }
    
  
    componentDidMount() {
        this.getData();
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
  
  handleClickOpenAPPROVEDialog = () => {
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
  
  handleAPPROVE = value => {
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
    
  handleClickOpenBLOCKDialog = value => {
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
    
  handleClickBLOCK = value => {
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
    const { classes } = this.props;
    const { alignItems, direction } = this.state;
    //const maxSteps = vehicleSteps.length;
    console.log(this.state.vehicleSteps.length);
    return (
    <div>
        <NTitle> Detail of Vehicle</NTitle>
        <Paper className={classes.root}>
          <Grid container justify="center">
            <Grid item lg={8} className={classes.positionRelative}>            
                 { this.state.vehicleSteps.length === 0 && 
                         
                        <div>
                                 <img alt="" src="../../../../images/loading.gif" />
                        </div>
                 }
                {this.state.vehicleSteps.length > 0  &&  <Carousel autoplay >
                    {
                   
                        this.state.vehicleSteps.map((item, index) => (
                             <div key={index}>
                                 <img alt="" src={item.imgPath} />
                             </div>
                         ))
                    
                    }
                </Carousel>
                }
            </Grid>
         
            <Grid item lg={8}>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <NTitle1> {this.state.vehicle_detail.make} {this.state.vehicle_detail.model} {this.state.vehicle_detail.year} </NTitle1>
               
                  <Typography variant="caption">{this.state.vehicle_detail.miles} miles</Typography>
                  <Divider className={classes.divider} />
                  <Grid container spacing={16} alignItems={alignItems} direction={direction}>
                    <Grid item align="center">
                      <Icon className={classes.fontXlarge}>event_seat</Icon>
                      <Typography variant="body1">{this.state.vehicle_detail.seats} Seats</Typography>
                    </Grid>
                    <Grid item align="center">
                      <Icon className={classes.fontXlarge}>note</Icon>
                      <Typography variant="body1">{this.state.vehicle_detail.doors} Door</Typography>
                    </Grid>
                    
                  </Grid>
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>DESCRIPTION </Typography>
                  <Typography variant="body1">{this.state.vehicle_detail.description}</Typography>
                  <Divider className={classes.divider} />
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>STATUS </Typography>
                  <Typography variant="body1">{this.state.vehicle_detail.status}</Typography>
                  <Divider className={classes.divider} />
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>TYPE </Typography>
                  <Typography variant="body1">{this.state.vehicle_detail.vehicle_type}</Typography>
                  <Divider className={classes.divider} />
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>Color </Typography>
                  <Typography variant="body1">{this.state.vehicle_detail.color}</Typography>
                  <Divider className={classes.divider} />
                  <Typography variant="subheading" className={classes.subheading} gutterBottom>TRANSMISSION</Typography>
                   <Typography variant="body1">{this.state.vehicle_detail.transmission}</Typography>
                  
                    <Divider className={classes.divider} />
                 <Typography variant="subheading" className={classes.subheading} gutterBottom>Address</Typography>
                   <Typography variant="body1">{this.state.vehicle_detail.address} - {this.state.vehicle_detail.place} - {this.state.vehicle_detail.city} - {this.state.vehicle_detail.state} </Typography>
                 
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