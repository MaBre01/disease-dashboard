import React from "react";
import * as fromDiseaseApi from "../../api/diseases";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import { Alert, AlertTitle } from '@material-ui/lab';
import DataCard from "../components/DataCard";
import { IoMdFemale, IoMdPeople, IoMdMale } from 'react-icons/io';
import { MdDateRange } from 'react-icons/md';
import { FaDna } from 'react-icons/fa';

import DiseaseProgressionTimeLine from "../components/DiseaseProgressionTimeLine";

class Disease extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            diseaseId: this.props.match.params.id,
            disease: {},
            infectedThisYear: 0,
            infectedByGender: {
                F: 0,
                M: 0
            }
        };
    }

    loadData = async () => {
        const now = new Date();

        this.setState({
            isLoaded: true,
            diseaseId: this.props.match.params.id,
            disease: await fromDiseaseApi.getDisease(this.props.match.params.id),
            infectedThisYear: await fromDiseaseApi.getInfectedCountByYear(this.props.match.params.id, now.getFullYear()),
            infectedByGender: await fromDiseaseApi.getInfectedCountByGender(this.props.match.params.id)
        });
    };

    componentDidMount = async () => {
        await this.loadData();
    };

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                isLoaded: false
            });
            await this.loadData();
        }
    };

    render() {
        if (!this.state.isLoaded) {
            return (
                <LinearProgress/>
            );
        }

        if (!this.state.disease) {
            return (
                <Alert severity="error">
                    <AlertTitle>Disease not loaded</AlertTitle>
                    Try again
                </Alert>
            );
        }

        return (
            <div>
                <h1><FaDna/> {this.state.disease.name}</h1>
                <Grid container spacing={3}>
                    <DataCard
                        icon={<IoMdPeople size={40} color="#3f51b5"/>}
                        text="Infected"
                        data={this.state.disease.contractedDiseases.length}
                    />
                    <DataCard
                        icon={<IoMdFemale size={40} color="#3f51b5"/>}
                        text="Women"
                        data={this.state.infectedByGender.F}
                    />
                    <DataCard
                        icon={<IoMdMale size={40} color="#3f51b5"/>}
                        text="Men"
                        data={this.state.infectedByGender.M}
                    />
                    <DataCard
                        icon={<MdDateRange size={40} color="#3f51b5"/>}
                        text="This year"
                        data={this.state.infectedThisYear.count}
                    />
                </Grid>
                <DiseaseProgressionTimeLine diseaseId={this.state.diseaseId}/>
            </div>
        );
    }
}

export default Disease;