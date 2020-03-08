import React from 'react';
import Grid from "@material-ui/core/Grid";
import DataCard from "../components/DataCard";
import { MdPeople, MdDateRange } from 'react-icons/md';
import { GiVirus, GiMiracleMedecine } from 'react-icons/gi';
import LinearProgress from "@material-ui/core/LinearProgress";
import DiseasePerCity from "../components/DiseasePerCity";
import * as fromPeopleApi from '../../api/people';
import * as fromDiseasesApi from '../../api/diseases';
import * as fromContractedDiseasesApi from '../../api/contracted';
import * as fromCitiesApi from '../../api/cities';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            peopleData: {},
            diseasesData: {},
            contractedDiseases: {},
            infectedThisYear: 0,
            citiesCount: 0
        };
    }

    componentDidMount = async () => {
        await this.loadData();
    };

    render() {
        if (! this.state.isLoaded) {
            return (
                <LinearProgress/>
            );
        }

        return (
            <div>
                <h1>Dashboard</h1>
                <Grid container spacing={3}>
                    <DataCard
                        icon={ <MdPeople size={40} color="#3f51b5"/> }
                        text="People"
                        data={this.state.peopleData['hydra:totalItems']}
                    />
                    <DataCard
                        icon={ <GiVirus size={40} color="#3f51b5"/> }
                        text="Diseases"
                        data={this.state.diseasesData['hydra:totalItems']}
                    />
                    <DataCard
                        icon={ <GiMiracleMedecine size={40} color="#3f51b5"/> }
                        text="Contracted"
                        data={this.state.contractedDiseases['hydra:totalItems']}
                    />
                    <DataCard
                        icon={ <MdDateRange size={40} color="#3f51b5"/> }
                        text="This year"
                        data={this.state.infectedThisYear.count}
                    />
                </Grid>
                <Grid container spacing={3}>
                    <DiseasePerCity data={this.state.citiesCount}/>
                </Grid>
            </div>
        );
    }

    loadData = async () => {
        const now = new Date();

        this.setState({
            isLoaded: true,
            diseasesData: await fromDiseasesApi.getDiseases(),
            peopleData: await fromPeopleApi.getPeople(),
            contractedDiseases: await fromContractedDiseasesApi.getContracted(),
            citiesCount: await fromCitiesApi.getContractedByCity(),
            infectedThisYear: await fromContractedDiseasesApi.getContractedByYear(now.getFullYear())
        });
    };
}

export default Dashboard;