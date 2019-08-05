import React from "react";
import Controls from "./Controls"

export default (props) => {
    const {onNext, onPrev, activeIndex, children} = props;
    return (
        <div className="MegaShowSlide">
            <Controls onNext={onNext} onPrev={onPrev}/>
            {children}
        </div>
    )
}