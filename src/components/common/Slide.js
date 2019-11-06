import React from "react";
import Controls from "./Controls"
import megaShowList from "../../data/MegaShows";

const Slide = (props) => {
    const {onNext, onPrev, children, onSelectLink, isEvent} = props;
    return (
        <div className="MegaShowSlide">
            <Controls onNext={onNext} onPrev={onPrev} onSelectLink={onSelectLink} isEvent={isEvent}/>
            {children}
        </div>
    )
};

export default Slide;