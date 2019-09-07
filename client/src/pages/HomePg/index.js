
import React, { Component } from "react";
// import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import "./style.css";

// import Header from "../../components/Header";
import Grid from "../../components/Grid";
// import Auth from "../../containers/Auth"
// import MessageText from "../../components/MessageText"
import Preview from "../../components/Preview";
import Preview2 from "../../components/Preview2";
import Footer from "../../components/Footer";
// import Signin from "../../containers/Auth/SignIn";
import Auth from "../../containers/Auth"

// import io from "socket.io-client"
// let socket = io.connect('http://localhost:4000');

// // let socket = io();
// socket.on('server-send', function (data) {
//   console.log(data);
//   socket.emit('client-send', { my: 'wompalompa' });
// })

class HomePg extends Component {

  // componentDidMount() {
  //   this.props.socket.connect();
  // }

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
        {/* <Brand title='VIDI'/> */}
        {/* <Header /> */}
        {/* <Grid>
          {(this.state.userCheck) ? <h4 className="replacement">Learn more about VIDI</h4> : <Auth socket={this.props.socket} />}
        </Grid> */}

        <Grid>
          <Auth socket={this.props.socket} />
          {/* <div><MessageText socket={socket}/></div> */}
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
              Click <a href="/signup">here</a> to sign up today.
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
  // reduxForm({})
)(HomePg);

// export default HomePage;