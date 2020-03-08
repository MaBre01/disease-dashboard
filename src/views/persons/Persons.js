import React from "react";
import * as fromPeopleApi from "../../api/people";
import LinearProgress from "@material-ui/core/LinearProgress";
import PeopleTable from "../components/PeopleTable";

class Persons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peopleData: {},
            isLoaded: false,
            page: 0
        }

    };

    componentDidMount = async () => {
        this.setState({
            peopleData: await fromPeopleApi.getPeople(),
            isLoaded: true
        });
    };

    loadPeoplePage = async (page) => {
        this.setState({
            isLoaded: false
        });
        await this.setState({
            peopleData: await fromPeopleApi.getPeoplePage(page + 1),
            page: page,
            isLoaded: true
        });
    };

    render() {
        if (!this.state.isLoaded) {
            return (
                <div>
                    <h1>People list</h1>
                    <LinearProgress/>
                </div>
            );
        }

        return (
            <div>
                <h1>People list</h1>
                <PeopleTable
                    people={this.state.peopleData['hydra:member']}
                    peopleLength={this.state.peopleData['hydra:totalItems']}
                    pageLoader={this.loadPeoplePage}
                    page={this.state.page}
                />
            </div>
        );
    }
}

export default Persons;