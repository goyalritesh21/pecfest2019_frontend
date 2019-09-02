import React from 'react';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import {withGetScreen} from 'react-getscreen'

const SVGCircle = ({radius, stroke, view}) => {
    if (view === "1") {
        return (
            <svg className="countdown-svg">
                <path
                    fill="none"
                    stroke={stroke}
                    strokeWidth="4"
                    d={describeArc(50, 50, 48, 0, radius)}
                />
            </svg>
        );
    } else {
        return (
            <svg className="countdown-svg">
                <path
                    fill="none"
                    stroke={stroke}
                    strokeWidth="2"
                    d={describeArc(32, 32, 30, 0, radius)}
                />
            </svg>
        );
    }
};

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M",
        start.x,
        start.y,
        "A",
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(" ");

    return d;
}

function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}

class Countdown extends React.Component {
    constructor(props) {
        super(props);

        const dateTime = this._getDateTime(props.timeTillDate);

        this.state = {
            days: dateTime.days,
            hours: dateTime.hours,
            minutes: dateTime.minutes,
            seconds: dateTime.seconds,
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const {timeTillDate} = this.props;
            const dateTime = this._getDateTime(timeTillDate);

            this.setState({
                days: dateTime.days,
                hours: dateTime.hours,
                minutes: dateTime.minutes,
                seconds: dateTime.seconds,
            });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    _getDateTime = (timeTillDate) => {
        const then = moment(timeTillDate);
        const now = moment();

        const countdown = moment.duration(then.diff(now));
        const days = Math.floor(countdown.asDays());
        countdown.subtract(moment.duration(days, 'days'));
        const hours = countdown.hours();
        countdown.subtract(moment.duration(hours, 'hours'));
        const minutes = countdown.minutes();
        countdown.subtract(moment.duration(minutes, 'minutes'));
        const seconds = countdown.seconds();

        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        }
    };

    render() {
        var view = 1;
        if (this.props.isMobile()) view = 0;
        const {days, hours, minutes, seconds} = this.state;

        // Mapping the date values to radius values
        const daysRadius = mapNumber(100 - days, 100, 0, 0, 360);
        const hoursRadius = mapNumber(24 - hours, 24, 0, 0, 360);
        const minutesRadius = mapNumber(60 - minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(60 - seconds, 60, 0, 0, 360);

        if (days < 0) {
            return (
                <div>
                    <h2>Currently going on!</h2>
                </div>
            );
        }

        return (
            <div className="countdown-wrapper">
                {days >= 0 && (
                    <div className="countdown-item">
                        <SVGCircle radius={daysRadius} stroke="#32CD32" view={view}/>
                        {days}
                        <span className={"subTextCount"} style={{color: "#ffffff"}}>
              days
            </span>
                    </div>
                )}
                {hours >= 0 && (
                    <div className="countdown-item">
                        <SVGCircle radius={hoursRadius} stroke="#87CEEB" view={view}/>
                        {hours}
                        <span className={"subTextCount"} style={{color: "#ffffff"}}>
              hours
            </span>
                    </div>
                )}
                {minutes >= 0 && (
                    <div className="countdown-item">
                        <SVGCircle radius={minutesRadius} stroke="#4B0082" view={view}/>
                        {minutes}
                        <span className={"subTextCount"} style={{color: "#ffffff"}}>
              minutes
            </span>
                    </div>
                )}
                {seconds >= 0 && (
                    <div className="countdown-item">
                        <SVGCircle radius={secondsRadius} stroke="#FFA500" view={view}/>
                        {seconds}
                        <span className={"subTextCount"} style={{color: "#ffffff"}}>
              seconds
            </span>
                    </div>
                )}
            </div>
        );
    }
}

Countdown.propTypes = {
    timeTillDate: PropTypes.object.isRequired,
};

export default withGetScreen(Countdown);