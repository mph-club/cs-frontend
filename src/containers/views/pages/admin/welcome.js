import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {compose} from 'redux'
import {NTitle as Title} from './Styles/WelcomeStyle';

class Welcome extends Component {

    render() {
        return (<Title> Welcome</Title>)
    };
}

Welcome.propTypes = {
  user: PropTypes.object,
  attributes: PropTypes.object,
  state: PropTypes.string,
};


const mapStateToProps = state => ({
  state: state.cognito.state,
  user: state.cognito.user,
  attributes: state.cognito.attributes,
});

export default compose(
        connect(mapStateToProps, null)
        )(Welcome);