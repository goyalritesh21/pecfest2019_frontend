import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { loadEvent, clearEvent } from "../../actions/individualEvent";
import { connect } from 'react-redux';
import Countdown from "./CountDownTimer";
import Description from "./Description";
// import Footer from "./Footer";
import Loader from "../common/Loader";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import anime from 'animejs';
class EventInfo extends Component {
    state = {
        event: null
    };

    static propTypes = {
        loadEvent: PropTypes.func.isRequired,
        event: PropTypes.object,
        clearEvent: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { eventId } = this.props.match.params;
        this.props.loadEvent(eventId);
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
    componentDidUpdate() {
        const node = ReactDOM.findDOMNode(this['_div']);
        if (node) {
            node.scrollIntoView();
        }
    }

    componentWillUnmount() {
        this.props.clearEvent();
    }

    render() {

        const { event } = this.props;
        if (!event) {
            return (<Loader />);
        }
        return (
            <ReactCSSTransitionGroup
                transitionName="eventinfo"
                transitionAppear={true}
                transitionAppearTimeout={800}
                transitionEnter={false}
                transitionLeave={false}>
                <div className="text-center item" ref={(ref) => this['_div'] = ref}>
                    <div className="card-header" id={"header"}>
                        <h3
                            className="card-title display1">
                            {event && event.name}
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="form">

                            <div id={"countdown"} style={{ height: "120px", width: "100%" }}>
                                <Countdown timeTillDate={event.dateTime} />
                            </div>

                            <Description {...event} wait={900} />
                            {/* <Footer name={event.name} coordinators={event.coordinators} /> */}
                        </div>

                    </div>

                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

const mapStateToProps = (state) => ({
    event: state.individualEvent.event
});

export default connect(mapStateToProps, { loadEvent, clearEvent })(EventInfo);
