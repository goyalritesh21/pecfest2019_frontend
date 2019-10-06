import React, {Component, Fragment} from 'react';
import Menu from "../../common/Menu";
import ContentItem from "../../common/ContentItem";
import _ from "lodash";
import {Ease, Expo, Sine, TimelineMax} from "gsap";
import BezierEasing from "bezier-easing";
import Column from "../../common/Column";
import imageColumns from "../../../data/Events";
import {addQuery, ANIMATION_STATE, removeQuery} from "../../../utils/Utils";
import {connect} from "react-redux";
import {fetchEvent, fetchEventCategories, fetchEvents, fetchEventTypes} from "../../../actions/events";
import * as PropTypes from 'prop-types';
import {getBackgroundImage} from "../../../utils/BackgroundUtils";
import moment from "moment";
import Loader from "../../common/Loader";

class Events extends Component {
    constructor(props) {
        super(props);

        this.contentFirstRef = React.createRef();
        this.contentMoveRef = React.createRef();
        this.columnWrapperRef = React.createRef();

        this.state = {
            windowSize: {
                width: 0,
                height: 0,
            },
            activeTilt: {
                columns: true,
                letters: true,
            },
            animationState: {
                event: ANIMATION_STATE['NO_OPS'],
                columns: ANIMATION_STATE['NO_OPS'],
                menu: ANIMATION_STATE['NO_OPS'],
                content: ANIMATION_STATE['NO_OPS'],
            },
            hidden: "hidden"
        };
    }

    show = () => (this.setState(() => ({
        hidden: null
    })));

    componentWillMount() {
        let that = this;
        setTimeout(() => (that.show()), 2000);
    }

    componentDidMount() {
        document.body.style.backgroundImage = `url(${getBackgroundImage(
            moment().hour()
        )})`;

        this.calcWindowSize();

        this._initState();

        this._fetchEventCategories();
        this._fetchEventTypes();
        this._fetchEvents();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(prevState.animationState.event, this.state.animationState.event)) {
            if (_.isEqual(this.state.animationState.event, ANIMATION_STATE['OPEN'])) {
                this._startOpenAnimation();
            } else if (_.isEqual(this.state.animationState.event, ANIMATION_STATE['CLOSE'])) {
                this._startCloseAnimation();
            }
        }

        if (!_.isEqual(prevProps.eventCategories, this.props.eventCategories)) {
            this._initState();
        }
    }

    _initState = () => {
        const {eventCategory, eventCategories} = this.props;
        if (!_.isEmpty(eventCategory) && !_.isEmpty(eventCategories)) {
            const item = _.find(eventCategories, {id: parseInt(eventCategory)});
            // console.log(eventCategories, eventCategory, item);
            if (!_.isEmpty(item)) {
                this.openItem(item);
            }
        }
    };

    _fetchEventCategories = () => {
        this.props.fetchEventCategories();
    };

    _fetchEventTypes = () => {
        this.props.fetchEventTypes();
    };

    _fetchEvents = () => {
        this.props.fetchEvents();
    };

    _startOpenAnimation = () => {
        const duration = 1.2;
        const ease = new Ease(BezierEasing(1, 0, 0.735, 0.775));
        const columnsStagger = 0;

        const columnsTotal = 4;

        new TimelineMax({
            onComplete: () => this.setState((state) => ({
                animationState: {
                    event: ANIMATION_STATE['NO_OPS'],
                    columns: state.animationState.columns,
                    menu: state.animationState.menu,
                    content: state.animationState.content,
                }
            })),
        })  // Animate columns out
            .to(this.columnWrapperRef.current, duration, {
                ease: ease,
                rotation: -2
            }, 0)

            // Animate content.first and contentMove (unreveal effect: both move in different directions)
            .to(this.contentFirstRef.current, duration * 0.8, {
                ease: Expo.easeOut,
                y: '100%'
            }, duration + duration * columnsStagger * columnsTotal)
            .to(this.contentMoveRef.current, duration * 0.8, {
                ease: Expo.easeOut,
                y: '-100%'
            }, duration + duration * columnsStagger * columnsTotal)
    };

    _startCloseAnimation = () => {
        const duration = 1;
        const ease = Sine.easeOut;

        new TimelineMax({
            onComplete: () => this.setState((state) => ({
                animationState: {
                    event: ANIMATION_STATE['NO_OPS'],
                    columns: state.animationState.columns,
                    menu: state.animationState.menu,
                    content: state.animationState.content,
                }
            })),
        })  // Animate content.first and contentMove (unreveal effect: both move in different directions)
            .to([this.contentFirstRef.current, this.contentMoveRef.current], duration * 0.6, {
                ease: new Ease(BezierEasing(0.775, 0.05, 0.87, 0.465)),
                y: '0%',
            }, 0.2)

            // Animate columns in
            .to(this.columnWrapperRef.current, duration, {
                ease: ease,
                rotation: 0
            }, duration * 0.6)
    };

    calcWindowSize = () => {
        this.setState({
            windowSize: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    };

    openItem = (eventCategory) => {
        addQuery(this.props, {eventCategory: eventCategory.id});

        this.setState({
            activeTilt: {
                columns: false,
                letters: false,
            },
            animationState: {
                event: ANIMATION_STATE['OPEN'],
                columns: ANIMATION_STATE['OPEN'],
                menu: ANIMATION_STATE['OPEN'],
                content: ANIMATION_STATE['OPEN'],
            },
            selectedEventCategory: eventCategory.id
        });
    };

    closeItem = () => {
        removeQuery(this.props, 'eventCategory');

        this.setState({
            activeTilt: {
                columns: true,
                letters: true,
            },
            animationState: {
                event: ANIMATION_STATE['CLOSE'],
                columns: ANIMATION_STATE['CLOSE'],
                menu: ANIMATION_STATE['CLOSE'],
                content: ANIMATION_STATE['CLOSE'],
            },
        });
    };

    renderMenu = () => {
        const {eventCategories} = this.props;
        const {activeTilt} = this.state;

        return (
            <Menu items={eventCategories}
                  activeTilt={activeTilt}
                  animationState={this.state.animationState.menu}
                  onAnimationComplete={animationState => {
                      this.setState((state) => ({
                          animationState: {
                              event: state.animationState.event,
                              columns: state.animationState.columns,
                              menu: ANIMATION_STATE['NO_OPS'],
                              content: state.animationState.content,
                          }
                      }));
                  }}
                  onItemSelect={this.openItem}/>
        );
    };

    renderContent = () => {
        const {eventCategories, eventTypes, events, eventCategory, eventType, event} = this.props;
        const {animationState} = this.state;

        if (_.isEmpty(eventCategory) || _.isEmpty(eventCategories) || _.isEmpty(eventTypes)) {
            return [];
        }

        return (
            <div className="Events-content Events-content--second">
                <ContentItem eventCategory={eventCategory}
                             eventType={eventType}
                             event={event}
                             eventCategories={eventCategories}
                             eventTypes={eventTypes}
                             events={events}
                             onSelectEventType={() => {
                                 removeQuery(this.props, 'event');
                             }}
                             onSelectEventCategory={() => {
                                 removeQuery(this.props, 'event');
                                 removeQuery(this.props, 'eventType');
                             }}
                             onClickEvents={(event) => {
                                 addQuery(this.props, {event: event.id})
                             }}
                             onClickEventType={(eventType) => {
                                 addQuery(this.props, {eventType: eventType.id})
                             }}
                             animationState={animationState.content}
                             onAnimationComplete={animationState => {
                                 this.setState((state) => ({
                                     animationState: {
                                         event: state.animationState.event,
                                         columns: state.animationState.columns,
                                         menu: ANIMATION_STATE['NO_OPS'],
                                         content: state.animationState.content,
                                     }
                                 }));
                             }}
                             onBackPress={() => {
                                 removeQuery(this.props, 'event');
                                 removeQuery(this.props, 'eventType');
                                 removeQuery(this.props, 'eventCategory');
                                 this.closeItem();
                             }}/>
            </div>
        );
    };

    render() {
        const {activeTilt, animationState, hidden} = this.state;
        return (
            <Fragment>
                {
                    hidden === null ? null : <Loader/>
                }
                <div className={`Events-main ${this.state.hidden}`}>
                    {this.renderContent()}
                    <div className="Events-content Events-content--first"
                         ref={this.contentFirstRef}>
                        <div className="Events-content__move"
                             ref={this.contentMoveRef}>
                            <div className="Events-columns"
                                 ref={this.columnWrapperRef}>
                                {imageColumns.map(column => (
                                    <Column column={column}
                                            key={column.id}
                                            animationState={animationState.columns}
                                            onAnimationComplete={animationState => {
                                                this.setState((state) => ({
                                                    animationState: {
                                                        event: state.animationState.event,
                                                        columns: ANIMATION_STATE['NO_OPS'],
                                                        menu: state.animationState.menu,
                                                        content: state.animationState.content,
                                                    }
                                                }));
                                            }}
                                            activeTilt={activeTilt}/>
                                ))}
                            </div>
                            {this.renderMenu()}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    eventCategories: state.events.eventCategories,
    eventTypes: state.events.eventTypes,
    events: state.events.events,
});

Events.propTypes = {
    eventCategory: PropTypes.string,
    eventType: PropTypes.string,
    event: PropTypes.string,
    fetchEvent: PropTypes.func.isRequired,
    fetchEvents: PropTypes.func.isRequired,
    fetchEventCategories: PropTypes.func.isRequired,
    fetchEventTypes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    fetchEvent,
    fetchEvents,
    fetchEventCategories,
    fetchEventTypes
})(Events);