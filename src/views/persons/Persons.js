import React from "react";
import * as fromPeopleApi from "../../api/people";
import Moment from 'react-moment'

import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import withStyles from "@material-ui/core/styles/withStyles";


const useStyles = theme => ({
    table: {
        minWidth: 650,
    },
});

class Persons extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            people: []
        }

    };


    render() {
        const {classes} = this.props;
        console.log(this.state.people);
        return (
            <div>
                <h1>Hello persons</h1>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Nom</TableCell>
                                <TableCell align="left">Prénom</TableCell>
                                <TableCell align="left">Date de naissance</TableCell>
                                <TableCell align="left">Ville</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.people.map(person => (
                                <TableRow key={person.id}>
                                    <TableCell align="left">{person.lastName}</TableCell>
                                    <TableCell align="left">{person.firstName}</TableCell>
                                    <TableCell align="left">
                                        <Moment format="YYYY/MM/DD">
                                            {person.birthDate}
                                        </Moment>
                                    </TableCell>
                                    <TableCell align="left">{person.city.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

    componentDidMount = async () => {
        this.setState({
            people: await fromPeopleApi.getPeople()
        });
    }

}

export default withStyles(useStyles)(Persons);