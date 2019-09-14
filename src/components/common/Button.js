import React, {Component} from "react";
import * as propTypes from 'prop-types';
class Button extends Component {
    render(){
        const {title} = this.props;
        return (
            <div className="reg-btn-bg Ocean">
                <div className="reg-btn-group">
                    <div className="reg-btn Coral">
                        <button>{title}
                            <span className="Coralwave1" />
                            <span className="Coralwave2" />
                            <span className="Coralwave3" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Button.propTypes = {
    title: propTypes.string.isRequired
};

export default Button;