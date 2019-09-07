import React, { Component } from 'react'
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import Animate from "react-smooth";
import Navbar from "../Navbar";
import { Container, Row, Col } from "reactstrap"
import "./style.css";


class Header extends Component {

    duration = 3000

    homeHeader() {
        let userCheck = this.props.state.auth.authenticated
        if (userCheck === "" || userCheck === null) {
            return (
                <Col></Col>
            )
        } else {
            return (
                <Col md="6" sm="12" xs="12">
                    <Navbar />
                </Col>
            )
        }
    }

    render() {
        return (
            <div>
                <header>
                    <Animate to="1" from="0" attributeName="opacity" duration={this.duration}>
                        <Container className="header-area">
                            <Row>
                                <Col md="6" sm="12" xs="12">
                                    <div id="headerTitle">
                                        <h2><Link to="/">Vidi</Link></h2>
                                        <span id="headerTag">
                                            Prevents spoilers until you watch it
                                        </span>
                                    </div>
                                </Col>
                                {this.homeHeader()}
                            </Row>
                        </Container>
                    </Animate>
                </header>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { state }
}

export default compose(
    connect(mapStateToProps, {}),
)(Header);