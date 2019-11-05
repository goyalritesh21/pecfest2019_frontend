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
import {connect} from "react-redux";
import {checkRegistered, registerEvent, registerTeam} from "../../actions/event";
import {createMessage} from "../../actions/messages";
import {withRouter} from "react-router";

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

    _onIndividualRegister = (eventID) => {
        const {username} = this.props.user;
        const teamObj = {
            eventID,
            teamName: username,
            team: [username]
        };
        this.props.registerTeam(teamObj);
    };

    _handleRegister = (selectedEvent) => {
        if (this.props.user === null) {
            const loginToRegister = "Login to Register!";
            this.props.history.push('/login');
            return this.props.createMessage({loginToRegister});
        }
        if (parseInt(selectedEvent.maxTeam) <= 1) {
            return this._onIndividualRegister(selectedEvent.id);
        }
        return this.props.history.push(`/teamRegister/${selectedEvent.name}/${selectedEvent.id}/${selectedEvent.minTeam}/${selectedEvent.maxTeam}`);
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
                    <button
                        className={"Events-item__button"}
                        onClick={() => {
                            // console.log(selectedEventCategory);
                            this.props.onSelectEventCategory();
                        }}>
                        <h3 className="Events-item__titlebar-title"
                            ref={this.contentTitleRef}>
                            <Charming letters={selectedEventCategory.name} render={(letters) => (
                                <div ref={this.lettersRef}>{letters}</div>
                            )}/>
                        </h3>
                    </button>
                )}
                {!_.isEmpty(selectedEventType) && (
                    <div style={{margin: "auto 12px"}}>
                        <FontAwesomeIcon icon={faChevronRight} className="Events-item__titlebar-icon"/>
                    </div>
                )}
                {!_.isEmpty(selectedEventType) && (
                    <button
                        className={"Events-item__button"}
                        onClick={() => {
                            this.props.onSelectEventType();
                        }}>
                        <h3 className="Events-item__titlebar-title">
                            <Charming letters={selectedEventType.name} render={(letters) => (
                                <div>{letters}</div>
                            )}/>
                        </h3>
                    </button>
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
        const selectedHeight = !_.isEmpty(event) ? 'menu--adsila__height' : '';

        return (
            <div className={`menu menu--adsila ${selectedHeight}`}>
                {filteredEvents.map((item, index) => (
                    <div className="menu__item"
                         key={item.id}
                         onClick={() => {
                             this.props.onClickEvents(item);
                         }}>
                        <button
                            className="menu__item-name"
                            style={_.isEqual(item.id, parseInt(event)) ? selectedEventStyle : {}}>
                            {item.name}
                            {_.isEqual(item.id, parseInt(event)) ?
                                <div
                                    className="menu__item-name__visible"
                                    style={{backgroundColor: color}}/> :
                                []
                            }
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    renderEventTypes = () => {
        const {eventCategory, eventTypes} = this.props;

        const filteredEventTypes = _.filter(eventTypes, item => {
            return _.isEqual(item.eventCategory.id, parseInt(eventCategory));
        });

        return (
            <div className="menu menu--adsila">
                {filteredEventTypes.map((item, index) => (
                    <div className="menu__item"
                         key={index}
                         onClick={() => {
                             this.props.onClickEventType(item);
                         }}>
                        <button className="menu__item-name" key={item.id}>{item.name}</button>
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
        return (
            []
        );
    };

    renderEventTypeContent = () => {
        return (
            []
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

        return (
            <div style={{width: "100%", overflow: "scroll"}}>
                <div className="Events-item__titlebar" style={{padding: "3vh 2rem"}}>
                    <h2 className="Events-item__titlebar-title">
                        {selectedEvent.name}
                    </h2>
                </div>
                <div className="container-fluid">
                    <Fragment>
                        <Button
                            title={"Register"}
                            eventID={selectedEvent.id}
                            event={selectedEvent}
                            registrationEnded={
                                moment(selectedEvent.registerEndDate).isSameOrBefore(moment()) ||
                                moment(selectedEvent.dateTime).isSameOrBefore(moment())
                            }
                            _onClick={this._handleRegister}
                        />
                    </Fragment>
                    <div className="row" style={{justifyContent: "center"}}>
                        <Countdown timeTillDate={selectedEvent.dateTime}/>
                    </div>
                    <div className="Events-item__content-container container-fluid">
                        <div className="Events-item__content-row row">
                            <h4>Description</h4>
                            <div className={"Events-item__content-description"}>
                                <div>
                                    {
                                        knowMore.description ?
                                        selectedEvent.details.split("\n").map((text, index) => (
                                            <p key={index}>{text}</p>
                                        )) :
                                        selectedEvent.shortDescription.split("\n").map((text, index) => (
                                            <p key={index}>{text}</p>
                                        ))
                                    }
                                    <button
                                        className={"Events-item__button"}
                                        onClick={() => {
                                            this.setState({
                                                knowMore: {
                                                    ...knowMore,
                                                    description: !knowMore.description
                                                }
                                            });
                                        }}>{knowMore.description ? "Know Less..." : "Know More..."}</button>
                                </div>
                                <br/>
                                {
                                    !_.isEmpty(selectedEvent.prelimsLink) && <div>
                                        <button
                                            className={"Events-item__button"}
                                            onClick={() => (window.open(selectedEvent.prelimsLink, "_blank"))}>
                                            {selectedEvent.prelimsLink}
                                        </button>
                                    </div>
                                }
                                <br/>
                                {
                                    !_.isEmpty(selectedEvent.rulesPDF) && <div>
                                        <button
                                            className={"Events-item__button"}
                                            onClick={() => (window.open(selectedEvent.rulesPDF, "_blank"))}>Rules PDF
                                        </button>
                                    </div>
                                }
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
                                {selectedEvent.minTeam > 0 && selectedEvent.minTeam <= selectedEvent.maxTeam ? <div>
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
                                    <li><label>Time:</label> {moment(selectedEvent.dateTime).format("h:mm A")}</li>
                                </ul>
                            </div>
                        </div>
                        {!_.isEmpty(selectedEvent.prize) ?
                            <div className="Events-item__content-row row">
                                <h4>Prizes</h4>
                                <div>
                                    {selectedEvent.prize.split("\n").map((text, index) => (
                                        <p key={index}>{text}</p>
                                    ))}
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
                                                    <a
                                                        className={"Events-item__button"}
                                                        href={`tel:${coordinator.participant.contactNumber}`}>
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

    _renderSmallSideBar = () => {
        const {eventCategory, eventCategories} = this.props;

        const selectedEventCategory = _.find(eventCategories, item => {
            return _.isEqual(item.id, parseInt(eventCategory));
        });
        return (
            <div
                className="Events-item__img"
                style={{
                    backgroundImage: `url(${selectedEventCategory.coverImage})`,
                    overflow: 'hidden'
                }}>
                <div style={{
                    background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
                    height: "100%",
                    width: "100%"
                }}>
                    {this.renderTitleBar()}
                    {this.renderSideBar()}
                </div>
            </div>
        )
    };

    _renderBigSideBar = () => {
        const {eventCategory, eventCategories} = this.props;

        const selectedEventCategory = _.find(eventCategories, item => {
            return _.isEqual(item.id, parseInt(eventCategory));
        });
        return (
            <div
                className="Events-item__img-big"
                style={{
                    backgroundImage: `url(${selectedEventCategory.coverImage})`,
                    overflow: 'hidden'
                }}>
                <div style={{
                    background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
                    height: "100%",
                    width: "100%"
                }}>
                    {this.renderTitleBar()}
                    {this.renderSideBar()}
                </div>
            </div>
        )

    };
    _renderSideContent = () => {
        const {event} = this.props;
        if (_.isEmpty(event)) {
            return this._renderBigSideBar();
        } else {
            return this._renderSmallSideBar();
        }
    };
    _renderMain = () => {
        const {event} = this.props;
        if (!_.isEmpty(event)) {
            return (
                <div className="Events-item__content">
                    {this.renderContent()}
                </div>
            )
        } else {
            return null;
        }
    };

    render() {
        return (
            <article className="Events-item Events-item--current">
                {this._renderSideContent()}
                {this._renderMain()}
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
    registered: PropTypes.bool.isRequired,
    checkRegister: PropTypes.bool.isRequired,
    eventRegister: PropTypes.bool.isRequired,
    checkRegistered: PropTypes.func.isRequired,
    registerEvent: PropTypes.func.isRequired,
    registerTeam: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    user: PropTypes.object,
};

const mapStateToProps = (state) => ({
    registered: state.event.registered,
    checkRegistered: state.loaders.isLoading.checkRegistered,
    eventRegister: state.loaders.isLoading.eventRegister,
    user: state.auth.user,
});

export default withRouter(
    connect(
        mapStateToProps,
        {
            checkRegistered,
            registerEvent,
            registerTeam,
            createMessage
        }
    )(ContentItem)
);