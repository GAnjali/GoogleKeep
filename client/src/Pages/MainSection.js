import React, {Component} from 'react';
import {getNotes} from "../Util/ApiHandler";
import ResponseHandler from "../Util/ResponseHandler";

class MainSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            error: false
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const getNotesResponse = ResponseHandler.getResponse(await getNotes());
        if (getNotesResponse.status === "success") {
            this.setState({
                notes: getNotesResponse.data
            });
        } else
            this.setState({
                error: true
            })
    };

    render() {
        console.log(this.state);
        const listNotes = this.state.notes != null ? this.state.notes.map((note) => <li
            key={note.title}>note.content</li>) : null;
        return (
            <>
                <div class={"note"}>
                    <input className={"title"}></input>
                    <input className={"content"}></input>
                </div>
            </>
        )
    }
}

export default MainSection;