import React from "react";
import Header from "./components/Header";
import logo from "./assets/images/logo.png"
import "./style.css"

const App = (props) => {
    return (
        <div>
            <div id="header-container">
                <div id="logo-image">
                    <img src={logo} alt=""></img>
                </div>
                <Header />
            </div>
            {props.children}
        </div>
    )
}

export default App;