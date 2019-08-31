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
        const {eventCategory, eventType, eventCategories, eventTypes} = this.props;

        const selectedEventCategory = _.find(eventCategories, item => {
            return _.isEqual(item.id, parseInt(eventCategory));
        });

        const selectedEventType = _.find(eventTypes, item => {
            return _.isEqual(item.id, parseInt(eventType));
        });

        return (
            <div className="Events-item__titlebar">
                <a className="Events-item__titlebar-back"
                   onClick={() => {
                       removeQuery(this.props, 'eventType');
                       removeQuery(this.props, 'event');
                       this._startCloseAnimation();
                   }}>
                    <FontAwesomeIcon icon={faArrowLeft} className="Events-item__titlebar-icon"/>
                </a>
                {!_.isEmpty(selectedEventCategory) && (
                    <a onClick={() => {
                        removeQuery(this.props, 'eventType');
                        removeQuery(this.props, 'event');
                    }}>
                        <h3 className="Events-item__titlebar-title"
                            ref={this.contentTitleRef}>
                            <Charming letters={selectedEventCategory.name} render={(letters) => (
                                <div ref={this.lettersRef}>{letters}</div>
                            )}/>
                        </h3>
                    </a>
                )}
                {!_.isEmpty(selectedEventType) && (
                    <div style={{margin: "auto 12px"}}>
                        <FontAwesomeIcon icon={faChevronRight} className="Events-item__titlebar-icon"/>
                    </div>
                )}
                {!_.isEmpty(selectedEventType) && (
                    <a onClick={() => {
                        removeQuery(this.props, 'event');
                    }}>
                        <h3 className="Events-item__titlebar-title">
                            <Charming letters={selectedEventType.name} render={(letters) => (
                                <div>{letters}</div>
                            )}/>
                        </h3>
                    </a>
                )}
            </div>
        );
    };

    renderEvents = () => {
        const {event, eventType, events} = this.props;

        const filteredEvents = _.filter(events, item => {
            return _.isEmpty(item.eventType.id, eventType.id)
        });

        const color = event % 2 === 0 ? '#fe628e' : '#6265fe';
        const selectedEventStyle = {position: 'relative', color: color};

        return (
            <div className="container-fluid menu menu--adsila" style={{height: 'calc(100vh - 100px)'}}>
                {filteredEvents.map(item => (
                    <div className="row menu__item"
                         key={item.id}
                         onClick={() => {
                             addQuery(this.props, {event: item.id})
                         }}>
                        <a
                            className="menu__item-name"
                            style={_.isEqual(event, item.id) ? selectedEventStyle : {}}>
                            {event.name}
                            {_.isEqual(event, item.id) ?
                                <div
                                    className="menu__item-name__visible"
                                    style={{backgroundColor: color}}/> :
                                []
                            }
                        </a>
                    </div>
                ))}
            </div>
        );
    };

    renderEventTypes = () => {
        const {eventCategory, eventTypes} = this.props;

        console.log(eventCategory, eventTypes);

        const filteredEventTypes = _.filter(eventTypes, item => {
            return _.isEqual(item.eventCategory.id, parseInt(eventCategory));
        });

        console.log(filteredEventTypes);

        return (
            <div className="container-fluid menu menu--adsila">
                {filteredEventTypes.map(item => (
                    <div className="menu__item"
                         onClick={() => {
                             addQuery(this.props, {eventType: item.id})
                         }}>
                        <a className="menu__item-name" key={item.id}>{item.name}</a>
                    </div>
                ))}
            </div>
        );
    };

    renderSideBar = () => {
        const {eventType} = this.props;

        if (!_.isEmpty(eventType)) {
            return this.renderEvents();
        }

        return this.renderEventTypes();
    };

    renderMainContent = () => {
        const {eventCategory, eventCategories} = this.props;

        const selectedEventCategory = _.find(eventCategories, item => {
            return _.isEqual(item.id, parseInt(eventCategory));
        });

        if (!_.isEmpty(selectedEventCategory)) {
            return [];
        }

        return (
            <div style={{width: "100%"}}>
                <div className="Events-item__titlebar" style={{padding: "3vh 2rem"}}>
                    <h2 className="Events-item__titlebar-title">
                        <Charming letters={selectedEventCategory.name} render={(letters) => (
                            <div>{letters}</div>
                        )}/>
                    </h2>
                </div>
                <div className="container-fluid">
                </div>
            </div>
        );
    };

    renderEventTypeContent = () => {
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
        const {item, eventTypes} = this.props;
        const categories = _.filter(eventTypes, type => {
            return _.isEqual(eventTypes.category, item.url);
        });

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
        const {eventCategory, eventType, event, eventCategories, eventTypes, events} = this.props;

        if (!_.isEmpty(event)) {
            return this.renderEventContent();
        } else if (!_.isEmpty(eventType)) {
            return this.renderEventTypeContent();
        }

        return this.renderMainContent();
    };

    render() {
        const {eventCategory} = this.props;

        return (
            <article className="Events-item Events-item--current">
                <div className="Events-item__img"
                     style={{
                         backgroundImage: `url(${eventCategory.coverImage})`,
                         overflow: 'hidden'
                     }}>
                    {this.renderTitleBar()}
                    {this.renderSideBar()}
                </div>
                <div className="Events-item__content">
                    {this.renderContent()}
                </div>
            </article>
        );
    }
}

ContentItem.protoTypes = {
    eventCategory: PropTypes.number,
    eventType: PropTypes.number,
    event: PropTypes.number,

    eventCategories: PropTypes.array.isRequired,
    eventTypes: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
};

export default ContentItem;