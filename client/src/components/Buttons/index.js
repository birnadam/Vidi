import React from "react";
import "./style.css";
import { Link } from 'react-router-dom';

export function AddButton(props) {
  return (
    <li><span onClick={props.toggle}
      className="join-server createChannel current-server"
      data-start="modal-custom"
      data-target="#create-group"
      data-toggle="tooltip"
      data-placement="right"
      data-title="Join a Group">
      <img src="http://icons.iconarchive.com/icons/gakuseisean/ivista-2/128/Alarm-Plus-icon.png" alt=""></img>
    </span></li>
  )
}

export const ProfileButton = () => (
  <li><Link to="/profile" className="sidebar-toggle" data-toggle="sidebar"><img src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt=""></img></Link></li>
)