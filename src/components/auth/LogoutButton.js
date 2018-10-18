import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from "react-redux";


const LogoutButton = ({ onClick }) => (
  <MenuItem onClick={onClick}>Logout</MenuItem>
);

LogoutButton.propTypes = {
  onClick: PropTypes.func,
  user: PropTypes.object,
  attributes: PropTypes.object,
  state: PropTypes.string,
};

const mapStateToProps = state => ({
  state: state.cognito.state,
  user: state.cognito.user,
  attributes: state.cognito.attributes,
});

export default connect(mapStateToProps, null)(LogoutButton);;
