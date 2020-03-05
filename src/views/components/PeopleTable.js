import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Moment from "react-moment";

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
});

class PeopleTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: 'lastName',
            selected: [],
            page: 0,
            dense: false,
            rowsPerPage: 10
        };
    }

    headCells = () => ([
        { id: 'lastName', numeric: false, disablePadding: false, label: 'Last name' },
        { id: 'firstName', numeric: false, disablePadding: false, label: 'First name' },
        { id: 'birthDate', numeric: true, disablePadding: false, label: 'Birth date' },
        { id: 'city', numeric: true, disablePadding: false, label: 'City' }
    ]);

    render() {
        const { classes } = this.props;
        const people = this.props.people;

        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, people.length - this.state.page * this.state.rowsPerPage);

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={this.state.dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            {this.enhancedTableHead()}
                            <TableBody>
                                {this.stableSort(people, this.getComparator())
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((person) => {
                                        const labelId = `enhanced-table-checkbox-${person.id}`;

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={person.id}
                                            >
                                                <TableCell component="th" id={labelId} scope="row">
                                                    {person.lastName}
                                                </TableCell>
                                                <TableCell align="left">{person.firstName}</TableCell>
                                                <TableCell align="right">
                                                    <Moment format="DD/MM/YYYY">
                                                        {person.birthDate}
                                                    </Moment>
                                                </TableCell>
                                                <TableCell align="right">{person.city.name}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (this.state.dense ? 33 : 53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={this.props.people.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={this.state.dense} onChange={this.handleChangeDense} />}
                    label="Dense padding"
                />
            </div>
        );
    }

    descendingComparator = (a, b) => {
        if (b[this.state.orderBy] < a[this.state.orderBy]) {
            return -1;
        }
        if (b[this.state.orderBy] > a[this.state.orderBy]) {
            return 1;
        }
        return 0;
    };

    getComparator = () => {
        return this.state.order === 'desc'
            ? (a, b) => this.descendingComparator(a, b)
            : (a, b) => -this.descendingComparator(a, b);
    };

    stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    };

    enhancedTableHead = () => {
        const { classes } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {this.headCells().map(headCell => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={this.state.orderBy === headCell.id ? this.state.order : false}
                        >
                            <TableSortLabel
                                active={this.state.orderBy === headCell.id}
                                direction={this.state.orderBy === headCell.id ? this.state.order : 'asc'}
                                onClick={event => {this.handleRequestSort(event, headCell.id)}}
                            >
                                {headCell.label}
                                {this.state.orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                    {this.state.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    handleRequestSort = (event, property) => {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setState({
            order: (isAsc) ? 'desc' : 'asc',
            orderBy: property
        });
    };

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        });
    };

    handleChangeDense = (event) => {
        this.setState({
            dense: event.target.checked
        });
    };
}

export default withStyles(useStyles)(PeopleTable);