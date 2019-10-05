import React, {Component, Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faYoutube, faFacebookSquare, faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';

class Footer extends Component {
    render() {
        return (
            <Fragment>
                <div className={"flex-center social-networks bounce"}>
                    <a href={"https://www.youtube.com/watch?v=BWMzcA-nBQU"} target={"_blank"} className={"my-youtube"}>
                        <FontAwesomeIcon icon={faYoutube}
                                         size="3x"/>
                    </a>
                    <a href={"https://www.facebook.com/pecfestofficial/"} target={"_blank"} className={"my-facebook"}>
                        <FontAwesomeIcon icon={faFacebookSquare}
                                         size="3x"/>
                    </a>
                    <a href={"https://www.instagram.com/pec.pecfest/"} target={"_blank"} className={"my-instagram"}>
                        <FontAwesomeIcon icon={faInstagram}
                                         size="3x"/>
                    </a>
                </div>
                <div className={"flex-center"} onClick={this.props.onClick}>
                    <FontAwesomeIcon icon={faChevronDown}
                                     size={"3x"}
                                     style={{color: "white", cursor: "pointer"}}
                    />
                </div>
            </Fragment>
        );
    }
}

export default Footer;