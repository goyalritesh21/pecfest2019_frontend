import React, {Component} from "react";
import ReactDom from "react-dom";
import * as PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp, faChevronDown, faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";


class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state1: ''
        };
    }

    componentDidMount() {
        const slideElements = ['.About__back__slide', '.About__card__slide', '.About__content__slide'];
        let inProgress = false;
        const node = ReactDom.findDOMNode(this);

        const goToSlide = (slideElements, index) => {
            if (!inProgress) {
                inProgress = true;

                // card slide
                node.querySelector('.About__active').classList.add('About__exit');
                node.querySelector('.About__active').classList.remove('About__active');

                // content slide
                node.querySelector('.About__active').classList.add('About__exit');
                node.querySelector('.About__active').classList.remove('About__active');

                // back slide
                node.querySelector('.About__active').classList.add('About__exit');
                node.querySelector('.About__active').classList.remove('About__active');


                slideElements.forEach(elem => {
                    node.querySelector(`${elem}:nth-child(${index})`).classList.add('About__active');
                });

                const evenSlide = index % 2 === 0;
                if (evenSlide)
                    node.querySelector('.About__content__ping').classList.add('About__content__ping--right');
                else
                    node.querySelector('.About__content__ping').classList.remove('About__content__ping--right');

                var selection = node.querySelector('.About__content__ping--noanimation') !== null;
                // console.log("selection " + selection + " " + (selection === true));
                if (selection === true) {
                    node.querySelector('.About__content__ping--noanimation').classList.remove('About__content__ping--noanimation');
                }

                setTimeout(() => node.querySelector('.About__exit').classList.remove('About__exit'), 1000);
                setTimeout(() => inProgress = false, 2000);
            }
        };

        node.querySelector('.About__content__slide:nth-child(1) .About__button').addEventListener('click', () => goToSlide(slideElements, 2));
        node.querySelector('.About__content__slide:nth-child(2) .About__button').addEventListener('click', () => goToSlide(slideElements, 1));
    }


    render() {
        const {content, title, direction} = this.props;
        return (
            <div className="About__wrap">
                <div className="About__back">
                    <div className="About__back__slide About__active">
                        <div className="About__progress"/>
                    </div>
                    <div className="About__back__slide">
                        <div className="About__progress"/>
                        {/*<div className="About__back-front-image"></div>*/}
                    </div>
                </div>
                <div className="About__card">
                    <div className="About__card__slide About__active">
                        {/*<div className="About__image"></div>*/}
                        <span className="About__number"/>
                    </div>
                    <div className="About__card__slide">
                        <div className="About__back-image"/>
                        {/*<div className="About__image"></div>*/}
                        <span className="About__number"/>
                    </div>

                    <div className="About__content">
                        <div className="About__content__slide About__exit About__active">
                            <h2 className="About__title">
                            <span className="About__title__line">
                                <span className="About__title__inner"/>
                            </span>
                                <span className="About__title__line">
                                    <span className="About__title__inner">{title}</span>
                                </span>
                            </h2>
                            <p className="About__desc">
                                {
                                    content.first
                                }
                            </p>
                            <div className="About__button-wrap">
                                <button className="About__button">Learn More &nbsp;
									<FontAwesomeIcon icon={faArrowRight}
													 size={"sm"}

									/>
                                    <span className="About__button__hover"/>
                                </button>
                            </div>
                        </div>
                        <div className="About__content__slide">
                            <h2 className="About__title">
                            <span className="About__title__line">
                                <span className="About__title__inner"/>
                            </span>
                                <span className="About__title__line">
                                <span className="About__title__inner">{title}</span>
                            </span>
                            </h2>
                            <p className="About__desc">
                                {
                                    content.second
                                }
                            </p>
                            <div className="About__button-wrap">
                                <button className="About__button">
                                    <FontAwesomeIcon icon={faArrowLeft}
                                                     size={"sm"}

									/>&nbsp; Back
                                    <span className="About__button__hover"/>
                                </button>
                            </div>
                        </div>
                        <div className="About__content__ping About__content__ping--noanimation"/>
                    </div>
                </div>
                <div className={"flex-center"} onClick={this.props.onScrollIntoView}>
                    <FontAwesomeIcon icon={direction === "up" ? faChevronUp : faChevronDown}
                                     size={"3x"}
                                     style={{color: "white", cursor: "pointer"}}
                    />
                </div>
            </div>
        );
    }
}

About.propTypes = {
    content: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    onScrollIntoView: PropTypes.func.isRequired
};

export default About;