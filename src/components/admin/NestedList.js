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
import BookICon from '@material-ui/icons/Book';
import BarChartIcon from '@material-ui/icons/BarChart';

import WatchLater from '@material-ui/icons/WatchLater';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import HighlightOff from '@material-ui/icons/HighlightOff';
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
    open: false,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (


      <List>
        <ListItem button component={Link} to="/admin/welcome">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BookICon />
          </ListItemIcon>
          <ListItemText primary="Booking" />
        </ListItem>
        <ListItem button onClick={this.handleClick} >
          <ListItemIcon>
            <DirectionsCarICon />
          </ListItemIcon>
          <ListItemText inset primary="Vehicals" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} component={Link} to="/admin/pending">
              <ListItemIcon>
                <WatchLater />
              </ListItemIcon>
              <ListItemText inset primary="Pending Vehicals" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <CheckCircleOutline />
              </ListItemIcon>
              <ListItemText inset primary="Approved Vehicals" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <HighlightOff />
              </ListItemIcon>
              <ListItemText inset primary="Rejected Vehicals" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>


      </List>

    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
