// import React from "react";
// import "./App.css";

// // import io from "socket.io-client"
// // let socket = io.connect('http://localhost:4000');

// // // let socket = io();
// // socket.on('server-send', function (data) {
// //   console.log(data);
// //   socket.emit('client-send', { my: 'wompalompa' });
// // })

// const App = ({ children }) => {
//     return (
//         <div>
//             {children}
//         </div>
//     )
// }

// export default App;


import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
// import { reduxForm, Field } from "redux-form";
// import socket from "./socket"
import Dashboard from "./pages/DashboardPg";
import Profile from "./pages/ProfilePg";
import ExplorerPg from "./pages/ExplorerPg";
import Welcome from "./components/Welcome"
import HomePg from "./pages/HomePg";
import CreateChat from "./containers/CreateChat"


import io from "socket.io-client"
const socket = io();

class App extends Component {

    //   componentDidMount() {
    //     this.props.socket.on("connection", {app: "connected"});
    //   }

    render() {
        // {props.children}
        if (window.location.href === "http://localhost:3000/dashboard" || window.location.href === "https://musa-notyet.herokuapp.com/dashboard") {
            return (
                // <Dashboard />
                <Dashboard socket={socket} />
            )
        }
        else if (window.location.href === "http://localhost:3000/profile" || window.location.href === "https://musa-notyet.herokuapp.com/profile") {
            return (
                // <Profile />
                <Profile socket={socket} />
            )
        }
        else if (window.location.href === "http://localhost:3000/" || window.location.href === "https://musa-notyet.herokuapp.com/") {
            return (
                // <Profile />
                <HomePg socket={socket} />
            )
        }
        else if (window.location.href === "http://localhost:3000/explorer" || window.location.href === "https://musa-notyet.herokuapp.com/explorer") {
            return (

                <ExplorerPg socket={socket} />

            )
        }
        else if (window.location.href === "http://localhost:3000/createchat" || window.location.href === "https://musa-notyet.herokuapp.com/createchat") {
            return (

                <CreateChat socket={socket} />

            )
        } else {
            return (
                <Welcome />
            )
        }

    }
}

function mapStateToProps(state) {
    return { state };
}

export default compose(
    // connect(mapStateToProps, {}),
    connect(mapStateToProps, { socket }),
    // reduxForm({})
)(App);