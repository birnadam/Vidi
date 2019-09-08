import React, { Component } from 'react'
import { compose } from "redux";
import { connect } from "react-redux";
import "./style.css";
// import { Tooltip } from 'reactstrap';

class Channel extends Component {

  render() {
    return (
      <li>
        <div onClick={() => this.props.selectchat(this.props.id)}>
          <span className="current-server" data-toggle="tooltip" data-placement="right" data-title="channel name" >
            <img src={this.props.media} alt=""></img>
          </span>
        </div>
      </li>
    )
  }
}

function mapStateToProps(state) {
  return { state }
}

export default compose(
  connect(mapStateToProps, {}),
)(Channel);