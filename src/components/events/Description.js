import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import DescriptionModal from "./DescriptionModal";
import { connect } from 'react-redux';
import { registerEvent } from '../../actions/individualEvent';
import { createMessage } from '../../actions/messages';
class Description extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        hidden: "hidden"
    };

    static propTypes = {
        shortDescription: PropTypes.string,
        name: PropTypes.string,
        dateTime: PropTypes.string,
        prize: PropTypes.string,
        minTeam: PropTypes.number,
        maxTeam: PropTypes.number,
        details: PropTypes.string,
        ruleList: PropTypes.string,
        coordinators: PropTypes.array,
        registerEvent: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    };
    onRegister = (e) => {
         e.preventDefault();
         if(!this.props.isAuthenticated) {
            this.props.createMessage({ loginRedirect: 'Please login first!' });
            this.props.history.push("/login");
         }
         else {
             const details = {
                 eventID: this.props.eventID,
                 username: this.props.user.username
             }
             console.log(details);
             this.props.registerEvent(details);

         }

    }
    componentWillMount() {
        var that = this;
		setTimeout(function() {
			that.show();
		}, that.props.wait);
    }
    show() {
		this.setState({hidden : ""});
	}

    render() {
        const{name, locations, dateTime, prize, minTeam, maxTeam, details, shortDescription, ruleList, coordinators} = this.props;
        return (
            <div className={this.state.hidden}>
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
                    <div className="col-md-4 col-sm-12 text-center registerblock">
                        <div className="single_mid">
                            {/*<img src={notes} alt=""/>*/}
                            
                            <button type="submit" onClick={this.onRegister} className="btn btn-slide" tabIndex="3">Register
                            </button>
                            
                            
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
              <div className="container" id={"footer"}>
                 <p className="txt-railway">- Event Coordinators -</p>
                 {/* <br /> */}
           
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
   user: state.auth.user,
   isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps,{registerEvent,createMessage})(Description));
