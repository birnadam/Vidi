
import React, { Component } from "react";
import "./style.css";
import { compose } from "redux";
import { connect } from "react-redux";
import MessageText from "../../components/MessageText"
class ChatArea extends Component {

  state = {
    //sample message object
    currentChatId: "",
    currentChannelName: "Stranger Things",
    messageObj: [
      {
        username: "user1",
        message: " Wow season 3 was amazing ._.",
        timestamp: "Jul 31, 2019 10:25 PM",
        profile: "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png"
      },
      {
        username: "user2",
        message: "I knowww!!! LOL Dustin cracks me up",
        timestamp: "Aug 2, 2019 10:25 PM",
        profile: "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png"
      },
      {
        username: "user",
        message: "I knowww!!! LOL Dustin cracks me up",
        timestamp: "Aug 2, 2019 10:25 PM",
        profile: "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png"
      },
      {
        username: "user3",
        message: "I knowww!!! LOL Dustin cracks me up",
        timestamp: "Aug 2, 2019 10:25 PM",
        profile: "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png"
      },
      {
        username: "user4",
        message: "I knowww!!! LOL Dustin cracks me up",
        timestamp: "Aug 2, 2019 10:25 PM",
        profile: "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png"
      }
    ]
  }
  render() {
    return (
      <div id="page">
        {/* CHANNEL NAME GOES INTO THIS SPAN */}
        <div id="chat" className="pageChat">
          <div className="page-header clearfix topicName">
            <span>{this.state.currentChannelName} </span>
          </div>

          <div className="chat-body scroll-hijack">
            {/* REPEATING BLOCK ELEMENT */}
            {this.state.messageObj.map(message =>
              <div className="chat-message">
                <div className="avatar"><img src={message.profile} alt="" height="20px" /></div>
                <div className="chat-message-content">
                  <a href="/" className="chat-message-author">{message.username}</a>
                  <span className="chat-message-date">{message.timestamp}</span>
                  <div className="chat-message-message">
                    {message.message}

                  </div>
                </div>
              </div>
            )}


          </div>
          <div className="chat-footer relative">
            <div id="message-form">
              {/* NOTE FOR BIRNA: styling messed up a little, uncomment line below to see difference -BL*/}
              {/* <input name="message" type="text" className="post-input messageArea" placeholder="Type your msg here..." /> */}
              <MessageText className="messageArea post-input" socket={this.props.socket} />
              <button type="submit" className="post-button messageSubmit"><span className="caret-right"></span></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  //grab messages from state
  return { state }
}

export default compose(
  connect(mapStateToProps, {}),
)(ChatArea);