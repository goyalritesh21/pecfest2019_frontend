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
            inputs: [''],
            values: [''],
            teamName: '',
            teamLeader: ''
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
                this.setState(() =>({
                    teamLeader: this.props.user.username
                }))
            }
            if(!_.isEmpty(this.props.isLoading)){
                if(this.props.registered){
                    this.props.history.goBack();
                }
            }
        }
    }

    _setState = ({minTeam}) => {
        let inputs = [];
        for (let i = 0; i < parseInt(minTeam)-1; i++) {
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
        if (size <= maxTeam) {
            this.setState((prevState) => ({maxTeam: size, inputs: prevState.inputs.concat(newInput)}));
        }
        // console.log();
    };

    _getValue = (index1, index2, length) => {
        const {values} = this.state;
        if(!_.isEmpty(values[index1*(length)+index2])){
            return values[index1*(length)+index2].toUpperCase();
        }
        return "";
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
        const val = e.target.value.toLowerCase();
        let values = this.state.values;
        values[key] = val;
        this.setState(() => ({values: values}));
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {values, teamName, teamLeader} = this.state;
        const {eventID} = this.props.match.params;
        let team = [teamLeader];
        values.map((item)=>{
            if(!_.isEmpty(item)){
                team.push(item);
            }
        });
        const teamObj = {
            eventID,
            teamName: teamName.toLowerCase(),
            team
        };
        this.props.registerTeam(teamObj);

    };

    render() {
        const {teamName, inputs, teamLeader} = this.state;
        const {minTeam, maxTeam, eventName} = this.props.match.params;
        const {isAuthenticated, registered, checkRegister, eventRegister} = this.props;
        const disabled = checkRegister || eventRegister || registered;
        if (!isAuthenticated) {
            return <Redirect to="/login" />
        }
        return (
            <div className="col-md-8 m-auto">
                <div className="mt-5 main">
                    <h2 className="text-center">{eventName.toUpperCase()}</h2>
                    <br/>
                    <form autoComplete={"off"} onSubmit={this.onSubmit}>
                        <div className="row row-break">
                            <div className="form-group col-md-6">
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
                            <div className="form-group col-md-6">
                                <label>Team Leader</label>
                                <div className="input-outer">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        name="teamLeader"
                                        onChange={this.onChange}
                                        readOnly={true}
                                        required
                                        value={teamLeader.toUpperCase()}
                                        tabIndex={"2"}
                                        spellCheck="false"
                                        placeholder={"Enter PECFEST ID"}
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            _.chunk(inputs, 2).map((group, index) => (
                                <div className="row row-break" key={index}>
                                    {
                                        group.map((item, index2) => (
                                            <div className="form-group col-md-6" key={index*(2)+index2}>
                                                <label>Team Member</label>
                                                <div className="input-outer">
                                                    <input
                                                        ref={item}
                                                        type="text"
                                                        className="form-control input"
                                                        name={index*(2)+index2}
                                                        onChange={this.onChange}
                                                        required
                                                        value={this._getValue(index, index2, 2)}
                                                        tabIndex={index*(2)+index2+3}
                                                        spellCheck="false"
                                                        placeholder={"Enter PECFEST ID"}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                        <div className="form-group btn-wrap">
                            <button type="button"
                                    className="btn btn-slide"
                                    disabled={_.isEqual(this.state.maxTeam, parseInt(minTeam)) || disabled}
                                    tabIndex={"9"}
                                    onClick={() => (this._decreaseSize(minTeam))}
                            >
                                Remove Member
                            </button>
                            <button type="button"
                                    className="btn btn-slide"
                                    disabled={_.isEqual(this.state.maxTeam, parseInt(maxTeam)) || disabled}
                                    tabIndex={"9"}
                                    onClick={() => (this._increaseSize(maxTeam))}
                            >
                                Add Member
                            </button>
                            <button type="submit"
                                    className="btn btn-slide"
                                    disabled={disabled}
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
    isLoading: PropTypes.object.isRequired,
    checkRegister: PropTypes.bool,
    eventRegister: PropTypes.bool.isRequired,
    registered: PropTypes.bool
};

const mapStateToProps = state => ({
    registered: state.event.registered,
    checkRegister: state.loaders.isLoading.checkRegister,
    eventRegister: state.loaders.isLoading.eventRegister,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isLoading: state.loaders.isLoading,

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
    )(EventRegister)
);