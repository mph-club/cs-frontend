import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {compose} from 'redux'
import {NTitle as Title} from './Styles/WelcomeStyle';

class Welcome extends Component {

    constructor(props) {

        super(props)

        // Check user authentication initally.
        this.__SessionCheck__()

    }

    /*
     * __SessionCheck__() to determine User is logged in or no.
     * It redirects user to login if not logged in.
     */

    __SessionCheck__() {

        if (this.props.SessionReducer.auth) {
            this.props.history.push("/admin/welcome")
        } else {
            this.props.history.push("/")
        }

    }

    render() {

        return (<Title> Welcome</Title>)

    }
    ;
}

Welcome.propTypes = {
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
        connect(mapStateToProps, mapDispatchToProps)
        )(Welcome);