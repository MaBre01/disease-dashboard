import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    Chart,
    PieSeries,
    Tooltip,
    Title
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';

class DiseasePerCity extends React.Component {
    tooltipRender = (targetItem) => {
        const value = targetItem.text;
        const city = this.props.data[targetItem.targetItem.point].city;

        return (
            <div>{city} : {value} infected</div>
        );
    };

    render() {
        return (
            <Grid item xs={12}>
                <Paper>
                    <Chart data={this.props.data}>
                        <PieSeries
                            valueField="count"
                            argumentField="city"
                        />
                        <Title text="Disease per city" />
                        <EventTracker />
                        <Tooltip contentComponent={this.tooltipRender} />
                    </Chart>
                </Paper>
            </Grid>
        );
    }
}

export default DiseasePerCity;