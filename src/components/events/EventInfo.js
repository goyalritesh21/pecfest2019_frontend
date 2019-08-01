import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { loadEvent, clearEvent } from "../../actions/individualEvent";
import { connect } from 'react-redux';
import CountDownTimer from "./CountDownTimer";
import Description from "./Description";
import Footer from "./Footer";
import Loader from "../common/Loader";

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
    //     const node = ReactDOM.findDOMNode(this['_div']);
    // if (node) {
    //   node.scrollIntoView();
    // }
        const { eventId } = this.props.match.params;
        this.props.loadEvent(eventId);
    }
    componentDidUpdate() {
        // Scroll as new elements come along
        // var len = this.props.events.length - 1;
        const node = ReactDOM.findDOMNode(this['_div']);
        if (node) {
          node.scrollIntoView();
        }
      }

    componentWillUnmount() {
        // this.props.clearEvent();
    }

    render() {
        const { event } = this.props;
        if (!event) {
            return (<Loader />);
        }
        return (
            <div className="card text-center item" ref={(ref) => this['_div'] = ref}>
                <div className="card-header">
                    <h3
                        className="card-title display1">
                        {event && event.name}
                    </h3>
                </div>
                <div className="card-body">
                    <div className="form">
                        <CountDownTimer startDate={new Date('November 1, 2019')} />
                        <Description {...event} />
                    </div>
                </div>
                <div className="card-footer">
                    <Footer name={event.name} coordinators={event.coordinators} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    event: state.individualEvent.event
});

export default connect(mapStateToProps, { loadEvent, clearEvent })(EventInfo);
