import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth";
import anime from 'animejs';
import {NavLink} from 'react-router-dom';
import {NavLinks} from '../../data/NavLinks';

class Navbar extends Component {
    componentDidMount() {
        anime({
            targets: '.slide-fade',
            translateY: ['-100px', '0%'],
            opacity: [0, 1],
            delay: (el, i, l) => 500 + i * 100,
            easing: 'easeOutExpo'
        });
    }

    static propTypes = {
        logout: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }

    render() {
        const {isAuthenticated/*##TODO##, user*/} = this.props.auth;
        return (
            <ul className={"header-list"} style={{padding: 0}}>
                {
                    NavLinks.map((link, index) => (
                        <li key={index} className={"slide-fade"}><NavLink exact={true}
                                                                          onClick={this.props.toggleButton}
                                                                          to={`/${link.to}`}>{link.name}</NavLink>
                        </li>
                    ))
                }
                {
                    isAuthenticated ?
                        <li className={"slide-fade"}><NavLink exact={true} onClick={this.props.onLogout}
                                                              to={"/"}>Logout</NavLink></li> :
                        <li className={"slide-fade"}><NavLink exact={true} onClick={this.props.toggleButton}
                                                              to={"/login"}>Login</NavLink></li>

                }
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);