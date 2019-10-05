import React, {Component} from "react";
import {Link, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {register} from "../../actions/auth";
import {createMessage} from "../../actions/messages";
import anime from "animejs";
import {loadReCaptcha, ReCaptcha} from 'react-recaptcha-google'

export class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        password2: "",
        disabled: true
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        createMessage: PropTypes.func.isRequired,
        user: PropTypes.object,
        isLoading: PropTypes.bool.isRequired
    };

    componentDidMount() {
        const timeline = anime.timeline();
        timeline.add({
            targets: ".main, .form-group, #login",
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 500,
            easing: "easeOutElastic",
            delay: (el, i, l) => i * 200
        });
        loadReCaptcha();
        if (this.recaptcha) {
            // console.log("started, just a second...");
            this.recaptcha.reset();
        }
    }

    onLoadRecaptcha = () => {
        if (this.recaptcha) {
            this.recaptcha.reset();
        }
    };

    verifyCallback = (recaptchaToken) => {
        // Here you will get the final recaptchaToken!!!
        // console.log(recaptchaToken, "<= your recaptcha token");
        this.setState((prevState) => ({
            disabled: false
        }))
    };

    onChange = e => {
        const key = e.target.name;
        const val = e.target.value;
        if (key === "username2019") {
            this.setState(() => ({username: val.toUpperCase()}));
        } else if (key === "email2019") {
            this.setState(() => ({email: val}));
        } else if (key === "password2019") {
            this.setState(() => ({password: val}));
        } else if (key === "password22019") {
            this.setState(() => ({password2: val}));
        }
    };

    onSubmit = e => {
        e.preventDefault();
        const {username, email, password, password2} = this.state;
        let errors = [];
        if (username.length < 4) {
            errors.push("Invalid username");
        }
        if (password.length < 8) {
            errors.push(
                "Password must contain at least 8 characters"
            );
        }
        if (password !== password2) {
            errors.push("Passwords do not match");
        }
        if (errors.length > 0) {
            const updateErrorMessage = errors.join("\n");
            this.props.createMessage({updateErrorMessage});
            return;
        }
        const user = {username: username.toLowerCase(), email, password};
        this.props.register(user, this.props.history);
    };

    render() {
        const {isAuthenticated, user, isLoading} = this.props;
        if (isAuthenticated) {
            if (user !== null && !user.participant.firstTimer) {
                return <Redirect to="/"/>;
            } else {
                return <Redirect to="/update"/>;
            }
        }
        const {username, email, password, password2} = this.state;
        const randUserId = "username2019";
        const randPassId = "password2019";
        const randEmailId = "email2019";
        const randPassId2 = "password22019";

        return (
            <div className="col-md-6 m-auto upper-padding-register">
                <div className="main">
                    <h2 className="text-center">Register</h2>
                    <br/>
                    <form autoComplete="off" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <div className="input-outer">
                                <input
                                    type="text"
                                    className="form-control input"
                                    name={randUserId}
                                    onChange={this.onChange}
                                    value={username}
                                    id={randUserId}
                                    tabIndex="1"
                                    spellCheck="false"
                                    autoComplete="new-username"
                                    title={"This will also be your PECFEST ID"}
                                    placeholder={"Choose your PECFEST ID."}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <div className="input-outer">
                                <input
                                    type="email"
                                    className="form-control input"
                                    name={randEmailId}
                                    onChange={this.onChange}
                                    value={email}
                                    tabIndex="2"
                                    spellCheck="false"
                                    title={"Please enter valid email"}
                                    autoComplete="new-email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-outer">
                                <input
                                    type="password"
                                    className="form-control input"
                                    name={randPassId}
                                    onChange={this.onChange}
                                    value={password}
                                    tabIndex="3"
                                    spellCheck="false"
                                    title={"Password must be 8 characters long."}
                                    autoComplete="new-password"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="input-outer">
                                <input
                                    type="password"
                                    className="form-control input"
                                    name={randPassId2}
                                    onChange={this.onChange}
                                    value={password2}
                                    tabIndex="4"
                                    spellCheck="false"
                                    title={"Password must be 8 characters long."}
                                    autoComplete="new-password2"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className={"input-outer"}>
                                <ReCaptcha
                                    ref={(r) => {
                                        this.recaptcha = r;
                                    }}
                                    size="normal"
                                    render="explicit"
                                    sitekey="6LcSC7wUAAAAAGpuyaPXinDZGKfMsZpEvqvelrYu"
                                    onloadCallback={this.onLoadRecaptcha}
                                    verifyCallback={this.verifyCallback}
                                />
                            </div>
                        </div>
                        <div className="form-group">

                            <button type="submit"
                                    className="btn btn-slide"
                                    disabled={isLoading.register || this.state.disabled}
                                    tabIndex="5">
                                Register
                            </button>
                        </div>
                        <p id={"login"}>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isLoading: state.loaders.isLoading
});

export default withRouter(
    connect(
        mapStateToProps,
        {register, createMessage}
    )(Register)
);
