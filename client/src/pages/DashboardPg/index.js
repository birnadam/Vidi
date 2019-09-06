
import React, { Component } from 'react'
import "./style.css";

import Grid from "../../components/Grid";
import Header2 from "../../components/Header2";
// import MediaSearch from "../../components/MediaSearch";
import Channels from "../../containers/Channels";
import Navbar from "../../components/Navbar";
import ChatArea from "../../components/ChatArea";
import Footer from "../../components/Footer";
import { connect } from 'react-redux';
import { loadDashboard } from "../../actions/dbActions"


class DashboardPg extends Component {

    componentDidMount() {
        // console.log(this.props.store)
        let userId = localStorage.getItem("userId");
        console.log(userId)
        this.props.socket.emit("loadDashboard", userId, (userData) => {
            console.log("Dashboard is fetching userData")
            console.log(userData)
            this.props.loadDashboard(userData)
            // this.props.socket.on("dashboardLoaded", function(userData) {
            //     console.log(userData)
            //     this.props.loadDashboard(userData)
            // })
        })
    }

    render() {
        return (
            <div>
                
                <Grid>
                <Header2 />
                    
                    <Navbar />
                    <Channels socket={this.props.socket} />
    
                    <ChatArea socket={this.props.socket}/>
    
                    <Footer/>
    
                </Grid>
            </div>
        );
    }

}


const mapStateToProps = function mapStateToProps(state) {return { store: state }};
  
export default connect(mapStateToProps, { loadDashboard })(DashboardPg);