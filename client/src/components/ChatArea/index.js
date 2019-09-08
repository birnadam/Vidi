import React, { Component } from "react";
import ReactDOM from 'react-dom';
import "./style.css";
import { compose } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import MessageText from "../../components/MessageText"

class ChatArea extends Component {

  state = {
    //sample message object
    currentChatId: "",
    currentChannelName: "Stranger Things",
    messageObj: {
      username: "user1",
      timestamp: "Aug 2, 2019 10:25 PM",
      profile: "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png"
    }
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    // console.log("scroll to bottom")
    let chatTextArea = document.getElementById("scrollbar")
    const scrollHeight = chatTextArea.scrollHeight;
    const height = chatTextArea.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(chatTextArea).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  renderMessages = () => {
    let messages = this.props.state.db.ActiveChannel.messages;
    console.log(messages)
    if (this.props.state.db.ActiveChannel.messages && this.props.state.db.ActiveChannel.messages.length !== 0) {
      return (
        messages.map((message, index) =>
          <div className="chat-message" key={index}>
            <div className="avatar"><img src={this.state.messageObj.profile} alt="" height="30px" /></div>
            <div className="chat-message-content">
              <a href="/" className="chat-message-author">{message ? message.sender.username : "loser"}</a>
              <span className="chat-message-date">{moment(message.date).format("ddd | MMM D | h:m A")}</span>
              <div className="chat-message-message">
                {message ? message.sent_messages.content : "you message didn't come through"}
              </div>
            </div>
          </div>
        )
      )
    } else {
      return (
        <div className="chat-message">
          <div className="avatar"><img src={this.state.messageObj.profile} alt="" height="30px" /></div>
          <div className="chat-message-content">
            <a href="/" className="chat-message-author">Admin</a>
            <span className="chat-message-date">{this.state.messageObj.timestamp}</span>
            <div className="chat-message-message">Your new channel has been created!
              </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div id="page">
        <div id="chat-list">
          <ul className="chat-list scroll-hijack">
          </ul>
        </div>
        {/* CHANNEL NAME GOES INTO THIS SPAN */}
        <div id="chat" className="pageChat">
          <div className="page-header clearfix topicName">
            <span>{this.isEmpty(this.props.state.db.ActiveChannel) || this.props.state.db.ActiveChannel.topic} </span>
          </div>

          <div className="chat-body scroll-hijack" id="scrollbar">
            {/* REPEATING BLOCK ELEMENT */}
            {!this.isEmpty(this.props.state.db.ActiveChannel)
              ? this.renderMessages()
              :
              <div className="chat-message">
                <div className="avatar"><img src={this.state.messageObj.profile} alt="" height="30px" /></div>
                <div className="chat-message-content">
                  <a href="/" className="chat-message-author">Admin</a>
                  <span className="chat-message-date">{this.state.messageObj.timestamp}</span>
                  <div className="chat-message-message">Create or Join a channel on the left to chat!
                  </div>
                </div>
              </div>
            }
          </div>
          {!this.isEmpty(this.props.state.db.ActiveChannel) ?
            <div className="chat-footer footer-sticky relative">
              <div id="message-form">
                <MessageText
                  className="messageArea post-input"
                  socket={this.props.socket}
                  userId={localStorage.getItem("userId")}
                  adminId={this.isEmpty(this.props.state.db.ActiveChannel) || this.props.state.db.ActiveChannel.admin}
                  chatId={this.isEmpty(this.props.state.db.ActiveChannel) || this.props.state.db.ActiveChannel._id}
                />
              </div>
            </div>
            : <div></div>
          }

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