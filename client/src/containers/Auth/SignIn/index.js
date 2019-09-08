import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signin } from "../../../actions/authActions";
import { InputField } from "../../../components/InputField"
import "./style.css";
import history from "../../../history";
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

  render() {
    const { handleSubmit } = this.props;
    return (

      <div>
        <h3 className="mb-5">Welcome Back!</h3>
        <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <div className="form-group">
              <label for="email" id="labelColor">EMAIL</label>
              <Field
                name="email"
                type="text"
                id="email"
                className="email form-control loginEmail"
                component={InputField}
              />
            </div>

            <div className="form-group">
              <label for="password" id="labelColor">PASSWORD</label>
              <Field
                name="password"
                type="password"
                id="password"
                className="form-control loginPassword"
                component={InputField}
              />
            </div>
          </fieldset>

          <div className="form-group">
            <button type="submit" className="btn btn-block btn-radius btn-primary loginSubmit">LOGIN</button>
          </div>
        </form>
      </div>
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