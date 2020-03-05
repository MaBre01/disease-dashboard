import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {ArgumentAxis, Chart, SplineSeries, ValueAxis, Title} from "@devexpress/dx-react-chart-material-ui";
import {Animation} from "@devexpress/dx-react-chart";

class DiseaseProgressionTimeLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                { argument: 1900, value: 150 },
                { argument: 1910, value: 56 },
                { argument: 1940, value: 69 },
                { argument: 1950, value: 20 },
                { argument: 2000, value: 150 }
            ]
        };
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Chart data={this.state.data} >
                                <ArgumentAxis />
                                <ValueAxis indentFromAxis="16"/>
                                <Animation />
                                <Title text="Disease progression timeline"/>
                                <SplineSeries valueField="value" argumentField="argument" />
                            </Chart>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default DiseaseProgressionTimeLine;