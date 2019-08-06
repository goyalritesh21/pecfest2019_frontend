import React, {Component, Fragment} from 'react';
import {NavLink} from "react-router-dom";
import {HamburgerSpin} from 'react-animated-burgers'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth";

const Links = [{'key': 'Home', 'value': ''}, {'key': 'Events', 'value': 'events'}, {
    'key': 'Megashows',
    'value': 'megashows'
},
    {'key': 'About', 'value': 'about'}, {'key': 'Sponsors', 'value': 'sponsors'}];

class Header extends Component {
    state = {
        isActive: false,
    };
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    toggleButton = () => {
        this.setState(({isActive}) => ({isActive: !isActive}))
    };

    onLogout = () => {
        this.props.logout();
        this.setState(({isActive}) => ({isActive: !isActive}))
    };


    render() {
        const {isAuthenticated/*##TODO##, user*/} = this.props.auth;
        return (
            <Fragment>
                <div className={"open-wrapper"}>
                    <div><HamburgerSpin isActive={this.state.isActive} toggleButton={this.toggleButton}
                                        barColor="white"/></div>
                </div>
                <div id="myNav" className="overlay" style={{width: this.state.isActive ? "100%" : "0%"}}>
                    <div className="overlay-content row">
                        <ul className={"header-list col-md-6"}>
                            {
                                Links.map((link, index) => (
                                    <li key={index} className={"slide-fade"}><NavLink exact={true}
                                                                                      onClick={this.toggleButton}
                                                                                      to={`/${link.value}`}>{link.key}</NavLink>
                                    </li>
                                ))
                            }
                            {
                                isAuthenticated ?
                                    <li className={"slide-fade"}><NavLink exact={true} onClick={this.onLogout}
                                                                          to={"/"}>Logout</NavLink></li> :
                                    <li className={"slide-fade"}><NavLink exact={true} onClick={this.toggleButton}
                                                                          to={"/login"}>Login</NavLink></li>

                            }
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {logout})(Header);