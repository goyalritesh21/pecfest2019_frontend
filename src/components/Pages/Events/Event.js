import React, {Component} from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import {clearEvent, loadEvent} from "../../../actions/event";
import {connect} from 'react-redux';
import Countdown from "../../common/CountDownTimer";
import Description from "./Description";
import Loader from "../../common/Loader";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import anime from 'animejs';
import _ from "lodash";
import {getBackgroundImage} from "../../../utils/BackgroundUtils";
import moment from "moment";

class Event extends Component {
    state = {
        event: null
    };

    static propTypes = {
        loadEvent: PropTypes.func.isRequired,
        event: PropTypes.object,
        clearEvent: PropTypes.func.isRequired
    };

    componentDidMount() {
        document.body.style.backgroundImage = `url(${getBackgroundImage(
            moment().hour()
        )})`;

        const {eventId} = this.props.match.params;
        if (!_.isEmpty(eventId)) {
            this._fetchEvent(eventId);
        }

        const timeline = anime.timeline();
        timeline.add({
            targets: '#header, #services, .row, #footer, #countdown, .countdown-item',
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: (el, i, l) => i * 200
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(prevProps.match.params.eventId, this.props.match.params.eventId)) {
            this._fetchEvent(this.props.match.params.eventId);
        }

        const node = ReactDOM.findDOMNode(this['_div']);
        if (node) {
            node.scrollIntoView();
        }
    }

    componentWillUnmount() {
        this.props.clearEvent();
    }

    _fetchEvent = id => {
        this.props.loadEvent(id);
    };

    render() {

        const {event} = this.props;
        if (!event) {
            return (<Loader/>);
        }
        return (
            <ReactCSSTransitionGroup
                transitionName="eventinfo"
                transitionAppear={true}
                transitionAppearTimeout={800}
                transitionEnter={false}
                transitionLeave={false}>
                <div className="text-center Event-item" ref={(ref) => this['_div'] = ref}>
                    <div className="Event-card__header" id={"header"}>
                        <h3
                            className="Event-card__title Event-display">
                            {event && event.name}
                        </h3>
                    </div>
                    <div className="Event-card__body">
                        <div className="form">
                            <div id={"countdown"} style={{height: "120px", width: "100%"}}>
                                <Countdown timeTillDate={event.dateTime}/>
                            </div>

                            <Description {...event} wait={900}/>
                        </div>

                    </div>

                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

const mapStateToProps = (state) => ({
    event: state.event.event
});

export default connect(mapStateToProps, {loadEvent, clearEvent})(Event);
