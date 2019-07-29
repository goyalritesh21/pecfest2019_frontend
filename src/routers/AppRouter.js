import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Home from '../components/Pages/Home';
import Sponsors from '../components/Pages/Sponsors';
import About from '../components/Pages/About';
import Events from '../components/Pages/Events';
import LoginPage from '../components/Pages/LoginPage';
import RegisterPage from '../components/Pages/RegisterPage';
import Megashows from '../components/Pages/Megashows';
import IndividualEvent from "../components/events/EventInfo";
import Types from "../components/events/TypesCategories";
import ExtraDetails from "../components/accounts/ExtraDetails";
import NotFound from '../components/common/NotFound';
import PrivateRoute from "../components/common/PrivateRoute";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const AppRouter = ({location}) => {
    return (
        <div id={"page-wrap"} style={{width: "100%", height: "100%", position: "fixed", top: "0", left: "0"}}>
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={300}
                    classNames={"fade"}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/sponsors" component={Sponsors}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path={"/megashows"} component={Megashows}/>
                        <Route exact path={"/events"} component={Events}/>
                        <Route exact path={"/login"} component={LoginPage}/>
                        <Route exact path={"/register"} component={RegisterPage}/>
                        <Route exact path={"/events/:category"} component={Types}/>
                        <Route exact path={"/event/:eventId"} component={IndividualEvent}/>
                        <PrivateRoute exact path={"/update"} component={ExtraDetails}/>
                        <Route component={NotFound}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>

    );
};

export default withRouter(AppRouter);