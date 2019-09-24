import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { update } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import anime from 'animejs';
import {getBackgroundImage} from "../../utils/BackgroundUtils";
import moment from "moment";
class ExtraDetails extends Component {
    state = {
        firstName: undefined,
        lastName: undefined,
        contactNumber: undefined,
        accommodation: false,
        college: undefined,
        address: undefined,
        yearOfStudy: "1",
        gender: undefined
    };
    static propTypes = {
        update: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        createMessage: PropTypes.func.isRequired,
        user: PropTypes.object,
        isLoading: PropTypes.bool.isRequired
    };

    componentDidMount() {
        document.body.style.backgroundImage = `url(${getBackgroundImage(
            moment().hour()
        )})`;
        const timeline = anime.timeline();
        timeline.add({
            targets: '.main, .form-group',
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutElastic',
            delay: (el, i, l) => i * 200
        });
        const {user} = this.props;
        if(user !== null){
            this._setState(user);
        }
    }

    _setState = ({first_name, last_name, participant }) => {
        const {contactNumber, accommodation, college, address, yearOfStudy, gender} = participant;
        console.log(typeof(accommodation), accommodation);
        this.setState(() => ({
            firstName: first_name,
            lastName: last_name,
            contactNumber: contactNumber,
            accommodation: accommodation,
            college: college,
            address: address,
            yearOfStudy: yearOfStudy,
            gender: gender.toString()
        }));
    };

    onChange = e => {
        const key = e.target.name;
        const val = e.target.value;
        if (key === "firstName" || key === "lastName" || key === "college" || key === "address") {
            this.setState(() => ({ [key]: val.toUpperCase() }));
        }
        else {
            this.setState(() => ({ [key]: val }));
        }
    };

    onAccommodationChange = e => {
        if (e.target.checked) {
            this.setState(() => ({ accommodation: true }));
        }
        else {
            this.setState(() => ({ accommodation: false }));
        }
    };

    isValidName = (name) => {
        let res = name.split(" ");
        if (res.length > 1)
            return false;
        return name.length > 2;
    };

    isValidCollege = (college) => {
        return college.length > 2;
    };

    isValidNumber = (number) => {
        return number.toString().match(/^(0)?([5-9][0-9]{9})$/);
    };

    onSubmit = (e) => {
        e.preventDefault();
        let errors = [];
        const { firstName, lastName, contactNumber, accommodation, college, address, yearOfStudy, gender } = this.state;
        if (!this.isValidName(firstName)) {
            errors.push("First Name");
        }
        if (!this.isValidName(lastName)) {
            errors.push("Last Name");
        }
        if (!this.isValidNumber(contactNumber)) {
            errors.push("Contact Number");
        }
        if (!this.isValidCollege(college)) {
            errors.push("College");
        }
        if (!this.isValidCollege(address)) {
            errors.push("Address");
        }
        if (gender === undefined) {
            errors.push(("Gender"));
        }
        if (errors.length > 0) {
            const lastMessage = errors.length > 1 ? " are invalid." : " is invalid.";
            const updateErrorMessage = errors.join(", ") + lastMessage;
            this.props.createMessage({ updateErrorMessage });
            return;
        }
        const id = this.props.user.id;
        const user = { id, firstName, lastName, contactNumber, accommodation, college, address, yearOfStudy, gender, firstTimer: false };
        console.log(user);
        this.props.update(user);
    };

    render() {
        const { firstName, lastName, contactNumber, accommodation, college, address, yearOfStudy, gender } = this.state;
        console.log(accommodation, typeof(accommodation));
        const { isLoading, isAuthenticated } = this.props;
        if (!isAuthenticated) {
            return <Redirect to="/login" />
        }
        return (
            <div className="col-md-8 m-auto">
                <div className="mt-5 main">
                    <h2 className="text-center">Profile</h2>
                    <br />
                    <form autoComplete={"off"} onSubmit={this.onSubmit}>
                        <div className="row row-break">
                            <div className="form-group col-md-6">
                                <label>First Name</label>
                                <div className="input-outer">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        name="firstName"
                                        onChange={this.onChange}
                                        required
                                        value={firstName}
                                        tabIndex={"1"}
                                        spellCheck="false"
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Last Name</label>
                                <div className="input-outer">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        name="lastName"
                                        onChange={this.onChange}
                                        required
                                        value={lastName}
                                        tabIndex={"2"}
                                        spellCheck="false"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row row-break">
                            <div className="form-group col-md-6">
                                <label>College</label>
                                <div className="input-outer">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        name="college"
                                        onChange={this.onChange}
                                        required
                                        value={college}
                                        tabIndex={"3"}
                                        spellCheck="false"
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Year of Study</label>
                                <div className="input-outer">
                                    <select className="form-control input"
                                        name="yearOfStudy"
                                        onChange={this.onChange}
                                        required
                                        value={yearOfStudy}
                                        tabIndex={"4"}
                                    >
                                        <option value={"1"}>1</option>
                                        <option value={"2"}>2</option>
                                        <option value={"3"}>3</option>
                                        <option value={"4"}>4</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row row-break">
                            <div className="form-group col-md-6">
                                <label>Address</label>
                                <div className="input-outer">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        name="address"
                                        onChange={this.onChange}
                                        required
                                        value={address}
                                        tabIndex={"5"}
                                        spellCheck="false"
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Contact Number</label>
                                <div className="input-outer">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        name="contactNumber"
                                        onChange={this.onChange}
                                        required
                                        value={contactNumber}
                                        tabIndex={"6"}
                                        spellCheck="false"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Gender&nbsp; &nbsp; &nbsp;
                            <label className={"radio-inline"}><input
                                    type="radio"
                                    name="gender"
                                    required
                                    value="0"
                                    checked={gender === "0"}
                                    onChange={this.onChange}
                                    tabIndex={"7"}
                                /> Male &nbsp; &nbsp; </label>
                                <label className={"radio-inline"}><input
                                    type="radio"
                                    name="gender"
                                    value="1"
                                    checked={gender === "1"}
                                    onChange={this.onChange}
                                /> Female &nbsp; &nbsp; </label>
                                <label className={"radio-inline"}><input
                                    type="radio"
                                    name="gender"
                                    value="2"
                                    checked={gender === "2"}
                                    onChange={this.onChange}
                                /> Other &nbsp; </label>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className={"checkbox-inline"}><input
                                type="checkbox"
                                name="accommodation"
                                onChange={this.onAccommodationChange}
                                value={accommodation}
                                checked={accommodation}
                                tabIndex={"8"}
                            />Accommodation Required</label>

                        </div>
                        <div className="form-group">
                            <button type="submit"
                                    className="btn btn-slide"
                                    disabled={isLoading.update}
                                    tabIndex={"9"}>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isLoading: state.loaders.isLoading
});

export default withRouter(connect(mapStateToProps, { update, createMessage })(ExtraDetails));