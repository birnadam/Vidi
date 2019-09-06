import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signin } from "../../../actions/authActions";
import { InputField } from "../../../components/InputField"
// import { Link } from 'react-router-dom';
import "./style.css";
import history from "../../../history";

// import socket from "../../../socket"
import { loadUser } from "../../../actions/dbActions"

class SignIn extends Component {

  renderInput = ({ input }) => {
    console.log(input);
    return <input {...input} />
  }

  onSubmit = formProps => {
    console.log(formProps)
    this.props.signin(formProps, (userData) => {
      this.props.loadUser(userData, () => {
        console.log("Send to dbActions from ComponentDidMount")
      })
      history.push("/dashboard");
    })
  }

  componentDidMount() {
    // this.props.socket.on("UserLoaded", data => {
    //   console.log(data)
    // });
  }

  render() {
    // console.log(this.props);
    const { handleSubmit } = this.props;
    return (
      // <div className="modal-block">
      //   <div className="modal-brand">
      //     <div className="modal-brand-caption">
      //       <div className="logo">
      //         <h1>V</h1><span> <h1>I</h1></span><span><h1>D</h1></span><span><h1>I</h1></span>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="modal-block-content">
      //     <h3>Welcome Back!</h3>
      //     <button id="stylingButton" className="btn btn-primary"></button>
      //     {/* this one is not rly a button ^ it's to fill empty space*/}
      //     <Link className="login" to="/signin"><button id="loginButtonT" type="submit" className="btn btn-primary">LOGIN</button></Link>
      //     <Link className="register" to="/signup"><button id="signupButton" type="submit" className="btn btn-primary">REGISTER</button></Link>

      <div>
        <h3>Welcome Back!</h3>
        <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <div className="form-group">
              <label for="email">EMAIL</label>
              {/* <input type="email" name="email" id="email" className="email form-control" /> */}
              <Field
                name="email"
                type="text"
                id="email"
                className="email form-control loginEmail"
                component={InputField}
              // component={renderInput} birna: I had to make a seperate component and grab input that way for the styling to work
              // go check it out, should work the same
              />
            </div>
            <div className="form-group">
              <label for="password">PASSWORD</label>
              {/* <input type="password" name="password" id="password" className="form-control" /> */}
              <Field
                name="password"
                type="password"
                id="password"
                className="form-control loginPassword"
                component={InputField}
              // component={renderInput} birna: I had to make a seperate component and grab input that way for the styling to work
              // go check it out, should work the same
              />
            </div>
          </fieldset>
          <div className="form-group">
            {/* <p className="help-block"><a href="/" className="link-underline">FORGOT YOUR PASSWORD?</a></p>
                    <p className="help-block2 mb-25">Need an account? Register <a href="/users/register" className="clr-primary link-underline">here</a>.</p> */}
            <button type="submit" className="btn btn-block btn-radius btn-primary loginSubmit">LOGIN</button>
          </div>
        </form>
      </div>

      // </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, { signin, loadUser }),
  reduxForm({ form: "signin" })
)(SignIn);