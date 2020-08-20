import React, {Component} from 'react';
import MainSection from "./MainSection";
import Header from "./Header";
import styles from "../styles/styles.css";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <>
                <Header/>
            </>
        )
    }
}

export default Dashboard;