import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCategory, loadCategories, loadEvents, clearEvents } from "../../actions/events";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { categoryDict } from "../../data/events";
import { Link } from 'react-router-dom';
import Loader from "../common/Loader";
const Profile = '../../images/profile.jpg';
const Profile1 = '../../images/profile1.jpg';
const Techback = '../../images/techback.jpg';
const Cultback = '../../images/cultback.jpg';
const Profile2 = '../../images/profile2.jpg';
const Lectback = '../../images/lectback.jpg';
const Profile3 = '../../images/profile3.jpg';
const Workback = '../../images/workback.jpg';

class Types extends Component {
    state = {
        name: this.props.category,
        img: null,
        imgback: null,
        categories: []
    };

    static propTypes = {
        category: PropTypes.string,
        setCategory: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
        loadCategories: PropTypes.func.isRequired,
        loadEvents: PropTypes.func.isRequired,
        events: PropTypes.array.isRequired,
        clearEvents: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { category } = this.props.match.params;
        if (category) {
            this.setState(() => ({
                name: category
            }));
        }
        this.props.setCategory(category);
        this.props.loadCategories(categoryDict[category].toLowerCase());
        this.getImage();
    }

    componentWillUnmount() {
        this.props.clearEvents();
    }

    loadCategoryEvents = (id) => {
        const subCategory = this.state.name + id;
        this.props.loadEvents(subCategory);
    };

    getImage = () => {
        let { category } = this.state;
        if (!category) {
            category = this.props.match.params.category
        }
        if (category === 'tech') {
            this.setState(() => ({ img: Profile, imgback: Techback }));
        }
        else if (category === 'cult') {
            this.setState(() => ({ img: Profile1, imgback: Cultback }));
        }
        else if (category === 'lect') {
            this.setState(() => ({ img: Profile2, imgback: Lectback }));
        }
        else if (category === 'work') {
            this.setState(() => ({ img: Profile3, imgback: Workback }));
        }

    };

    render() {
        const { name, img, imgback } = this.state;
        const { categories, events } = this.props;
        if (!categories) {
            return (<Loader />);
        }
        return (
            <div>
                <div className="sidebar-menu hidden-xs hidden-sm">
                    <div className="top-section">
                        <div className="profile-image">
                            <LazyLoadImage
                                alt={categoryDict[name]}
                                src={img}
                                effect="blur"
                                height={"100%"}
                                delayTime={500}
                            />
                        </div>
                        <h3 className="profile-title">Categories</h3>
                        {/* <p className="profile-description">Pecfest</p> */}
                    </div>
                    <div className="main-navigation">
                        <ul className="navigation">
                            {categories.length > 0 && categories.map(([id, name]) => (
                                <li key={id}>
                                    <a onClick={() => this.loadCategoryEvents(id)}>
                                        <i className="fa fa-paperclip" /> {name.charAt(0).toUpperCase() + name.slice(1)}
                                    </a>
                                </li>
                            ))
                            }
                        </ul>
                    </div>

                </div>

                <section id="landing-section">
                    <div className="landing banner-bg" id="top" style={{ backgroundImage: `url(${imgback})` }}>
                        <div className="banner-overlay" />
                        <div className="logo">

                            <h1>{categoryDict[name]} Events | Pecfest</h1>
                            <h3>2K19</h3>
                        </div>
                        <div className="darkness" />
                        {events.length > 0 && (<div><i className="fa fa-chevron-down fa-3x go-down" aria-hidden="true" /></div>)}
                    </div>
                </section>

                {events.length > 0 ? (
                    <section id="events-section">

                        <div className="container">
                            <div>
                                <h2 className="headline-section wow jackInTheBox">EVENTS</h2>

                                <div className="events">
                                    {events.map(({ id, eventID, name }) => (

                                        <div key={id} data-wow-duration="1s" className="event">
                                            <Link to={`/event/${eventID}`}>
                                                <div className="card">
                                                    <div className="card-item card-front">
                                                        <img src="./img/events/techno_buzz_comp.jpg" alt={name} />
                                                        <div className="headText">
                                                            <p>{name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="card-item card-back">
                                                        <img src="./img/events/techno_buzz_comp.jpg" alt={name} />
                                                        <div className="eventName">
                                                            <p>{name}</p>
                                                        </div>
                                                        <div className="headText">
                                                            <p>Know More</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                    ))
                                    }


                                </div>
                            </div>
                        </div>
                    </section>) : (
                        null
                    )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    category: state.events.category,
    categories: state.events.categories,
    events: state.events.events
});

export default connect(mapStateToProps, { setCategory, loadCategories, loadEvents, clearEvents })(Types);