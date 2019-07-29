import React, { Component } from "react";
import { PropTypes } from "prop-types";

class CountDownTimer extends Component {
  static propTypes = {
    startDate: PropTypes.instanceOf(Date)
  };

  constructor(props) {
    super(props);
    this.state = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer(milliSeconds) {
    var leftTime = milliSeconds - new Date().getTime();
    if (milliSeconds < 0) clearInterval(this.timer);
    var days = Math.floor(leftTime / (24 * 60 * 60 * 1000));
    var hours = Math.floor(
      (leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((leftTime % (1000 * 60)) / 1000);
    this.setState({ days, hours, minutes, seconds });
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.startTimer(this.props.startDate.getTime());
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let { days, hours, minutes, seconds } = this.state;
    return (
      <div className="row">
        <div className="col-sm-3">
          <button className="btn btn-info">Coming After :</button>
        </div>
        <div className="col-sm-6 table-responsive">
          <table className="table table-sm">
            <tbody className="text-white">
              <tr>
                <td style={{ padding: "8px" }}>
                  <span
                    style={{ padding: "5px" }}
                    className="rounded-circle h3 bg-warning"
                  >
                    {days}
                  </span>
                </td>
                <td style={{ padding: "8px" }}>
                  <span
                    style={{ padding: "5px" }}
                    className="rounded-circle h3 bg-danger"
                  >
                    {hours}
                  </span>
                </td>
                <td style={{ padding: "8px" }}>
                  <span
                    style={{ padding: "5px" }}
                    className="rounded-circle h3 bg-info"
                  >
                    {minutes}
                  </span>
                </td>
                <td style={{ padding: "8px" }}>
                  <span
                    style={{ padding: "5px" }}
                    className="rounded-circle h3 bg-success"
                  >
                    {seconds}
                  </span>
                </td>
              </tr>
              <tr>
                <td>days</td>
                <td>hours</td>
                <td>minutes</td>
                <td>seconds</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-sm-3">
          <button type="button" className="btn-lg btn-danger rounded-rounded">
            Register Here
          </button>
        </div>
      </div>
    );
  }
}

export default CountDownTimer;
