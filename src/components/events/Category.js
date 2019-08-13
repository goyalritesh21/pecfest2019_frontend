import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cult from '../../images/cult.jpg';
import Tech from '../../images/tech.jpg';
import {
    MDBCol, MDBCard, MDBCardImage,
    MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn
} from "mdbreact";
import { setCategory } from '../../actions/events';
import { Link } from 'react-router-dom';

class Category extends Component {
    state = {
        img: null
    };


    static propTypes = {
        setCategory: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { id } = this.props;
        this.getImage(id);
    }

    getImage = (id) => {
        if (id === "tech" || id === "lect") {
            this.setState(() => ({ img: Tech }));
        }
        else {
            this.setState(() => ({ img: Cult }));
        }
    };

    _onClick = (category) => {
        this.props.setCategory(category);
    };
    render() {
        const { img } = this.state;
        const { category, id } = this.props;
        return (
            <div className={"col-md-3 category-link"}>
                {/* This div is for {this.props.category} Category. */}
                <MDBCol md="4">
                    <MDBCard className="mb-2 bgnone">
                        <MDBCardImage className="img-flu img-transparent" src={img} />
                        <MDBCardBody className="mdbcardbody">
                            <br />
                            <MDBCardTitle>{category}</MDBCardTitle>
                            <MDBCardText>
                                Some quick example text to build on the card title and
                                make up the bulk of the card's content.
                            </MDBCardText>
                            <Link to={`/events/${id}`} style={{ cursor: 'pointer' }}>
                                <MDBBtn className="button button--aylen button--border-thick button--inverted button--text-upper button--size-s menu--viola ">View Events</MDBBtn>
                            </Link>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div>
        )
            ;
    }
}

export default connect(null, { setCategory })(Category);







