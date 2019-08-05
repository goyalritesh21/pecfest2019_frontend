import React from "react";

export default (props) => {
    const {onNext, onPrev} = props;
    return (
        <div className="controls">
            <div className="controls-next">
                <div onClick={onNext} className="ControlButton Controls-nextButton"/>
            </div>
            <div className="controls-prev">
                <div onClick={onPrev} className="ControlButton Controls-prevButton"/>
            </div>
        </div>
    )
}