import React, {Component, Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faYoutube, faFacebookSquare, faInstagram} from '@fortawesome/free-brands-svg-icons'

class Footer extends Component {
    render() {
        return (
            <Fragment>
                <div className={"flex-center social-networks bounce"}>
                    <a href={"https://www.youtube.com/watch?v=BWMzcA-nBQU"} target={"_blank"}>
                        <FontAwesomeIcon icon={faYoutube}
                                         size="3x"/>
                    </a>
                    <a href={"https://www.facebook.com/pecfestofficial/"} target={"_blank"}>
                        <FontAwesomeIcon icon={faFacebookSquare}
                                         size="3x"/>
                    </a>
                    <a href={"https://www.instagram.com/pec.pecfest/"} target={"_blank"}>
                        <FontAwesomeIcon icon={faInstagram}
                                         size="3x"/>
                    </a>
                </div>
            </Fragment>
        );
    }
}

export default Footer;