import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class DataCard extends React.Component {
    render() {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card>
                    <CardContent>
                        <Box component="div" display="flex" alignItems="center">
                            <Box component="div" mr={1}>{this.props.icon}</Box>
                            <Box>
                                <Typography variant="h6" color="action">{this.props.text}</Typography>
                            </Box>
                        </Box>
                        <Typography variant="h4" align="right">{this.props.data}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default DataCard;