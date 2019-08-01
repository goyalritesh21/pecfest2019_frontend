import React, { Component } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import Loader from "../common/Loader";
export class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        createMessage: PropTypes.func.isRequired,
        user: PropTypes.object,
        isLoading: PropTypes.bool.isRequired
    };

    onChange = e => {
        const key = e.target.name;
        const val = e.target.value;
        this.setState(() => ({ [key]: val }));
        if (key === 'username') {
            this.setState(() => ({ username: val.toUpperCase() }));
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state;
        if (password !== password2) {
            this.props.createMessage({ passwordsNotMatch: 'Passwords do not match.' })
        }
        else {
            const user = { username: username.toLowerCase(), email, password };
            this.props.register(user);
        }

    };
    redirectToLogin = () => {
        this.props.history.push(`/login`)
    }

    render() {
        const { isAuthenticated, user, isLoading } = this.props;
        if (isAuthenticated) {
            if (user !== null && !user.participant.firstTimer) {
                return <Redirect to="/" />
            }
            else {
                return <Redirect to="/update" />
            }
        }
        if (isLoading) {
            return (<Loader />)
        }
        const { username, email, password, password2 } = this.state;
        let randIdName = "username" + new Date().getTime().toString();

        return (
            <div className="col-md-6 m-auto upper-padding-register">
                <div className="main">
                    <h2 className="text-center">Register</h2>
                    <br />
                    <form autoComplete="off" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <div className="input-outer">
                                <input 
                                    type="hidden" 
                                    name="username"
                                    value={username}
                                />
                                <input
                                    type="text"
                                    className="form-control input"
                                    name={randIdName}
                                    onChange={this.onChange}
                                    value={username}
                                    tabIndex="1"
                                    spellCheck="false"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <div className="input-outer">
                                <input 
                                    type="hidden" 
                                    name="email"
                                    value={email}
                                />
                                <input
                                    type="email"
                                    className="form-control input"
                                    name={randIdName}
                                    onChange={this.onChange}
                                    value={email}
                                    tabIndex="2"
                                    spellCheck="false"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-outer">
                                <input 
                                    type="hidden" 
                                    name="password"
                                    value={password}
                                />
                                <input
                                    type="password"
                                    className="form-control input"
                                    name={randIdName}
                                    onChange={this.onChange}
                                    value={password}
                                    tabIndex="3"
                                    spellCheck="false"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="input-outer">
                                <input 
                                    type="hidden" 
                                    name="password2"
                                    value={password2}
                                />
                                <input
                                    type="password"
                                    className="form-control input"
                                    name={randIdName}
                                    onChange={this.onChange}
                                    value={password2}
                                    tabIndex="4"
                                    spellCheck="false"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-slide" tabIndex="5">
                                Register
                                </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isLoading: state.auth.isLoading
});

export default withRouter(connect(mapStateToProps, { register, createMessage })(Register));
