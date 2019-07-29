import React, {Component, Fragment} from "react";
import {Modal, Button} from 'react-bootstrap';

const MyModal = (props) => (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        scrollable={true}
        centered>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {props.heading}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/*<h4>Centered Modal</h4>*/}
            <p>
                {props.content}
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>

);

class DescriptionModal extends Component {
    state = {
        modalShow: false
    };

    modalClose = () => {
        this.setState((prevState) => ({modalShow: !prevState.modalShow}))
    };

    render() {
        const {content, modalHeading, modalContent, modalRequired, contentId} = this.props;
        console.log(content);
        return (
            <Fragment>
                    {(contentId === "rules" || contentId==="venue") ? (<ul>
                        {
                            content.map(([name, value], index)=>(
                                <li key={index}><label>{name}:</label> {value}</li>
                            ))
                        }
                    </ul>) : (<p>{content}</p>)
                    }
                { modalRequired && <label
                        className={"modal-link"}
                        onClick={() => {
                            this.setState(() => ({modalShow: true}))
                        }}>
                        Know More...
                    </label>}

                {modalRequired && <MyModal
                    show={this.state.modalShow}
                    onHide={this.modalClose}
                    heading={modalHeading}
                    content={modalContent}
                />}

            </Fragment>
        );
    }
}

export default DescriptionModal;
