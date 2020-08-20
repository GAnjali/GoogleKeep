import React, {Component} from 'react';
import MainSection from "./MainSection";
import Header from "./Header";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <>
                <Header/>
                <MainSection/>
            </>
        )
    }
}

export default Dashboard;