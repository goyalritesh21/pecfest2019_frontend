import React, {Component, Fragment} from 'react';

class Footer extends Component {
    render() {
        return (
            <Fragment>
                <div className={"flex-center social-networks bounce"}>
                    <a href={"https://www.youtube.com/watch?v=BWMzcA-nBQU"} target={"_blank"}>
                        <i className={"fab fa-youtube fa-3x my-youtube"}/></a>
                    <a href={"https://www.facebook.com/pecfestofficial/"} target={"_blank"}>
                        <i className="fab fa-facebook-square fa-3x my-facebook"/></a>
                    <a href={"https://www.instagram.com/pec.pecfest/"} target={"_blank"}>
                        <i className="fab fa-instagram fa-3x my-instagram"/></a>
                </div>
            </Fragment>
        );
    }
}

export default Footer;