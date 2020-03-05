import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
    ArgumentAxis,
    Chart,
    SplineSeries,
    ValueAxis,
    Title
} from "@devexpress/dx-react-chart-material-ui";
import * as fromDiseaseApi from '../../api/diseases';

class DiseaseProgressionTimeLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            diseaseName: '',
            data: []
        };
    }

    loadData = async () => {
        const dataFetched = await fromDiseaseApi.getInfectedCountByDiseaseByYear(this.props.diseaseId);
        const chartData = [];

        let firstYear = null;
        for (let year in dataFetched.contractedAt) {
            chartData.push({
                count: dataFetched.contractedAt[year],
                year
            });

            if (firstYear === null) {
                firstYear = year - 1;
            }
        }

        // Set first date - 1 to 0 to display correct chart
        chartData.unshift({
            count: 0,
            year: firstYear
        });

        this.setState({
            diseaseName: dataFetched.disease,
            data: chartData
        });
    };

    componentDidMount = async () => {
        await this.loadData();
    };

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <Card>
                            <CardContent>
                                <Chart data={this.state.data} >
                                    <ArgumentAxis />
                                    <ValueAxis indentFromAxis="16"/>
                                    <Title text={this.state.diseaseName + ' progression timeline'}/>
                                    <SplineSeries valueField="count" argumentField="year" />
                                </Chart>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default DiseaseProgressionTimeLine;