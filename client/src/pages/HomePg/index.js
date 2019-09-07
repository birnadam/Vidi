
import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import "./style.css";
import Grid from "../../components/Grid";
import Preview from "../../components/Preview";
import Preview2 from "../../components/Preview2";
import Footer from "../../components/Footer";
import Auth from "../../containers/Auth"

class HomePg extends Component {

  state = {
    userCheck: false
  }

  componentDidMount() {
    console.log(this.state)
    let userCheck = this.props.state.auth.authenticated
    if (userCheck !== "" && userCheck !== null) {
      this.setState({
        userCheck: true
      })
    } else {
      this.setState({
        userCheck: false
      })
    }
  }

  render() {
    return (
      <div>
        <Grid>
          {(this.state.userCheck) ? <h4 className="replacement">Welcome back! <br></br> Select an option above to use VIDI</h4> : <Auth socket={this.props.socket} />}
          <h4 className="whatMsg">VIDI is a chat program for movies and TV shows.
          What makes our app special is that we prevent spoilers by hiding chats
          until the user verifies they've viewed.
              </h4>
          <Preview />
          <h4 className="howMsg">You're able to chat with others who enjoy your favorites,
          discover new films to watch, rate a specific episode or movie, search for users or media,
          and more.
              </h4>
          <Preview2 />
          <h4 className="doMsg">Above is a sneakpeek of what this app has to offer.
          A sleek messenger that's got a multitude of ways to keep you entertained.
              Click <a href="http://localhost:3000">here</a> to sign up today.
              </h4>
          <Footer />
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { state };
}

export default compose(
  connect(mapStateToProps, {}),
)(HomePg);