import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {update, loadUser} from '../../../actions/auth';
import {createMessage} from '../../../actions/messages';
import {registerTeam} from '../../../actions/event';
import {getBackgroundImage} from "../../../utils/BackgroundUtils";
import _ from 'lodash';
import moment from "moment";

class EventRegister extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputs: ['input-0'],
            values: [''],
            teamName: ''
        };
    }

    componentDidMount() {
        this.props.loadUser();
        document.body.style.backgroundImage = `url(${getBackgroundImage(
            moment().hour()
        )})`;
        const {params} = this.props.match;
        this._setState(params);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!_.isEqual(prevProps, this.props)){
            if(!_.isEmpty(this.props.user)){
                console.log(this.props.user.username);
                this.setState(() =>({
                    values: [this.props.user.username]
                }))
            }
        }
    }

    _setState = ({minTeam}) => {
        let inputs = [];
        for (let i = 1; i < minTeam; i++) {
            inputs.push(`input-${i}`);
        }
        this.setState(() => ({
            teamName: "",
            teamLeader: "",
            minTeam: parseInt(minTeam),
            maxTeam: parseInt(minTeam),
            inputs
        }));
    };

    _increaseSize = (maxTeam) => {
        maxTeam = parseInt(maxTeam);
        const size = this.state.maxTeam + 1;
        let inputs = this.state.inputs;
        const newInput = `input-${inputs.length}`;
        // console.log(`inputs size - ${inputs.length}`);
        // console.log(size, maxTeam);
        if (size <= maxTeam) {
            this.setState((prevState) => ({maxTeam: size, inputs: prevState.inputs.concat(newInput)}));
        }
    };

    _decreaseSize = (minTeam) => {
        minTeam = parseInt(minTeam);
        const size = this.state.maxTeam - 1;
        if (size >= minTeam) {
            this.setState((prevState) => ({
                maxTeam: size,
                inputs: prevState.inputs.filter((item, index) => (index !== size - 1))
            }));
        }
    };

    _onTeamNameChange = e => {
        const val = e.target.value.toUpperCase();
        this.setState(() => ({
            teamName: val
        }));
    };

    onChange = e => {
        const key = parseInt(e.target.name);
        const val = e.target.value.toUpperCase();
        let values = this.state.values;
        values[key] = val;
        this.setState(() => ({values: values}));
    };

    onSubmit = (e) => {
        e.preventDefault();
        let errors = [];
        const {values, teamName} = this.state;
        // if (errors.length > 0) {
        //     const lastMessage = errors.length > 1 ? " are invalid." : " is invalid.";
        //     const updateErrorMessage = errors.join(", ") + lastMessage;
        //     this.props.createMessage({updateErrorMessage});
        //     return;
        // }
        const {eventID} = this.props.match.params;
        const teamObj = {
            eventID,
            team: values
        };
        this.props.registerTeam(teamObj);
    };

    render() {
        const {teamName, values} = this.state;
        const {minTeam, maxTeam, eventID, eventName} = this.props.match.params;
        const {isLoading, isAuthenticated} = this.props;
        if (!isAuthenticated) {
            return <Redirect to="/login" />
        }
        return (
            <div className="col-md-8 m-auto">
                <div className="mt-5 main">
                    <h2 className="text-center">{eventName.toUpperCase()}</h2>
                    <br/>
                    <form autoComplete={"off"} onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label>Team Name</label>
                                <div className="input-outer">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        name="teamName"
                                        onChange={this._onTeamNameChange}
                                        required
                                        value={teamName}
                                        tabIndex={"1"}
                                        spellCheck="false"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label>Team Leader</label>
                                <div className="input-outer">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        name="teamLeader"
                                        onChange={this.onChange}
                                        required
                                        value={values[0].toUpperCase()}
                                        tabIndex={"2"}
                                        spellCheck="false"
                                        placeholder={"Enter PECFEST ID"}
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            this.state.inputs.map((item, index) => (
                                <div className="row" key={index+1}>
                                    <div className="form-group col-md-12">
                                        <label>Team Member</label>
                                        <div className="input-outer">
                                            <input
                                                ref={item}
                                                type="text"
                                                className="form-control input"
                                                name={`${index+1}`}
                                                onChange={this.onChange}
                                                required
                                                value={values[index+1]}
                                                tabIndex={index+2}
                                                spellCheck="false"
                                                placeholder={"Enter PECFEST ID"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="form-group btn-wrap">
                            <button type="button"
                                    className="btn btn-slide"
                                    disabled={this.state.minTeam === minTeam}
                                    tabIndex={"9"}
                                    onClick={() => (this._decreaseSize(minTeam))}
                            >
                                Remove Member
                            </button>
                            <button type="button"
                                    className="btn btn-slide"
                                    disabled={this.state.maxTeam === maxTeam}
                                    tabIndex={"9"}
                                    onClick={() => (this._increaseSize(maxTeam))}
                            >
                                Add Member
                            </button>
                            <button type="submit"
                                    className="btn btn-slide"
                                    disabled={isLoading.update}
                                    tabIndex={"9"}>
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

EventRegister.propTypes = {
    registerTeam: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    createMessage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isLoading: state.loaders.isLoading
});

export default withRouter(
    connect(
        mapStateToProps,
        {
            loadUser,
            update,
            createMessage,
            registerTeam
        }
    )
    (EventRegister)
);