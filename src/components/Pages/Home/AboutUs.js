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
        const slideElements = ['.back__slide', '.card__slide', '.content__slide'];
        let inProgress = false;
        const node = ReactDom.findDOMNode(this);

        const goToSlide = (slideElements, index) => {
            if (!inProgress) {
                inProgress = true;

                // card slide
                node.querySelector('.active').classList.add('exit');
                node.querySelector('.active').classList.remove('active');

                // content slide
                node.querySelector('.active').classList.add('exit');
                node.querySelector('.active').classList.remove('active');

                // back slide
                node.querySelector('.active').classList.add('exit');
                node.querySelector('.active').classList.remove('active');


                slideElements.forEach(elem => {
                    node.querySelector(`${elem}:nth-child(${index})`).classList.add('active');
                });

                const evenSlide = index % 2 === 0;
                if (evenSlide)
                    node.querySelector('.content__ping').classList.add('content__ping--right');
                else
                    node.querySelector('.content__ping').classList.remove('content__ping--right');

                var selection = node.querySelector('.content__ping--noanimation') !== null;
                // console.log("selection " + selection + " " + (selection === true));
                if (selection === true) {
                    node.querySelector('.content__ping--noanimation').classList.remove('content__ping--noanimation');
                }

                setTimeout(() => node.querySelector('.exit').classList.remove('exit'), 1000);
                setTimeout(() => inProgress = false, 2000);
            }
        };

        node.querySelector('.content__slide:nth-child(1) .button').addEventListener('click', () => goToSlide(slideElements, 2));
        node.querySelector('.content__slide:nth-child(2) .button').addEventListener('click', () => goToSlide(slideElements, 1));
        // setTimeout( () => goToSlide(slideElements, 2), 2000 );
        // setTimeout( () => goToSlide(slideElements, 1), 6000 );
    }


    render() {
        const {content, title, direction} = this.props;
        return (
            <div className="wrap">
                <div className="back">
                    <div className="back__slide active">
                        <div className="progress"/>
                    </div>
                    <div className="back__slide">
                        <div className="progress"/>
                        {/*<div className="back-front-image"></div>*/}
                    </div>
                </div>
                <div className="card">
                    <div className="card__slide active">
                        {/*<div className="image"></div>*/}
                        <span className="number">01</span>
                    </div>
                    <div className="card__slide">
                        <div className="back-image"/>
                        {/*<div className="image"></div>*/}
                        <span className="number">02</span>
                    </div>

                    <div className="content">
                        <div className="content__slide exit active">
                            <h2 className="title">
                            <span className="title__line">
                                <span className="title__inner"/>
                            </span>
                                <span className="title__line">
                                    <span className="title__inner">{title}</span>
                                </span>
                            </h2>
                            <p className="desc">
                                {
                                    content.first
                                }
                            </p>
                            <div className="button-wrap">
                                <button className="button">Learn More &nbsp;
									<FontAwesomeIcon icon={faArrowRight}
													 size={"sm"}

									/>
                                    <span className="button__hover"/>
                                </button>
                            </div>
                        </div>
                        <div className="content__slide">
                            <h2 className="title">
                            <span className="title__line">
                                <span className="title__inner"/>
                            </span>
                                <span className="title__line">
                                <span className="title__inner">{title}</span>
                            </span>
                            </h2>
                            <p className="desc">
                                {
                                    content.second
                                }
                            </p>
                            <div className="button-wrap">
                                <button className="button">
                                    <FontAwesomeIcon icon={faArrowLeft}
                                                     size={"sm"}

									/>&nbsp; Back
                                    <span className="button__hover"/>
                                </button>
                            </div>
                        </div>
                        <div className="content__ping content__ping--noanimation"/>
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