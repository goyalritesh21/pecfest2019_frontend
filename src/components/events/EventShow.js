import React, {Component} from "react";
import CountDownTimer from "./CountDownTimer";

class EventShow extends Component {
    state = {};

    render() {
        const {eventBackgroundImg, startDate, name} = this.props;
        return (
            <div className="card w-100" style={{height: "400px", padding: "0px"}}>
                <img
                    className="card-img-top img-responsive"
                    src={eventBackgroundImg}
                    alt="event_avatar"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.8
                    }}
                />
                <div className="card-img-overlay text-center">
                    <h1
                        className="card-title display1"
                        style={{
                            fontFamily: "ZCOOL KuaiLe",
                            textShadow: "4px 4px 4px #aaa",
                            fontSize: 80,
                            color: "#ff0066"
                        }}
                    >
                        {name}
                    </h1>
                    <div className="table-responsive align-center text-white">
                        <CountDownTimer startDate={startDate}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventShow;
