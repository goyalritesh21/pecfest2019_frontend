import React, {Component} from 'react';
import {getRandomFloat} from "../../utils/MathUtils";
import {Ease, Expo, TimelineMax} from "gsap";
import BezierEasing from "bezier-easing";
import * as PropTypes from 'prop-types';
import _ from "lodash";
import {addQuery, ANIMATION_STATE, removeQuery} from "../../utils/Utils";
import {categoryEvent, events} from "../../data/Events";
import Charming from "react-charming";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import Countdown from "./CountDownTimer";
import moment from "moment";

class ContentItem extends Component {
    constructor(props) {
        super(props);

        this.contentTitleRef = React.createRef();

        this.state = {
            selectedCategory: _.isEmpty(props.subcategory) ? -1 : props.subcategory,
            selectedEvent: _.isEmpty(props.event) ? -1 : props.event,
            knowMore: {
                description: false,
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(prevProps.animationState, this.props.animationState)) {
            if (_.isEqual(this.props.animationState, ANIMATION_STATE['OPEN'])) {
                this._startOpenAnimation();
            } else if (_.isEqual(this.props.animationState, ANIMATION_STATE['OPEN'])) {
                this._startCloseAnimation();
            }
        }

        if (!_.isEqual(prevProps.subcategory, this.props.subcategory)) {
            this.setState({selectedCategory: _.has(this.props, 'subcategory') ? this.props.subcategory : -1});
        }

        if (!_.isEqual(prevProps.event, this.props.event)) {
            this.setState({selectedEvent: _.has(this.props, 'event') ? this.props.event : -1});
        }
    }

    animateCharmingEnter = (ref, onComplete) => {
        const duration = 1.2;
        const columnsStagger = 0;
        const columnsTotal = 4;

        const titleLettersDOM = ref.current.querySelectorAll('span');

        new TimelineMax({onComplete})
        // Animate the content item title letters
            .set(titleLettersDOM, {
                opacity: 0
            }, duration + duration * columnsStagger * columnsTotal)
            .staggerTo(titleLettersDOM, duration, {
                ease: Expo.easeOut,
                startAt: {
                    cycle: {
                        y: (i, _) => i % 2 === 0 ? getRandomFloat(-35, -15) : getRandomFloat(15, 35),
                        rotation: getRandomFloat(-20, 0)
                    }
                },
                y: 0,
                rotation: 0,
                opacity: 1
            }, -0.01, duration + duration * columnsStagger * columnsTotal);
    };

    animateCharmingExit = (ref, onComplete) => {
        const duration = 1;

        const titleLettersDOM = this.contentTitleRef.current.querySelectorAll('span');

        new TimelineMax({onComplete}).staggerTo(titleLettersDOM, duration * 0.6, {
            ease: new Ease(BezierEasing(0.775, 0.05, 0.87, 0.465)),
            cycle: {
                y: (i, _) => i % 2 === 0 ? getRandomFloat(-35, -15) : getRandomFloat(15, 35),
                rotation: getRandomFloat(-20, 0)
            },
            opacity: 0
        }, 0.01, 0)
    };

    _startOpenAnimation = () => {
        console.log('ContentItem : _startOpenAnimation');

        const {onAnimationComplete} = this.props;

        this.animateCharmingEnter(this.contentTitleRef, () => {
            onAnimationComplete(ANIMATION_STATE['OPEN']);
        });
    };

    _startCloseAnimation = () => {
        console.log('ContentItem : _startCloseAnimation');
        const {onBackPress, onAnimationComplete} = this.props;

        this.animateCharmingExit(this.contentTitleRef, () => {
            onAnimationComplete(ANIMATION_STATE['OPEN']);
            onBackPress();
        });
    };

    renderTitleBar = () => {
        const {item} = this.props;
        const categories = Object.keys(categoryEvent[item.title]);
        const {selectedCategory} = this.state;

        return (
            <div className="Events-item__titlebar">
                <a className="Events-item__titlebar-back"
                   onClick={() => {
                       removeQuery(this.props, 'subcategory');
                       removeQuery(this.props, 'event');
                       this._startCloseAnimation();
                   }}>
                    <FontAwesomeIcon icon={faArrowLeft} className="Events-item__titlebar-icon"/>
                </a>
                <a onClick={() => {
                    removeQuery(this.props, 'subcategory');
                    removeQuery(this.props, 'event');
                }}>
                    <h3 className="Events-item__titlebar-title"
                        ref={this.contentTitleRef}>
                        <Charming letters={item.title} render={(letters) => (
                            <div ref={this.lettersRef}>{letters}</div>
                        )}/>
                    </h3>
                </a>

                {selectedCategory >= 0 && (
                    <div style={{margin: "auto 12px"}}>
                        <FontAwesomeIcon icon={faChevronRight} className="Events-item__titlebar-icon"/>
                    </div>
                )}
                {selectedCategory >= 0 && (
                    <a onClick={() => {
                        removeQuery(this.props, 'event');
                    }}>
                        <h3 className="Events-item__titlebar-title">
                            <Charming letters={categories[selectedCategory]} render={(letters) => (
                                <div>{letters}</div>
                            )}/>
                        </h3>
                    </a>
                )}
            </div>
        );
    };

    renderEvents = () => {
        const {item} = this.props;
        const {selectedCategory, selectedEvent} = this.state;
        const categories = Object.keys(categoryEvent[item.title]);
        const events = categoryEvent[item.title][categories[selectedCategory]];
        const color = selectedEvent % 2 == 0 ? '#fe628e' : '#6265fe';
        const selectedEventStyle = {position: 'relative', color: color};

        return (
            <div className="container-fluid menu menu--adsila" style={{height: 'calc(100vh - 100px)'}}>
                {events.map((event, key) => (
                    <div className="row menu__item"
                         onClick={() => {
                             addQuery(this.props, {event: key})
                         }}>
                        <a
                            className="menu__item-name"
                            key={key}
                            style={_.isEqual(selectedEvent, key.toString()) ? selectedEventStyle : {}}>
                            {event}
                        
                            {_.isEqual(selectedEvent, key.toString()) ? 
                                <div 
                                className="menu__item-name__visible"
                                style = {{backgroundColor: color}}/> : 
                                () => {return;}
                            }
                        
                        </a>
                    </div>
                ))}
            </div>
        );
    };

    renderSubCategories = () => {
        const {item} = this.props;
        const categories = Object.keys(categoryEvent[item.title]);

        return (
            <div className="container-fluid menu menu--adsila">
                {categories.map((category, key) => (
                    <div className="menu__item"
                         onClick={() => {
                             addQuery(this.props, {subcategory: key})
                         }}>
                        <a className="menu__item-name" key={key}>{category}</a>
                    </div>
                ))}
            </div>
        );
    };

    renderCategories = () => {
        const {selectedCategory} = this.state;
        if (!_.isEmpty(selectedCategory)) {
            return this.renderEvents();
        }

        return this.renderSubCategories();
    };

    renderMainContent = () => {
        const {item} = this.props;

        return (
            <div style={{width: "100%"}}>
                <div className="Events-item__titlebar" style={{padding: "3vh 2rem"}}>
                    <h2 className="Events-item__titlebar-title">
                        <Charming letters={item.title} render={(letters) => (
                            <div>{letters}</div>
                        )}/>
                    </h2>
                </div>
                <div className="container-fluid">
                </div>
            </div>
        );
    };

    renderCategoryContent = () => {
        const {item} = this.props;
        const categories = Object.keys(categoryEvent[item.title]);
        const {selectedCategory} = this.state;

        return (
            <div style={{width: "100%"}}>
                <div className="Events-item__titlebar" style={{padding: "3vh 2rem"}}>
                    <h2 className="Events-item__titlebar-title">
                        <Charming letters={categories[selectedCategory]} render={(letters) => (
                            <div>{letters}</div>
                        )}/>
                    </h2>
                </div>
                <div className="container-fluid">
                </div>
            </div>
        );
    };

    renderEventContent = () => {
        const {item} = this.props;
        const categories = Object.keys(categoryEvent[item.title]);
        const {selectedCategory, selectedEvent, knowMore} = this.state;
        const event = events[selectedEvent];

        const subcategory = categories[selectedCategory];

        return (
            <div style={{width: "100%"}}>
                <div className="Events-item__titlebar" style={{padding: "3vh 2rem"}}>
                    <h2 className="Events-item__titlebar-title">
                        <Charming letters={categoryEvent[item.title][subcategory][selectedEvent]} render={(letters) => (
                            <div>{letters}</div>
                        )}/>
                    </h2>
                </div>
                <div className="container-fluid">
                    <div className="row" style={{justifyContent: "center"}}>
                        <Countdown timeTillDate={event.dateTime}/>
                    </div>
                    <div className="Events-item__content-container container-fluid">
                        <div className="Events-item__content-row row">
                            <h4>Description</h4>
                            <div>
                                {knowMore.description ?
                                    event.description.map((text, index) => (
                                        <p key={index}>{text}</p>
                                    )) :
                                    <p>{event.shortDescription}</p>}
                                <a onClick={() => {
                                    this.setState({
                                        knowMore: {
                                            ...knowMore,
                                            description: !knowMore.description
                                        }
                                    });
                                }}>{knowMore.description ? "Know Less..." : "Know More..."}</a>
                            </div>
                        </div>
                        <div className="Events-item__content-row row">
                            <h4>Rules</h4>
                            <div>
                                <ul style={{listStyleType: "circle"}}>
                                    {event.rules.map((rule, index) => (
                                        <li key={index}>{rule}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="Events-item__content-row row">
                            <h4>Venue</h4>
                            <div>
                                <ul>
                                    <li><label>Location:</label> {event.locations}</li>
                                    <li><label>Day:</label> {moment(event.dateTime).format()}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="Events-item__content-row row">
                            <h4>Prizes</h4>
                            <div>
                                <p>{event.prize}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    renderContent = () => {
        const {selectedCategory, selectedEvent} = this.state;

        if (!_.isEmpty(selectedEvent)) {
            return this.renderEventContent();
        } else if (!_.isEmpty(selectedCategory)) {
            return this.renderCategoryContent();
        }

        return this.renderMainContent();
    };

    render() {
        const {item} = this.props;

        return (
            <article className="Events-item Events-item--current">
                <div className="Events-item__img"
                     style={{
                         backgroundImage: `url(${item.coverImage})`,
                         overflow: 'hidden'
                     }}>
                    {this.renderTitleBar()}
                    {this.renderCategories()}
                </div>
                <div className="Events-item__content">
                    {this.renderContent()}
                </div>
            </article>
        );
    }
}

ContentItem.protoTypes = {
    category: PropTypes.number.isRequired,
    subcategory: PropTypes.number,
    event: PropTypes.number,
};

export default ContentItem;