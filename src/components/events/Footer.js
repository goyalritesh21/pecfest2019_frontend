import React from "react";

export default (props) => {
    return (
        <div className="container" id={"footer"}>
            <p className="txt-railway">- Event Coordinators -</p>
            <br/>
            <a href={"https://www.facebook.com/pecfestofficial/"} target={"_blank"}>
                <i id="social-fb" className="fab fa-facebook-f fa-3x social"/>
            </a>
            <a href={"https://www.instagram.com/pec.pecfest/"} target={"_blank"}>
                <i id="social-in" className="fab fa-instagram fa-3x social"/>
            </a>
            <a href={`mailto:goyalritesh21@gmail.com?Subject=Query%20regarding%20${props.name}`} target={"_top"}>
                <i id="social-ma" className="fas fa-envelope fa-3x social"/>
            </a>
        </div>
    );
}

