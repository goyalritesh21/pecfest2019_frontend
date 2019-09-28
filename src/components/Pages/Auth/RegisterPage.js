import React, {Component} from 'react';
import Register from '../../accounts/Register';
import {getBackgroundImage} from "../../../utils/BackgroundUtils";
import moment from "moment";

class RegisterPage extends Component {
    componentDidMount() {
        document.body.style.backgroundImage = `url(${getBackgroundImage(
            moment().hour()
        )})`;
    }

    render() {
        return (
            <Register/>
        );
    }
}

export default RegisterPage;