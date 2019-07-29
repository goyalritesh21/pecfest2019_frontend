import React, {Component} from 'react';
import Particle from './Particle';
class ThreeScene extends Component {
    componentDidMount() {
        Particle();
    }
    render() {
        return (
            <div>
                <canvas id={"particle-effect-canvas"}></canvas>
            </div>
        );
    }
}

export default ThreeScene;