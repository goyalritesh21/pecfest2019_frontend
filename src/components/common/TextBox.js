import React, {Component} from 'react';
import "../../styles/components/common/_TextBox.scss"

class TextBox extends Component {
    constructor(props) {
        super(props);

        this.id = '_' + Math.random().toString(36).substr(2, 9);
    }

    render() {
        const {text, large} = this.props;

        const textBoxClassName = large ? "text-box-large" : "text-box";

        return (
            <div>
                <svg className={textBoxClassName}>
                    <symbol id={this.id}>
                        <text textAnchor="middle" x={"50%"} y={"50%"} dy={".35em"}>
                            {text}
                        </text>
                    </symbol>
                    <use className="text-box__text" xlinkHref={"#" + this.id}/>
                    <use className="text-box__text" xlinkHref={"#" + this.id}/>
                    <use className="text-box__text" xlinkHref={"#" + this.id}/>
                    <use className="text-box__text" xlinkHref={"#" + this.id}/>
                    <use className="text-box__text" xlinkHref={"#" + this.id}/>
                </svg>
            </div>
        );
    }
}

export default TextBox;