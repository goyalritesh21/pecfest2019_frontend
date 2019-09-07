import React, {Component} from "react";
import {Link, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createMessage} from "../../actions/messages";
import {login} from "../../actions/auth";
import Loader from "../common/Loader";
import anime from "animejs";

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        };
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object,
        isLoading: PropTypes.bool.isRequired,
        createMessage: PropTypes.func.isRequired
    };

    componentDidMount() {
        const timeline = anime.timeline();
        timeline.add({
            targets: ".main, .form-group, #register",
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: "easeOutElastic",
            delay: (el, i, l) => i * 200
        });
    }

    onChange = e => {
        const key = e.target.name;
        const val = e.target.value;
        if (key === "username2019") {
            this.setState(() => ({username: val.toUpperCase()}));
        } else {
            this.setState(() => ({password: val}));
        }
    };

    onSubmit = e => {
        e.preventDefault();
        const {username, password} = this.state;
        this.props.login(username.toLowerCase(), password);
    };

    render() {
        const {isAuthenticated, user, isLoading} = this.props;
        if (isAuthenticated) {
            if (user !== null && !user.participant.firstTimer) {
                return <Redirect to="/events"/>;
            } else {
                return <Redirect to="/update"/>;
            }
        }
        const {username, password} = this.state;
        const randUserId = "username2019";
        const randPassId = "password2019";

        return (
            <div>
                {isLoading ? (
                    <Loader/>
                ) : (
                    <div className="col-md-6 m-auto upper-padding">
                        <div className="mt-5 main">
                            <h2 className="text-center">Login</h2>
                            <br/>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <div className="input-outer">
                                        <input
                                            type="text"
                                            className="form-control input"
                                            name={randUserId}
                                            onChange={this.onChange}
                                            value={username}
                                            tabIndex="1"
                                            id={randUserId}
                                            spellCheck="false"
                                            autoComplete="new-username"
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
                                            tabIndex="2"
                                            id={randPassId}
                                            autoComplete="new-password"
                                            spellCheck="false"
                                            required
                                        />
                                    </div>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-slide" tabIndex="3">
                                        Login
                                    </button>
                                </div>
                                <p id={"register"}>
                                    Don't have an account? <Link to="/register">Register</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isLoading: state.auth.isLoading
});

export default withRouter(
    connect(
        mapStateToProps,
        {login, createMessage}
    )(Login)
);
