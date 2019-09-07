import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../history"

export default ChildComponent => {
    class ComposedComponent extends Component {
        componentDidMount(){
            this.shouldNavigateAway();
        }

        componentDidUpdate(){
            this.shouldNavigateAway();
        }

        shouldNavigateAway(){
            if (!this.props.auth) {
                this.props.history.push("/");
            }
        }

        render() {
            console.log(this.props)
            return <ChildComponent {...this.props} />
        }
    }

    function mapStateToProps({ auth }) {
        return { auth: auth.authenticated, history };
    }

    return connect(mapStateToProps, null)(ComposedComponent);
}
