
import React, { Component } from "react";
import Signin from "./SignIn";
import Signup from "./SignUp";
import { compose } from "redux";
import { connect } from "react-redux";

class Auth extends Component {

  constructor(props) {
    super(props);

    this.state = {
      btn: true
    };

    this.renderSignin = this.renderSignin.bind(this);
    this.renderSignup = this.renderSignup.bind(this);
  }

  renderSignup() {
    this.setState({ btn: false })
    console.log(this.state)
  }

  renderSignin() {
    this.setState({ btn: true })
    console.log(this.state)
  }

  render() {
    return (
      <div className="modal-block">
        <div className="modal-brand">
          <div className="modal-brand-caption">
            <div className="logo">
              <h1>V</h1><span> <h1>I</h1></span><span><h1>D</h1></span><span><h1>I</h1></span>
            </div>
          </div>
        </div>
        <div className="modal-block-content">
          <br></br>
          <button id="stylingButton" className="btn btn-primary"></button>
          {/* this one is not rly a button ^ it's to fill empty space*/}
          <button id="loginButton" className="btn btn-primary" onClick={this.renderSignin}>LOGIN</button>
          <button id="signupButton" className="btn btn-primary" onClick={this.renderSignup}>REGISTER</button>

          {(this.state.btn) ? <Signin socket={this.props.socket} /> : <Signup socket={this.props.socket} />}

        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { state }
}

export default compose(
  connect(mapStateToProps, {}),
)(Auth);