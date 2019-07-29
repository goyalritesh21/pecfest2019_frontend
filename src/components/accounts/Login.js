import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Loader from "../common/Loader";
export class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object,
        isLoading : PropTypes.bool.isRequired
    };

    onChange = e => {
        const key = e.target.name;
        const val = e.target.value;
        this.setState(() => ({ [key]: val }));
        if(key === 'username')
        {
            this.setState(() => ({username: val.toUpperCase()}));
        }

    };

    onSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.login(username.toLowerCase(), password);
    };

    render() {
        const {isAuthenticated, user, isLoading} = this.props;
        if (isAuthenticated  ) {
            if(user!== null && !user.participant.firstTimer) {

                return <Redirect to="/"/>
            }
            else {
                return <Redirect to="/update"/>
            }
        }
        if(isLoading){
            return (<Loader/>)
        }
        const { username, password } = this.state;
        return (
            <div className="col-md-6 m-auto upper-padding">
                <div className="mt-5 main">
                    <h2 className="text-center">Login</h2>
                    <br />
                    <form autoComplete="off" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <div className="input-outer">
                                <input
                                    type="text"
                                    className="form-control input"
                                    name="username"
                                    onChange={this.onChange}
                                    value={username}
                                    tabIndex="1"
                                    id="username"
                                    spellCheck="false"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-outer">
                                <input
                                    type="password"
                                    className="form-control input"
                                    name="password"
                                    onChange={this.onChange}
                                    value={password}
                                    tabIndex="2"
                                    autoComplete={"password"}
                                    spellCheck="false"
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group">
                            <button type="submit" className="btn btn-slide" tabIndex="3">
                                Login
                            </button>
                        </div>
                        <p>
                            Don't have an account? <Link tabIndex="4" to="/register">Register</Link>
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

export default connect(mapStateToProps, { login })(Login);
