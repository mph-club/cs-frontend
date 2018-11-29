import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsCarICon from '@material-ui/icons/DirectionsCar';
//import BarChartIcon from '@material-ui/icons/BarChart';

//import WatchLater from '@material-ui/icons/WatchLater';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends React.Component {
  state = {
    vehicle_open: false,
    user_open:false
  };

  handleClick = () => {
    this.setState(state => ({ vehicle_open: !state.vehicle_open }));
  };
  
  handleUserClick = () => {
    this.setState(state => ({ user_open: !state.user_open }));
  };
  
  render() {
    const { classes } = this.props;

    return (


      <List>
        <ListItem button onClick={this.handleUserClick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
          {this.state.user_open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.user_open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} component={Link} to="/admin/users">
              <ListItemIcon>
                <AccountIcon />
              </ListItemIcon>
              <ListItemText inset primary="List User" />
            </ListItem>
            <ListItem button className={classes.nested} component={Link} to="/admin/createuser">
              <ListItemIcon>
                <AccountIcon />
              </ListItemIcon>
              <ListItemText inset primary="Create User" />
            </ListItem>
            
          </List>
        </Collapse>
        <ListItem button component={Link} to="/admin/vehicles">
          <ListItemIcon>
            <DirectionsCarICon />
          </ListItemIcon>
          <ListItemText inset primary="Vehicles" />
        </ListItem>
       


      </List>

    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
