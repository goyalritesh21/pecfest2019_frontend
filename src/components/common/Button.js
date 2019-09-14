import React, {Component} from "react";
import * as propTypes from 'prop-types';
import { connect } from 'react-redux';
import {checkRegistered, registerEvent} from "../../actions/event";
import {createMessage} from "../../actions/messages";
class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: this.props.checkRegister || this.props.registered || this.props.eventRegister,
        }
    }

    componentDidMount() {
        if(this.props.user !== null){
            const {username} = this.props.user;
            const {eventID} = this.props;
            this.props.checkRegistered({eventID, username});
        }
        //
    }

    _onEventRegister = () => {
        // console.log("Clicked");
        if(this.props.user === null){
            const loginToRegister = "Login to Register!";
            return this.props.createMessage({loginToRegister});
        }
        const {username} = this.props.user;
        const {eventID} = this.props;
        this.props.registerEvent({eventID, username});
    };
    render(){
        // console.log(this.props);
        const {title} = this.props;
        return (
            <div className="reg-btn-bg Ocean">
                <div className="reg-btn-group">
                    <div className="reg-btn Coral">
                        <button
                            disabled={this.state.disabled}
                            onClick={() => this._onEventRegister()}
                        >{this.state.disabled ? `${title}ed` : `${title}`}
                            <span className="Coralwave1" />
                            <span className="Coralwave2" />
                            <span className="Coralwave3" />
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
    checkRegister: propTypes.bool.isRequired,
    eventRegister: propTypes.bool.isRequired,
    checkRegistered: propTypes.func.isRequired,
    registerEvent: propTypes.func.isRequired,
    createMessage: propTypes.func.isRequired,
    user: propTypes.object,
};

const mapStateToProps = ( state ) => ({
    registered: state.event.registered,
    checkRegistered: state.loaders.isLoading.checkRegistered,
    eventRegister: state.loaders.isLoading.eventRegister,
    user: state.auth.user,
});

export default connect(mapStateToProps, {checkRegistered, registerEvent, createMessage})(Button);