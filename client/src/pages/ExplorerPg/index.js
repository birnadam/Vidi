
import React, { Component } from "react";
// import { reduxForm } from "redux-form";
// import { compose } from "redux";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap"
import "./style.css";
import requireAuth from "../../hoc/requireAuth"

import Grid from "../../components/Grid";
// import Channels from "../../containers/Channels";
import Movies from "../../containers/Movies";
// import Navbar from "../../components/Navbar";
// import Header2 from "../../components/Header2";
import Footer from "../../components/Footer";
import { updateCurrentPage } from "../../actions/dbActions";

class ExplorerPg extends Component {

    componentDidMount() {
        this.props.updateCurrentPage(window.location.pathname)
    }


    render() {
        return (
            <div>
                {/* <Brand title='VIDI' /> */}
                <Grid>
                    <Row>
                        <Col md="0" sm="0" xs="0">
                            {/* <Channels socket={this.props.socket} /> */}
                        </Col>
                        <Col md="10" sm="11" xs="9">
                            <Movies />
                        </Col>
                    </Row>
                    <Footer />
                    <Footer />
                </Grid>
            </div>
        )

    }
}

function mapStateToProps(state) {
    return { state };
}

export default requireAuth(connect(mapStateToProps, { updateCurrentPage })(ExplorerPg));
// function mapStateToProps(state) {
//     return {state};
// }

// export default compose(
//     connect(mapStateToProps, {}),
//     reduxForm({})
// )(Explorer);

// export default ExplorerPg;