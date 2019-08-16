import React from "react";

const Controls = (props) => {
    const {onNext, onPrev} = props;
    return (
        <div className="controls">
            <div className="controls-next">
                <div onClick={onNext} className="ControlButton Controls-nextButton hover"/>
            </div>
            <div className="controls-prev">
                <div onClick={onPrev} className="ControlButton Controls-prevButton hover"/>
            </div>
        </div>
    )
};

export default Controls;