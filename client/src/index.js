import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import './style.css';
import history from './history';
import io from "socket.io-client"

// import components
import App from './App';
import HomePg from "./pages/HomePg";
import DashboardPg from "./pages/DashboardPg";
import ProfilePg from "./pages/ProfilePg";
import Wrapper from './components/Wrapper';
import Explorer from './pages/ExplorerPg';
import './style.css';
import SignOut from './containers/SignOut';

// configure redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initial_state = { auth: { authenticated: localStorage.getItem("token") } };

const store = createStore(
    reducers,
    initial_state,
    composeEnhancers(applyMiddleware(reduxThunk))
)

const socket = io();

socket.emit("connection", { socket: "connected" }, function (data) {
    console.log(data)
})

socket.on("connected", function (data, cb) {
    console.log("Client Socket is connected")
    cb(data)
    socket.on("disconnect", () => console.log("Server disconnected"))
})

//#region
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Wrapper>
                <App>
                    <Route exact path="/" render={() => <HomePg socket={socket} />} />
                    <Route exact path="/dashboard" render={() => <DashboardPg socket={socket} />} />
                    <Route exact path="/profile" render={() => <ProfilePg socket={socket} />} />
                    <Route exact path="/explorer" render={() => <Explorer socket={socket} />} />
                    <Route exact path="/logout" render={() => <SignOut />} />
                </App>
            </Wrapper>
        </Router>
    </Provider>
    , document.getElementById('root')
);
//#endregion