import React from "react";
import * as fromPeopleApi from "../../api/people";
import LinearProgress from "@material-ui/core/LinearProgress";
import PeopleTable from "../components/PeopleTable";

class Persons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            isLoaded: false
        }

    };

    componentDidMount = async () => {
        this.setState({
            people: await fromPeopleApi.getPeople(),
            isLoaded: true
        });
    };

    render() {
        if (!this.state.isLoaded) {
            return (
                <LinearProgress/>
            );
        }

        return (
            <div>
                <h1>People list</h1>
                <PeopleTable people={this.state.people}/>
            </div>
        );
    }
}

export default Persons;