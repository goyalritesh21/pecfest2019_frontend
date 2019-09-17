import React, {Component} from 'react';
import AlertTemplate from "react-alert-template-basic";
import {BrowserRouter as Router} from "react-router-dom";
import Background from './components/layout/Background/Background';
import Header from './components/layout/Header';
import AppRouter from './routers/AppRouter';
import Alerts from './components/layout/Alerts';
import {Provider as AlertProvider} from "react-alert";
// import history from "./utils/history";
import {Provider} from 'react-redux'
import store from "./store";
import {loadUser} from "./actions/auth";

const alertOptions = {
    timeout: 4000,
    position: 'top center'
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        {/*<Background/>*/}
                        <div className={"overlay-2"}>
                            <Header/>
                            <Alerts/>
                            <AppRouter/>
                        </div>
                    </Router>
                </AlertProvider>
            </Provider>

        );
    }
}

export default App;