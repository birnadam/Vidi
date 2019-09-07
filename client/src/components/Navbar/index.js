import React, { Component } from 'react'
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import "./style.css";
import { updateCurrentPage } from '../../actions/dbActions';

class Navbar extends Component {

  componentDidUpdate() {
    console.log(this.props.state.db.Admin.currentPath)
  }


  render() {
    return (
      <div id="navbar">
        <ul className="navbar-menu" id="horizontal-list">

          <li><Link to="/dashboard" className="iconImage">
            {this.props.state.db.Admin.currentPath === "/dashboard"
              ? <span><img src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" />Dashboard</span>
              : <span>{'\u00A0'}{'\u00A0'}Dashboard</span>
            }
          </Link>
          </li>

          <li><Link to="/explorer" className="iconImage">
            {this.props.state.db.Admin.currentPath === "/explorer"
              ? <span><img src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" />Explorer</span>
              : <span>{'\u00A0'}{'\u00A0'}Explorer</span>
            }</Link></li>

          <li><Link to="/profile" className="iconImage">
            {this.props.state.db.Admin.currentPath === "/profile"
              ? <span><img src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" />Profile</span>
              : <span>{'\u00A0'}{'\u00A0'}Profile</span>
            }</Link></li>

          <li><Link to="/logout">
            {this.props.state.db.Admin.currentPath === "/logout"
              ? <span><img src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" />Logout</span>
              : <span>{'\u00A0'}{'\u00A0'}Logout</span>
            }</Link></li>

        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { state }
}

export default compose(
  connect(mapStateToProps, { updateCurrentPage }),
)(Navbar);