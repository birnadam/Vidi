import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signup } from "../../../actions/authActions";
import { InputField } from "../../../components/InputField";
import validator from "validator";
// import { Link } from 'react-router-dom';

// import socket from "../../../socket"
import { loadUser } from "../../../actions/dbActions"

import "./style.css";
import history from "../../../history";

class SignUp extends Component {

  renderErrors = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <div>{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    // console.log(meta);
    return (
      <div>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderErrors(meta)}
      </div>
    )
  }

  onSubmit = formProps => {
    console.log(formProps)
    this.props.signup(formProps, (userData) => {
      this.props.loadUser(userData, () => {
        console.log("Send to dbActions from onSubmit")
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
    // console.log(this.props)
    const { handleSubmit } = this.props;
    return (
      // <div className="modal-block">
      //   <div className="modal-brand">
      //     <div className="modal-brand-caption">
      //       <div className="logo">
      //         <h1>V</h1><span> <h1>I</h1></span><span> <h1>D</h1></span><span><h1>I</h1></span>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="modal-block-content">
      //     <h3>Register Today!</h3>
      //     <button id="stylingButton" className="btn btn-primary"></button>
      //     {/* this one is not rly a button ^ it's to fill empty space*/}
      //     <Link to="/signin"><button id="loginButton" type="submit" className="btn btn-primary">LOGIN</button></Link>
      //     <Link to="/signup"><button id="signupButtonT" type="submit" className="btn btn-primary">REGISTER</button></Link>
        <div>
          <h3>Register Today!</h3>
          <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit)}>
            <div className="form-group">
              <label for="email">EMAIL</label>
              {/* <input type="email" name="email" id="email" className="email form-control" /> */}
              <fieldset>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  className="email form-control registerEmail"
                  component={InputField}
                // component={renderInput} birna: I had to make a seperate component and grab input that way for the styling to work
                // go check it out, should work the same
                />
              </fieldset>
            </div>
            <div className="form-group">
              <label for="password">PASSWORD</label>
              {/* <input type="password" name="password" id="password" className="form-control" /> */}
              <fieldset>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  className="form-control registerPassword"
                  component={InputField}
                // component={renderInput} birna: I had to make a seperate component and grab input that way for the styling to work
                // go check it out, should work the same
                />
              </fieldset>
            </div>
            <div className="form-group">
              {/* <p className="help-block"><a href="/" className="link-underline">FORGOT YOUR PASSWORD?</a></p> */}
              {/* <p className="help-block2 mb-25">Already registered? Login <a href="/" className="clr-primary link-underline">here</a>.</p> */}
              <button type="submit" className="btn btn-block btn-radius btn-primary registerSubmit">REGISTER</button>
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

const validate = formValues => {
  const error = {};
  // console.log("validator", formValues);

  if (!formValues.email) {
    error.email = "You must enter an email";
  }

  if (formValues.email) {
    if (!validator.isEmail(formValues.email)) {
      error.email = "You must enter a valid email address";
    }
  }

  if (!formValues.password) {
    error.email = "You must enter a password";
  }
  return error;
}

export default compose(
  connect(mapStateToProps, { signup, loadUser }),
  reduxForm({
    form: "signup",
    validate
  })
)(SignUp);
