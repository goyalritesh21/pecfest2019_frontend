import React, { Component } from 'react';
import Login from '../../accounts/Login';
import {getBackgroundImage} from "../../../utils/BackgroundUtils";
import moment from "moment";

class LoginPage extends Component {
    componentDidMount() {
        document.body.style.backgroundImage = `url(${getBackgroundImage(
            moment().hour()
        )})`;
    }
    render() {
        return (
            <Login />
        );
    }
}

export default LoginPage;