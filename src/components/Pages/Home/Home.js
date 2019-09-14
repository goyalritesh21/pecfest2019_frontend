import React, {Component, Fragment} from 'react';
import Footer from '../../layout/Footer';
import BackgroundImage from "../../../images/sides.png"
import * as PropTypes from 'prop-types'
import {connect} from "react-redux";
import {fetchBrochure} from "../../../actions/home";
import {withRouter} from 'react-router';
import _ from 'lodash';
import About from '.././AboutUs';

class Home extends Component {

    componentDidMount() {
        document.body.style.backgroundImage = `url(${BackgroundImage})`;
        this.props.fetchBrochure();
    }

    _redirectToRegister = () => {
        this.props.history.push("/login");
    };

    render() {
        return (
            <Fragment>
                <div className={"homePage"}>
                    <svg className="Home-text" viewBox="0 0 600 150">
                        <symbol id="s-text">
                            <text textAnchor="middle" x={"50%"} y={"30%"} dy={".35em"}>
                                PECFEST' 19
                            </text>
                        </symbol>
                        <use className="Home-text" xlinkHref="#s-text"/>
                        <use className="Home-text" xlinkHref="#s-text"/>
                        <use className="Home-text" xlinkHref="#s-text"/>
                        <use className="Home-text" xlinkHref="#s-text"/>
                        <use className="Home-text" xlinkHref="#s-text"/>
                    </svg>

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
                <section>
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