import React, { Component, Fragment } from 'react';
import { HamburgerSpin } from 'react-animated-burgers'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from "../../actions/auth";
import NavBar from './NavBar';

class Header extends Component {
    state = {
        isActive: false,
        width: "100%"
    };
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    // isMobileDevice = () => {
    //     return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    // };

    // changewidth = (newWidth) => {
    //     this.setState(() => ({ width: newWidth }));
    // }

    toggleButton = () => {
        this.setState(({ isActive }) => ({ isActive: !isActive }));
    };

    onLogout = () => {
        this.props.logout();
        this.setState(({ isActive }) => ({ isActive: !isActive }))
    };


    render() {

        return (
            <Fragment>
                <div className={"open-wrapper"}>
                    <div className="Navigation-Button"><HamburgerSpin isActive={this.state.isActive} toggleButton={this.toggleButton}
                        barColor="white" /></div>
                </div>
                <div id="myNav" className="overlay" style={{ width: this.state.isActive ? this.state.width : "0%" }}>
                    <div className="overlay-content row">
                        {this.state.isActive ? <NavBar toggleButton={this.toggleButton} onLogout={this.onLogout} /> : ""}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, { logout })(Header);