import React, { Suspense, lazy } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from "../components/common/PrivateRoute";
import Loader from '../components/common/Loader';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const Home = lazy(() => import('../components/Pages/Home'));
const Sponsors = lazy(() => import('../components/Pages/Sponsors'));
const About = lazy(() => import('../components/Pages/About'));
const Events = lazy(() => import('../components/Pages/Events'));
const LoginPage = lazy(() => import('../components/Pages/LoginPage'));
const RegisterPage = lazy(() => import('../components/Pages/RegisterPage'));
const MegaShows = lazy(() => import('../components/Pages/MegaShows'));
const IndividualEvent = lazy(() => import("../components/events/EventInfo"));
const Types = lazy(() => import("../components/events/TypesCategories"));
const ExtraDetails = lazy(() => import("../components/accounts/ExtraDetails"));
const NotFound = lazy(() => import("../components/common/NotFound"));

const AppRouter = ({ location }) => {
    return (
        <div id={"page-wrap"} style={{ width: "100%", height: "100%", position: "fixed", top: "0", left: "0" }}>
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={{ enter: 0, exit: 0 }}
                    classNames={"fade"}
                >
                    <Suspense fallback={<Loader />}>
                        <Switch location={location}>
                            <Route exact path={"/"} component={Home} />
                            <Route exact path={"/sponsors"} component={Sponsors} />
                            <Route exact path={"/about"} component={About} />
                            <Route exact path={"/megashows"} component={MegaShows} />
                            <Route exact path={"/events"} component={Events} />
                            <Route exact path={"/login"} render={props => <LoginPage {...props} />} />
                            <Route exact path={"/register"} component={RegisterPage} />
                            <Route exact path={"/events/:category"} component={Types} />
                            <Route exact path={"/event/:eventId"} component={IndividualEvent} />
                            <PrivateRoute exact path={"/update"} component={ExtraDetails} />
                            <Route component={NotFound} />
                        </Switch>
                    </Suspense>
                </CSSTransition>
            </TransitionGroup>
        </div>

    );
};

export default withRouter(AppRouter);