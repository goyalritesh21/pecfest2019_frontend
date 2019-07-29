import React, {Component} from "react";
import PropTypes from 'prop-types';
import DescriptionModal from "./DescriptionModal";
import { connect } from 'react-redux';
class Description extends Component {
    state = {};

    static propTypes = {
        shortDescription: PropTypes.string,
        name: PropTypes.string,
        dateTime: PropTypes.string,
        prize: PropTypes.string,
        minTeam: PropTypes.number,
        maxTeam: PropTypes.number,
        details: PropTypes.string,
        ruleList: PropTypes.string,
        coordinators: PropTypes.array
    };

    render() {
        const{name, locations, dateTime, prize, minTeam, maxTeam, details, shortDescription, ruleList, coordinators} = this.props;
        return (
            <div className="container-fluid" id="services">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="section-title text-center mb-60">
                            {/*<p> Wanna Know More..?</p>*/}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <div className="single_service service_right">
                            <h4>Description</h4>
                            <DescriptionModal
                                contentId="description"
                                modalRequired={true}
                                content={shortDescription}
                                modalHeading={"Details"}
                                modalContent={details}/>
                        </div>
                        <div className="single_service service_right">
                           <h4>Venue</h4>
                            <DescriptionModal
                                contentId="venue"
                                content={[["Location", locations], ["Day", dateTime]]}
                                modalRequired={false}/>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 text-center">
                        <div className="single_mid">
                            {/*<img src={notes} alt=""/>*/}
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="single_service service_left">
                             <h4>Rules</h4>
                            <DescriptionModal
                                contentId="rules"
                                content={[["Minimum Team Size", minTeam], ["Maximum Team Size", maxTeam]]}
                                modalRequired={true}
                                modalHeading={"Rules"}
                                modalContent={ruleList}/>
                        </div>
                        <div className="single_service service_left">
                            <h4>Prizes</h4>
                            <DescriptionModal
                                contentId="prizes"
                                content={prize}
                                modalRequired={false}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
   event: state.individualEvent.event
});

export default connect(mapStateToProps)(Description);
