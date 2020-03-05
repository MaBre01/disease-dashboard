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
            <PeopleTable people={this.state.people}/>
        );
    }
}

export default Persons;