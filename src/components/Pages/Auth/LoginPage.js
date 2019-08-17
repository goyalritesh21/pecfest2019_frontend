import React, { Component } from 'react';
import Login from '../../accounts/Login';
import BackgroundImage from "../../../images/sides.png"

class LoginPage extends Component {
    componentDidMount() {
        document.body.style.backgroundImage = `url(${BackgroundImage})`;
    }
    render() {
        return (
            <Login />
        );
    }
}

export default LoginPage;