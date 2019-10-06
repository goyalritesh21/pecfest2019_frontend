import React, {Component, Fragment} from 'react';
import {getRandomFloat} from "../../utils/MathUtils";
import {Ease, Expo, TimelineMax} from "gsap";
import BezierEasing from "bezier-easing";
import * as PropTypes from 'prop-types';
import _ from "lodash";
import {ANIMATION_STATE} from "../../utils/Utils";
import Charming from "react-charming";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import Countdown from "./CountDownTimer";
import Button from '../common/Button';
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
        // console.log('ContentItem : _startOpenAnimation');

        const {onAnimationComplete} = this.props;

        this.animateCharmingEnter(this.contentTitleRef, () => {
            onAnimationComplete(ANIMATION_STATE['OPEN']);
        });
    };

    _startCloseAnimation = () => {
        // console.log('ContentItem : _startCloseAnimation');
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
                <div className="Events-item__titlebar-back"
                   onClick={() => {
                       this.props.onBackPress();
                       this._startCloseAnimation();
                   }}>
                    <FontAwesomeIcon icon={faArrowLeft} className="Events-item__titlebar-icon"/>
                </div>
                {!_.isEmpty(selectedEventCategory) && (
                    <a onClick={() => {
                        this.props.onSelectEventCategory();
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
                        this.props.onSelectEventType();
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
            return _.isEqual(item.eventType.id, parseInt(eventType));
        });

        const color = event % 2 === 0 ? '#fe628e' : '#6265fe';
        const selectedEventStyle = {position: 'relative', color: color};

        return (
            <div className="container-fluid menu menu--adsila" style={{height: 'calc(100vh - 100px)'}}>
                {filteredEvents.map(item => (
                    <div className="row menu__item"
                         key={item.id}
                         onClick={() => {
                             this.props.onClickEvents(item);
                         }}>
                        <a
                            className="menu__item-name"
                            style={_.isEqual(item.id, parseInt(event)) ? selectedEventStyle : {}}>
                            {item.name}
                            {_.isEqual(item.id, parseInt(event)) ?
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

        // console.log(eventCategory, eventTypes);

        const filteredEventTypes = _.filter(eventTypes, item => {
            return _.isEqual(item.eventCategory.id, parseInt(eventCategory));
        });

        // console.log(filteredEventTypes);

        return (
            <div className="menu menu--adsila">
                {filteredEventTypes.map((item, index) => (
                    <div className="menu__item"
                         key={index}
                         onClick={() => {
                             this.props.onClickEventType(item);
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

        if (_.isEmpty(eventCategories)) {
            return [];
        }

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
        const {eventType, eventTypes} = this.props;

        if (_.isEmpty(eventTypes)) {
            return [];
        }

        const selectedEventType = _.find(eventTypes, item => {
            return _.isEqual(item.id, parseInt(eventType));
        });

        return (
            <div style={{width: "100%"}}>
                <div className="Events-item__titlebar" style={{padding: "3vh 2rem"}}>
                    <h2 className="Events-item__titlebar-title">
                        <Charming letters={selectedEventType.name} render={(letters) => (
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
        const {event, events} = this.props;
        const {knowMore} = this.state;

        if (_.isEmpty(events)) {
            return [];
        }

        const selectedEvent = _.find(events, item => {
            return _.isEqual(item.id, parseInt(event));
        });
        // console.log(selectedEvent);

        return (
            <div style={{width: "100%"}}>
                <div className="Events-item__titlebar" style={{padding: "3vh 2rem"}}>
                    <h2 className="Events-item__titlebar-title">
                        <Charming letters={selectedEvent.name} render={(letters) => (
                            <div>{letters}</div>
                        )}/>
                    </h2>

                </div>
                <div className="container-fluid">
                    <Fragment>
                        <Button title={"Register"} eventID={selectedEvent.id}/>
                    </Fragment>
                    <div className="row" style={{justifyContent: "center"}}>
                        <Countdown timeTillDate={selectedEvent.dateTime}/>
                    </div>
                    <div className="Events-item__content-container container-fluid">
                        <div className="Events-item__content-row row">
                            <h4>Description</h4>
                            <div>
                                <p>
                                    {knowMore.description ?
                                        selectedEvent.details.split("\n").map((text, index) => (
                                            <p key={index}>{text}</p>
                                        )) :
                                        <p>{selectedEvent.shortDescription}</p>}
                                    <a onClick={() => {
                                        this.setState({
                                            knowMore: {
                                                ...knowMore,
                                                description: !knowMore.description
                                            }
                                        });
                                    }}>{knowMore.description ? "Know Less..." : "Know More..."}</a>
                                </p>
                            </div>
                        </div>
                        {selectedEvent.ruleList.length > 0 ?
                            <div className="Events-item__content-row row">
                                <h4>Rules</h4>
                                <div>
                                    <ul style={{listStyleType: "circle"}}>
                                        {selectedEvent.ruleList.split("\n").map((rule, index) => (
                                            <li key={index}>{rule}</li>
                                        ))}
                                    </ul>
                                </div>
                                <br/>
                                {selectedEvent.minTeam < selectedEvent.maxTeam ? <div>
                                    <label>Minimum Team Size:</label> {selectedEvent.minTeam}
                                    <br/>
                                    <label>Maximum Team Size:</label> {selectedEvent.maxTeam}
                                </div> : null
                                }
                            </div> :
                            null
                        }
                        <div className="Events-item__content-row row">
                            <h4>Venue</h4>
                            <div>
                                <ul>
                                    <li><label>Location:</label> {selectedEvent.locations}</li>
                                    <li><label>Day:</label> {moment(selectedEvent.dateTime).format("Do MMM YYYY")}</li>
                                    <li><label>Time:</label> {moment(selectedEvent.dateTime).format("HH:MM a")}</li>
                                </ul>
                            </div>
                        </div>
                        {!_.isEmpty(selectedEvent.prize) ?
                            <div className="Events-item__content-row row">
                                <h4>Prizes</h4>
                                <div>
                                    <p>{selectedEvent.prize}</p>
                                </div>
                            </div> : null
                        }
                        {selectedEvent.coordinators.length > 0 ?
                            <div className="Events-item__content-row row">
                                <h4>Co-ordinators</h4>
                                <div>
                                    <ul style={{listStyleType: "circle"}}>{selectedEvent.coordinators.map((coordinator, index) => (
                                        <li key={index}>
                                            <label>Name:</label> {`${coordinator.first_name} ${coordinator.last_name}`}<br/>
                                            {!_.isEmpty(coordinator.participant) ?
                                                <Fragment>
                                                    <label>Contact:</label>
                                                    <a href={`tel:${coordinator.participant.contactNumber}`}>
                                                        {`${coordinator.participant.contactNumber}`}
                                                    </a>
                                                </Fragment> : null
                                            }
                                        </li>
                                    ))}</ul>
                                </div>
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        )
    };

    renderContent = () => {
        const {eventType, event} = this.props;

        if (!_.isEmpty(event)) {
            return this.renderEventContent();
        } else if (!_.isEmpty(eventType)) {
            return this.renderEventTypeContent();
        }

        return this.renderMainContent();
    };

    render() {
        const {eventCategory, eventCategories} = this.props;

        const selectedEventCategory = _.find(eventCategories, item => {
            return _.isEqual(item.id, parseInt(eventCategory));
        });

        return (
            <article className="Events-item Events-item--current">
                <div className="Events-item__img"
                     style={{
                         backgroundImage: `url(${selectedEventCategory.coverImage})`,
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

    onBackPress: PropTypes.func.isRequired,

    onSelectEventCategory: PropTypes.func.isRequired,
    onSelectEventType: PropTypes.func.isRequired,

    onClickEvents: PropTypes.func.isRequired,
    onClickEventType: PropTypes.func.isRequired,
};

export default ContentItem;