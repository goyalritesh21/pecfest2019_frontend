import React from "react";

const Controls = (props) => {
    const {onNext, onPrev, onSelectLink, isEvent} = props;
    return (
        <div className="controls">
            {
                isEvent ? <div className={"controls-link"}>
                    <div className={"ControlButton Controls-linkButton hover"}
                         onClick={()=>(onSelectLink())}
                    >
                        Register
                    </div>
                </div> : null
            }
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