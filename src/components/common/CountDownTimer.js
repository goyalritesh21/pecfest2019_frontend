import React from 'react';
import moment from 'moment';

const SVGCircle = ({radius, stroke}) => (
    <svg className="countdown-svg">
        <path
            fill="none"
            stroke={stroke}
            strokeWidth="4"
            d={describeArc(50, 50, 48, 0, radius)}
        />
    </svg>
);


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

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(' ');

    return d;
}


function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}

class Countdown extends React.Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            const {timeTillDate} = this.props;
            const then = moment(timeTillDate).add(98, 'days');
            const now = moment();

            const countdown = moment.duration(then.diff(now));
            const days = Math.floor(countdown.asDays());
            countdown.subtract(moment.duration(days, 'days'));
            const hours = countdown.hours();
            countdown.subtract(moment.duration(hours, 'hours'));
            const minutes = countdown.minutes();
            countdown.subtract(moment.duration(minutes, 'minutes'));
            const seconds = countdown.seconds();

            this.setState({days, hours, minutes, seconds});
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const {days, hours, minutes, seconds} = this.state;

        // Mapping the date values to radius values
        const daysRadius = mapNumber(days, 100, 0, 0, 360);
        const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

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
                        <SVGCircle radius={daysRadius} stroke="#32CD32"/>
                        {days}
                        <span style={{color: "#ffffff"}}>days</span>
                    </div>
                )}
                {hours >= 0 && (
                    <div className="countdown-item">
                        <SVGCircle radius={hoursRadius} stroke="#87CEEB"/>
                        {hours}
                        <span style={{color: "#ffffff"}}>hours</span>
                    </div>
                )}
                {minutes >= 0 && (
                    <div className="countdown-item">
                        <SVGCircle radius={minutesRadius} stroke="#4B0082	"/>
                        {minutes}
                        <span style={{color: "#ffffff"}}>minutes</span>
                    </div>
                )}
                {seconds >= 0 && (
                    <div className="countdown-item">
                        <SVGCircle radius={secondsRadius} stroke="#FFA500"/>
                        {seconds}
                        <span style={{color: "#ffffff"}}>seconds</span>
                    </div>
                )}
            </div>
        );
    }
}

export default Countdown;