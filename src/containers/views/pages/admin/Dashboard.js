import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NestedList  from '../../../../components/admin/NestedList';
import Vehicles from './vehicles';
import Pending from './pending';
import VehicleDetail from './vehicledetail';
//import GuestDetail from './guestdetail';
//import HostDetail from './hostdetail';
import UserDetail from './userdetail';
import MenuList from '../../../../config/AdminMenu.js';
import {connect} from "react-redux";
import {compose} from 'redux'
import { Switch, Route } from "react-router-dom";
import DashboardStyle from './Styles/DashboardStyle';
import AuthenticationPresenter from "../../../../account/login/presenter.js"
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Users from './Users';
//import Guests from './Guests';
//import Hosts from './Hosts';
//import createUser from './createUser';
import Utils from '../../../../helpers/utils'
import createUser from './createUser';

class Dashboard extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
      open: true,
      url : "",
      anchorEl: null,
    };
    
    // Check user authentication initally.
    this.__SessionCheck__= this.__SessionCheck__.bind(this)
    this.__SessionCheck__()
  }
  
  /*
   * __SessionCheck__() to determine User is logged in or no.
   * It redirects user to login if not logged in.
   */
  
  __SessionCheck__(){
    if(Utils.CheckSession(this.state, this.props, this)){
        this.props.history.push(this.props.location.pathname)   
    }else{
        this.props.history.push("/login")
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleOpenPage = () => {
       this.props.history.push("/admin/createstaff")

    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);  
    const { classes } = this.props;
    
    var clientID  = this.props.location.pathname
    let url = '';
    var url_name = clientID.split("/")
      for(var i = 0;i<MenuList.length;i++){
      if(url_name[2] === MenuList[i].url){
        url = MenuList[i].label
      }
    }
   
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes.title}>
                {url}
              </Typography>
              {(this.props.SessionReducer.auth) ?
                <div>
                    <IconButton
                      aria-owns={open ? 'menu-appbar' : null}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                    <AccountCircle />
                    </IconButton>
                     <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={this.handleClose}
                      >
                 <MenuItem onClick={this.handleOpenPage}>Create Staff</MenuItem>
                      <MenuItem onClick={()=>AuthenticationPresenter.Logout(this)}>Logout</MenuItem>
                    </Menu>
                  </div>
              : this.props.history.push("/login")}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={true}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List><NestedList/></List>
          
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
          
            <div className={classes.tableContainer}>
           <Switch>
               <Route path="/admin/vehicles" name="vehicles" component={Vehicles}/>
               <Route path="/admin/pending" name="pending" component={Pending}/>
               <Route path="/admin/vehicledetail/:Vehicle" name="vehicledetail" component={VehicleDetail}/>
               <Route path="/admin/users/" name="users" component={Users}/>
               <Route path="/admin/userdetail/:User" name="userdetail" component={UserDetail}/>
               <Route path="/admin/createstaff" name="createstaff" component={createUser}/>
               </Switch>
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
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
                withStyles(DashboardStyle),
                connect(mapStateToProps, mapDispatchToProps)
                )(Dashboard);