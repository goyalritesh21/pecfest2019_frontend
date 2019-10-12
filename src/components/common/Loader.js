import React, { Component } from 'react';
import loader from '../../assets/images/Loaders/Loader2.gif';
import { TransitionMotion, spring } from 'react-motion';
const styles = [{
    key: "1",
    data: "",
    style: { opacity: spring(1) }
}];

const defaultStyles = [{
    key: "1",
    data: "",
    style: { opacity: 0 }
}];

class Loader extends Component {
    willEnter = () => ({ opacity: 0 });
    willLeave = () => ({ opacity: spring(0, { stiffness: 90, damping: 11 }) });


    render() {
        return (
            // <div style={{ backgroundImage: `url(${loader})` }} />
            <TransitionMotion
                defaultStyles={defaultStyles}
                styles={styles}
                willEnter={this.willEnter}
                willLeave={this.willLeave}
            >
                {
                    (styles) => <div className={"image-container"}> {
                        styles.map((child) => {
                            const { key, style } = child;
                            return <img key={key} style={style} className={"img-fluid rounded-circle"} src={loader} alt={"Loading..."} />
                        })}
                    </div>
                }
            </TransitionMotion>
        );
    }
};

export default Loader;