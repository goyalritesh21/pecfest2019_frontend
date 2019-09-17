import React, {Component, Fragment} from 'react';
import Footer from '../../layout/Footer';
import * as PropTypes from 'prop-types'
import {connect} from "react-redux";
import {fetchBrochure} from "../../../actions/home";
import {withRouter} from 'react-router';
import _ from 'lodash';
import About from './AboutUs';
import TextBox from "../../common/TextBox";
import moment from "moment";
import {getBackgroundImage} from "../../../utils/BackgroundUtils";
import backAboutus from "../../../assets/images/Aboutus/3.jpg";


class Home extends Component {
    componentDidMount() {
        document.body.style.backgroundImage = `url(${getBackgroundImage(moment().hour())})`;
        this.props.fetchBrochure();
    }

    _redirectToRegister = () => {
        this.props.history.push("/register");
    };

    render() {
        return (
            <Fragment>
                <div className={"homePage"}>
                    <div style={{marginTop: "64px"}}>
                        <TextBox text={"PECFEST'19"}/>
                        <TextBox text={"8th - 10th November"}/>
                    </div>

                    <div className={"flexButtons"}>
                        <div className={"btn1"}
                             onClick={() => {
                                 if (!_.isEmpty(this.props.brochures)) {
                                     window.open(this.props.brochures[0].brochurePDF, '_blank');
                                     window.focus();
                                 }
                             }}>
                            <span>Brochure</span>
                        </div>

                        {!this.props.isAuthenticated && (
                            <div className="btn1" onClick={() => {
                                this._redirectToRegister()
                            }}>
                                <span>Register</span>
                            </div>
                        )}

                        <div className={"btn1"}
                             onClick={() => {
                                 if (!_.isEmpty(this.props.brochures)) {
                                     window.open("https://forms.gle/gWvUa4egFdfmzL4o8", '_blank');
                                     window.focus();
                                 }
                             }}>
                            <span>Ambassador</span>
                        </div>

                    </div>
                    <Footer/>
                </div>
                <section style={{"backgroundColor":"#696969","backgroundImage":`url(${backAboutus})`,"backgroundRepeat":"no-repeat","backgroundSize":"cover"}}>
                    <About/>
                </section>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    brochures: state.home.brochures,
    isAuthenticated: state.auth.isAuthenticated,
});

Home.propTypes = {
    brochures: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,

    fetchBrochure: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, {
    fetchBrochure,
})(Home));
;