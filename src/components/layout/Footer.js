import React, { Component, Fragment } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fab);
class Footer extends Component {
    render() {
        return (
            <Fragment>
                <div className={"flex-center social-networks bounce"}>
                    <a href={"https://www.youtube.com/watch?v=BWMzcA-nBQU"}
                        target={"_blank"}
                        className={"my-youtube"}>
                        <FontAwesomeIcon icon={['fab', 'youtube']} size={"3x"} />
                    </a>
                    <a href={"https://www.facebook.com/pecfestofficial/"}
                        target={"_blank"}
                        className={"my-facebook"}>
                        <FontAwesomeIcon icon={['fab', 'facebook-square']} size={"3x"} />
                    </a>
                    <a href={"https://www.instagram.com/pec.pecfest/"}
                        target={"_blank"}
                        className={"my-instagram"}>
                        <FontAwesomeIcon icon={['fab', 'instagram']} size={"3x"} />
                    </a>
                </div>
            </Fragment>
        );
    }
}

export default Footer;