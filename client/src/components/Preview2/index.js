import React from "react";
import Animate from "react-smooth";
// import Navbar from "./Navbar";
import "./style.css";

const Preview2 = props => (

    <header>
        {/* <Navbar /> */}
        <div>
           
                <Animate to="1" from="0.9" attributeName="opacity">

                    <div
                        style={{
                            backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 60%), url("https://i.imgur.com/jNWbO5u.jpg")`
                        }}
                        className="bgImagePreview"
                    >
                        {/* <div className="headerTitle">
                            <h1>VIDI</h1>
                            <h5>The Anti-Spoiler Chat for Film Enthusiasts</h5>
                        </div> */}
                        </div>
         
                </Animate>
           
        </div>
    </header>
);
  
export default Preview2;
