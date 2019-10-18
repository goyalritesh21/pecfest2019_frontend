import React, { Component, Fragment } from "react";
import Image from "react-bootstrap/Image";
import Footer from "../../layout/Footer";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchBrochure} from "../../../actions/home";
import {withRouter} from "react-router";
import _ from 'lodash';
import About from "./AboutUs";
import TextBox from "../../common/TextBox";
import moment from "moment";
import {getBackgroundImage} from "../../../utils/BackgroundUtils";
import {theme, about} from '../../../data/Home';
import pecfestLogo from "../../../assets/images/Logos/pecfestLogo100cropped.png";
import Theme from "./Theme";
import FloatingButtons from "./FloatingButtons";

class Home extends Component {
    componentDidMount() {
        document.body.style.backgroundImage = `url(${getBackgroundImage(
            moment().hour()
        )})`;
        this.overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        this.props.fetchBrochure();
    }

    componentWillUnmount() {
        document.body.style.overflow = this.overflow;
    }

    _redirectToRegister = () => {
        this.props.history.push("/register");
    };
    render() {
        return (
            <Fragment>
                <div className={"homePage"} ref={(r) => (this.homeRef = r)}
                     style={{
                         overflow: "hidden"
                     }}
                >
                    <div style={{ /*marginTop: "64px"*/ }}>
                        <Image src = { pecfestLogo } className = "img img-responsive" />
                        <TextBox text={"PECFEST'19"} large={true}/>
                        <TextBox text={"8th - 10th November"}/>
                    </div>

                    <div className="theme">
                        A Tropical Extravaganza
                    </div>

                    <div className={"flexButtons"}>
                        <FloatingButtons
                            title={"Brochure"}
                            onClick={() => {
                            if (!_.isEmpty(this.props.brochures)) {
                                window.open(this.props.brochures[0].brochurePDF, "_blank");
                                window.focus();
                            }
                        }}/>
                        {!this.props.isAuthenticated && (
                            <FloatingButtons title={"Register"} onClick={() => {
                                this._redirectToRegister();
                            }}/>
                        )}
                        <FloatingButtons title={"Ambassador"} onClick={() => {
                            window.open("https://forms.gle/gWvUa4egFdfmzL4o8", "_blank");
                            window.focus();
                        }}/>
                        <FloatingButtons title={"Mr. & Ms. PECfest"} onClick={() => {
                            window.open("https://forms.gle/THR4ofdrXnw7rtax7", "_blank");
                            window.focus();
                        }}/>
                    </div>

                    <Footer onClick={() => this.themeRef.scrollIntoView({
                        behavior: "smooth",
                        inline: "center"
                    })}/>

                </div>
                <section ref={(r) => (this.themeRef = r)}
                style ={{position: "relative"}}>
                    <Theme
                        title={"Theme"}
                        content={theme}
                        direction={"down"}
                        onScrollIntoView={() => this.aboutRef.scrollIntoView({
                            behavior: "smooth",
                            inline: "center"
                        })}
                    />
                </section>
                <section ref={(r) => (this.aboutRef = r)}
                         style ={{position: "relative"}}>
                    <About
                        title={"About Us"}
                        content={about}
                        direction={"up"}
                        onScrollIntoView={() => this.homeRef.scrollIntoView({
                        behavior: "smooth",
                        inline: "center"
                    })}/>
                </section>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    brochures: state.home.brochures,
    isAuthenticated: state.auth.isAuthenticated
});

Home.propTypes = {
    brochures: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,

    fetchBrochure: PropTypes.func.isRequired
};

export default withRouter(
    connect(
        mapStateToProps,
        {
            fetchBrochure
        }
    )(Home)
);
