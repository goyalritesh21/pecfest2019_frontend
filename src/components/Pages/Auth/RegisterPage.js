import React, {Component} from 'react';
import Register from '../../accounts/Register';
import BackgroundImage from "../../../images/sides.png"

class RegisterPage extends Component {
    componentDidMount() {
        document.body.style.backgroundImage = `url(${BackgroundImage})`;
    }

    render() {
        return (
            <Register/>
        );
    }
}

export default RegisterPage;