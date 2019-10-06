import React, {Component} from "react";
import ReactDom from "react-dom";
import './aboutUs.css';

class About extends Component {
	componentDidMount() {
		const slideElements = ['.back__slide', '.card__slide', '.content__slide'];
        // const slideElements = ['.card__slide', '.content__slide'];
		let inProgress = false;
		this.state = {
			state1 : ''
		};

		const node = ReactDom.findDOMNode(this);

		const goToSlide = (slideElements, index) => {
			if (!inProgress){
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


			slideElements.forEach( elem => {
			  node.querySelector(`${elem}:nth-child(${index})`).classList.add('active');
			})

			const evenSlide = index % 2 === 0;
			if (evenSlide)
			  node.querySelector('.content__ping').classList.add('content__ping--right');
			else
			  node.querySelector('.content__ping').classList.remove('content__ping--right');
			
            var selection = node.querySelector('.content__ping--noanimation') !== null;
            console.log("selection " + selection + " " + (selection === true));
            if (selection === true) {
              node.querySelector('.content__ping--noanimation').classList.remove('content__ping--noanimation');
            }

			setTimeout(() => node.querySelector('.exit').classList.remove('exit'), 1000);
			setTimeout(() => inProgress = false, 2000);
			}
		}

		node.querySelector('.content__slide:nth-child(1) .button').addEventListener('click', () => goToSlide(slideElements, 2) );
		node.querySelector('.content__slide:nth-child(2) .button').addEventListener('click', () => goToSlide(slideElements, 1) );
		// setTimeout( () => goToSlide(slideElements, 2), 2000 );
		// setTimeout( () => goToSlide(slideElements, 1), 6000 );
		}


	render () {
		return (
		<div className="wrap">
		    <div className="back">
		        <div className="back__slide active">
		            <div className="progress"></div>
		        </div>
		        <div className="back__slide">
		            <div className="progress"></div>
		            {/*<div className="back-front-image"></div>*/}
		        </div>
		    </div>
		    <div className="card">
		        <div className="card__slide active">
		            {/*<div className="image"></div>*/}
		            <span className="number">01</span>
		        </div>
		        <div className="card__slide">
		            <div className="back-image"></div>
		            {/*<div className="image"></div>*/}
                    <span className="number">02</span>
		        </div>

		        <div className="content">
		            <div className="content__slide active">
		                <h2 className="title">
                            <span className="title__line">
                                <span className="title__inner">Mesmerizing</span>
                            </span>
                            <span className="title__line">
                                <span className="title__inner">Depths</span>
                            </span>
		                </h2>

		                <p className="desc">
                            Nunc orci metus, ornare non molestie ac, ultrices eget<br/>dolor. Mauris ac mattis lectus. Praesent facilisis<br/>malesuada sapien nec pharetra. Fusce eleifend, nisl.
                        </p>
		                <div className="button-wrap">
                            <a className="button">Learn More
                                <span className="button__hover"></span>
                            </a>
                        </div>
		            </div>
		            <div className="content__slide">
		                <h2 className="title">
                            <span className="title__line">
                                <span className="title__inner">Breathtaking</span>
                            </span>
                            <span className="title__line">
                                <span className="title__inner">Heights</span>
                            </span>
		                </h2>
		                <p className="desc">
                            Nunc orci metus, ornare non molestie ac, ultrices eget<br/>dolor. Mauris ac mattis lectus. Praesent facilisis<br/>malesuada sapien nec pharetra. Fusce eleifend, nisl.
                        </p>
		                <div className="button-wrap">
                            <a className="button">Learn More
                                <span className="button__hover"></span>
                            </a>
                        </div>
		            </div>
		            <div className="content__ping content__ping--noanimation"></div>
		        </div>
		    </div>
		</div>
			);
	}
}

export default About;