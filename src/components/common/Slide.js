import React from "react";
import Controls from "./Controls"

const Slide = (props) => {
    const { onNext, onPrev, children } = props;
    return (
        <div className="MegaShowSlide">
            <Controls onNext={onNext} onPrev={onPrev} />
            {children}
        </div>
    )
};

export default Slide;