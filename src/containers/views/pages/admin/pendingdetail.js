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
import {NTitle,NTitle1,NTitle2,NCarouselbutton,Nstyles} from './Styles/PendingDetailStyle';

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

class PendingDetail extends Component {

  constructor(props){
    super(props)

    this.state = {
      direction: 'row',
      justify: 'center',
      activeStep: 0,
    };

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

  render() {
    const { classes, theme } = this.props;
    const { alignItems, direction, activeStep } = this.state;
    const maxSteps = vehicleSteps.length;
    return (
      <div>
        <NTitle> Detail of Pending Vehical</NTitle>
        <Paper className={classes.root}>
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
                  <NTitle1> Porsche Panama 2015</NTitle1>
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
                      <Button variant="contained" size="large" color="primary" className={classes.button}>
                        Approve
                      </Button>
                    </Grid>
                    <Grid item align="right" xs={6}>
                      <Button variant="contained" size="large" color="secondary" className={classes.button}>
                        Reject
                      </Button>
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

PendingDetail.propTypes = {
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
                )(PendingDetail);