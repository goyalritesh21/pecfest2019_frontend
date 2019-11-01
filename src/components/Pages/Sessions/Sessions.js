import React, {Component} from 'react';
import '../../../styles/components/pages/Sessions/_Sessions.scss'
import {getBackgroundImage} from "../../../utils/BackgroundUtils";
import moment from "moment";
import TextBox from "../../common/TextBox";
import {sessionData} from "../../../data/Sessions";


// =========================
// Slide
// =========================

class Slide extends React.Component {
    constructor(props) {
        super(props);

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleSlideClick = this.handleSlideClick.bind(this);
        this.imageLoaded = this.imageLoaded.bind(this);
        this.slide = React.createRef()
    }

    handleMouseMove(event) {
        const el = this.slide.current;
        const r = el.getBoundingClientRect();

        el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)));
        el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)))
    }

    handleMouseLeave(event) {
        this.slide.current.style.setProperty('--x', 0);
        this.slide.current.style.setProperty('--y', 0)
    }

    handleSlideClick(event) {
        this.props.handleSlideClick(this.props.slide.index)
    }

    imageLoaded(event) {
        event.target.style.opacity = 1
    }

    handleButtonClick = (link) => {
        window.open(link, '_blank');
    };

    render() {
        const {src, button, headline, index, link, extra} = this.props.slide;
        const current = this.props.current;
        let classNames = 'slide';

        if (current === index) classNames += ' slide--current';
        else if (current - 1 === index) classNames += ' slide--previous';
        else if (current + 1 === index) classNames += ' slide--next';

        return (
            <li
                ref={this.slide}
                className={classNames}
                onClick={this.handleSlideClick}
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
            >
                <div className="slide__image-wrapper">
                    <img
                        className="slide__image"
                        alt={headline}
                        src={src}
                        onLoad={this.imageLoaded}
                    />
                </div>

                <article className="slide__content">
                    <h2 className="slide__headline">{headline}</h2>
                    <h4 className="slide__headline">{extra}</h4>
                    <button className="slide__action session-btn" onClick={() => (this.handleButtonClick(link))}>{button}</button>
                </article>
            </li>
        )
    }
}


// =========================
// Slider control
// =========================

const SliderControl = ({type, title, handleClick}) => {
    return (
        <button className={`session-btn session-btn--${type}`} title={title} onClick={handleClick}>
            <svg className="icon" viewBox="0 0 24 24">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
            </svg>
        </button>
    )
};


// =========================
// Slider
// =========================

class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {current: 0};
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handleSlideClick = this.handleSlideClick.bind(this);
    }

    componentDidMount() {
        document.body.style.backgroundImage = `url(${getBackgroundImage(
            moment().hour()
        )})`;
        this.overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
    }

    handlePreviousClick() {
        const previous = this.state.current - 1;

        this.setState({
            current: (previous < 0)
                ? sessionData.length - 1
                : previous
        })
    }

    handleNextClick() {
        const next = this.state.current + 1;

        this.setState({
            current: (next === sessionData.length)
                ? 0
                : next
        })
    }

    handleSlideClick(index) {
        if (this.state.current !== index) {
            this.setState({
                current: index
            })
        }
    }

    render() {
        const {current, direction} = this.state;
        const headingId = `slider-heading__session`;
        const wrapperTransform = {
            'transform': `translateX(-${current * (100 / sessionData.length)}%)`
        };

        return (
            <div id={"Slider"}>
                <div className={"row"}>
                    <div className={"col-md-12"} id={"session-heading"}>
                        <TextBox text={"Sessions"} large={true}/>
                    </div>
                    <div className='slider' aria-labelledby={headingId}>
                        <ul className="slider__wrapper" style={wrapperTransform}>
                            <h3 id={headingId} className="visuallyhidden">Sessions</h3>
                            {sessionData.map(slide => {
                                return (
                                    <Slide
                                        key={slide.index}
                                        slide={slide}
                                        current={current}
                                        handleSlideClick={this.handleSlideClick}
                                    />
                                )
                            })}
                        </ul>

                        <div className="slider__controls">
                            <SliderControl
                                type="previous"
                                title="Go to previous slide"
                                handleClick={this.handlePreviousClick}
                            />

                            <SliderControl
                                type="next"
                                title="Go to next slide"
                                handleClick={this.handleNextClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Slider;