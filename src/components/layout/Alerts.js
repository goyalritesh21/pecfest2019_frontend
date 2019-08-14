import React, { Component, Fragment } from 'react'
import { withAlert } from 'react-alert';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
            if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
            if (error.msg.message) alert.error(`Message: ${error.msg.message.join()}`);
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
            if (error.msg.username) alert.error(error.msg.username.join());

        }

        if (message !== prevProps.message) {
            if (message.registerEventSuccess) alert.success(message.registerEventSuccess);
            if (message.registerEventFail) alert.error(message.registerEventFail);
            if (message.loadUserFail) alert.error(message.loadUserFail);
            if (message.loginFail) alert.error(message.loginFail);
            if (message.registerFail) alert.error(message.registerFail);
            if (message.updateFail) alert.error(message.updateFail);
            if (message.logoutFail) alert.error(message.logoutFail);
            if (message.loadEventsFail) alert.error(message.loadEventsFail);
            if (message.loadCategoriesFail) alert.error(message.loadCategoriesFail);
            if (message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
            if (message.loginRedirect) alert.error(message.loginRedirect);
            if (message.updateErrorMessage) alert.error(message.updateErrorMessage);
        }

    }
    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
