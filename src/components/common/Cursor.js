import React, {Component} from 'react';
import ReactAnimationFrame from 'react-animation-frame';
import {lerp} from '../../utils/MathUtils';

class Cursor extends Component {
    constructor(props) {
        super(props);

        this.circleRef = React.createRef();

        this.state = {
            mousePos: {x: 0, y: 0},
            scale: 1,
            lastMousePos: {x: 0, y: 0},
            lastScale: 1,
            circleStyle: {}
        };
    }

    componentDidMount() {
        window.addEventListener('mousemove', ev => this._onMouseMove(ev));
        window.addEventListener('click', this._onClick);

        window.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('hover') ||
                e.target instanceof HTMLAnchorElement ||
                e.target instanceof HTMLButtonElement) {
                this._onMouseOver();
            }
        });

        window.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('hover') ||
                e.target instanceof HTMLAnchorElement ||
                e.target instanceof HTMLButtonElement) {
                this._onMouseOut();
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this._onMouseMove);
        window.removeEventListener('click', this._onClick);
        window.removeEventListener('mouseover', this._onMouseOver);
        window.removeEventListener('mouseout', this._onMouseOut);
    }

    onAnimationFrame() {
        const bounds = this.circleRef.current.getBoundingClientRect();

        const {mousePos, lastMousePos, scale, lastScale} = this.state;

        this.setState({
            lastMousePos: {
                x: lerp(lastMousePos.x, mousePos.x - bounds.width / 2, 0.15),
                y: lerp(lastMousePos.y, mousePos.y - bounds.height / 2, 0.15)
            },
            lastScale: lerp(lastScale, scale, 0.15),
            circleStyle: {
                'transform': `translateX(${(lastMousePos.x)}px) translateY(${lastMousePos.y}px) scale(${lastScale})`
            }
        });
    }

    _onMouseMove = (e) => {
        let posX = 0;
        let posY = 0;

        if (e.pageX || e.pageY) {
            posX = e.pageX;
            posY = e.pageY;
        }

        this.setState({
            mousePos: {x: posX, y: posY}
        });
    };

    _onMouseOver = () => {
        this.setState({
            scale: 1.5
        });
    };

    _onMouseOut = () => {
        this.setState({
            scale: 1
        });
    };

    _onClick = () => {
        this.setState({
            lastScale: 0.4
        });
    };

    render() {
        const {circleStyle} = this.state;

        return (
            <div className="cursor">
                <div className="cursor__inner cursor__inner--circle"
                     style={circleStyle}
                     ref={this.circleRef}/>
            </div>
        );
    }
}

export default ReactAnimationFrame(Cursor);