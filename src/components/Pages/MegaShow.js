import React, {Component} from "react"
import anime from 'animejs';

const THREE = require('three');
window.THREE = THREE;
require('three/examples/js/renderers/CSS3DRenderer');

class MegaShow extends Component {
    constructor(props) {
        super(props);

        this.mouseX = 0;
        this.mouseY = 0;
    }

    getTitleHTML() {
        return this.props.show.title;
    }

    getTitleLineHTML() {
        if (this.props.show.titleLine.toLowerCase().startsWith('headlining')) {
            return `<span class="Darker">Headlining</span> ${this.props.show.titleLine.slice('headlining'.length)}`;
        }
        return this.props.show.titleLine;
    }

    createInnerDescription() {
        const innerDiv = document.createElement('div');
        innerDiv.classList.add('MegaShow-innerDiv');
        const heading = document.createElement('h1');
        heading.classList.add('MegaShow-heading');
        heading.innerHTML = this.getTitleHTML();
        innerDiv.appendChild(heading);

        if (typeof this.props.show.titleLine !== 'undefined') {
            const titleLine = document.createElement('div');
            titleLine.classList.add('MegaShow-titleline');
            titleLine.innerHTML = this.getTitleLineHTML();
            innerDiv.appendChild(titleLine);
        }

        const location = document.createElement('div');
        location.innerHTML = `${this.props.show.venue}`;
        location.classList.add('MegaShow-locationHeading');
        innerDiv.appendChild(location);

        return innerDiv;
    }

    createObject() {
        const fieldset = document.createElement('div');
        fieldset.classList.add('MegaShow-fieldset');
        const innerDiv = this.createInnerDescription();
        fieldset.appendChild(innerDiv);
        return fieldset;
    }

    createCover() {
        const backgroundImage = document.createElement('img');
        backgroundImage.src = this.props.show.coverPhoto;
        backgroundImage.classList.add('MegaShow-cover');
        return backgroundImage;
    }

    createBackground() {
        const outerDiv = document.createElement('div');
        outerDiv.classList.add('MegaShow');
        outerDiv.style.backgroundImage = 'url(' + this.props.show.coverPhoto + ')';
        return outerDiv;
    }

    componentDidMount() {
        this._mounted = true;
        const width = this.wrapperRef.clientWidth;
        const height = this.wrapperRef.clientHeight;

        this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 5000);
        this.camera.position.set(0, 0, 700);
        this.scene = new THREE.Scene();

        this.renderer = new THREE.CSS3DRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.top = '0';

        this.outerDiv = this.createBackground();

        const object = new THREE.CSS3DObject(this.outerDiv);
        object.position.set(0, 0, 100);
        object.scale.set(10, 10, 1);

        this.scene.add(object);

        this.backgroundImage = this.createCover();
        const imageObject = new THREE.CSS3DObject(this.backgroundImage);
        imageObject.position.set(-width / 2, -height / 2, 500);

        this.scene.add(imageObject);

        this.fieldset = this.createObject();
        this.headingObject = new THREE.CSS3DObject(this.fieldset);
        this.headingObject.position.set(0, 0, 350);

        this.scene.add(this.headingObject);

        window.addEventListener('resize', this.handleWindowResize);
        window.addEventListener('orientationchange', this.handleOrientationChange);
        window.addEventListener('deviceorientation', this.handleOrientationChange);

        this.wrapperRef.appendChild(this.renderer.domElement);
        this.animate();
        this.start();
    }

    handleOrientationChange = event => {
        this.mouseX = -event.gamma;
    };

    start() {
        this.timeline = anime.timeline();
        this.timeline.add({
            targets: this.camera.position,
            z: [150, 700],
            easing: 'easeOutExpo',
            duration: 2000,
        }).add({
            targets: '.MegaShow-heading, .MegaShow-titleline, .MegaShow-locationHeading, .RegisterButton, .posterUrl',
            opacity: [0, 1],
            duration: 2000,
            translateX: ['100px', '0'],
            easing: 'easeOutExpo',
            delay: (el, i, l) => 100 * i
        })
    }

    animate = () => {
        if (this._mounted) {
            window.requestAnimationFrame(this.animate);
        }

        this.camera.position.x += (this.mouseX - this.camera.position.x) * .05;
        this.camera.position.y += ((this.mouseY) - this.camera.position.y) * .05;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    };

    handleMouseMove = (event) => {
        this.mouseX = (event.clientX - window.innerWidth / 2) / 10;
        this.mouseY = (event.clientY - window.innerHeight / 2) / 10;
    };

    handleWindowResize = () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    handleNext() {
        const element = document.querySelector('img.MegaShow-cover');
        element.src = this.props.show.coverPhoto;

        // update image
        const outer = document.querySelector('div.MegaShow');
        outer.style.backgroundImage = 'url(' + this.props.show.coverPhoto + ')';

        // update information
        const innerDiv = this.createInnerDescription();
        const description = document.querySelector('div.MegaShow-fieldset');
        description.replaceChild(innerDiv, description.firstChild);
    }

    componentDidUpdate() {
        this.handleNext();
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        return (
            <div className="MegaShow-wrapper"
                 ref={node => (this.wrapperRef = node)}
                 onMouseMove={this.handleMouseMove}>
            </div>
        )
    }
}

export default MegaShow
