import React, {Component} from "react";
import * as propTypes from 'prop-types';
import {connect} from 'react-redux';
import {checkRegistered, registerEvent} from "../../actions/event";
import {createMessage} from "../../actions/messages";
import _ from "lodash";
import {withRouter} from "react-router";

class Button extends Component {
    componentDidMount() {
        const {user, eventID} = this.props;
        if (!_.isEmpty(user)) {
            const {username} = user;
            this.props.checkRegistered({eventID, username});
        }
        //
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!_.isEqual(prevProps.eventID, this.props.eventID)){
            if (!_.isEmpty(this.props.user)) {
                const {username} = this.props.user;
                const {eventID} = this.props;
                this.props.checkRegistered({eventID, username});
            }
        }
    }

    _onEventRegister = () => {
        // console.log("Clicked");
        if (this.props.user === null) {
            const loginToRegister = "Login to Register!";
            this.props.history.push('/login');
            return this.props.createMessage({loginToRegister});
        }
        const {username} = this.props.user;
        const {eventID} = this.props;
        this.props.registerEvent({eventID, username});
    };

    render() {
        // console.log(this.props);
        const {title, registered, checkRegister, eventRegister, event} = this.props;
        const disabled = checkRegister || eventRegister || registered;
        return (
            <div className="reg-btn-bg Ocean">
                <div className="reg-btn-group">
                    <div className="reg-btn Coral">
                        <button
                            disabled={disabled}
                            onClick={() => this.props._onClick(event)}
                        >{registered ? `${title}ed` : `${title}`}
                            <span className="Coralwave1"/>
                            <span className="Coralwave2"/>
                            <span className="Coralwave3"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Button.propTypes = {
    title: propTypes.string.isRequired,
    eventID: propTypes.number.isRequired,
    registered: propTypes.bool.isRequired,
    checkRegister: propTypes.bool,
    eventRegister: propTypes.bool.isRequired,
    checkRegistered: propTypes.func.isRequired,
    registerEvent: propTypes.func.isRequired,
    createMessage: propTypes.func.isRequired,
    user: propTypes.object,
    event: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    registered: state.event.registered,
    checkRegistered: state.loaders.isLoading.checkRegistered,
    eventRegister: state.loaders.isLoading.eventRegister,
    user: state.auth.user,
});

export default withRouter(connect(mapStateToProps, {checkRegistered, registerEvent, createMessage})(Button));