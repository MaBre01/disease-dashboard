import React from 'react';
import { history } from "../store/configureStore";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import GroupIcon from "@material-ui/icons/Group";
import AssessmentIcon from '@material-ui/icons/Assessment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CloseIcon from '@material-ui/icons/Close';

import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Persons from "./persons/Persons";
import Disease from "./diseases/Disease";

import * as fromDiseaseActions from '../actions/disease';
import { connect } from 'react-redux';

const drawerWidth = 240;

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerTop: {
        backgroundColor: '#a6a6a6'
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen: false,
            diseaseCollapseOpen: false
        };
    }

    handleDrawerToggle = () => {
        this.setState({
            mobileOpen: !this.state.mobileOpen
        });
    };

    handleDiseaseCollapseToggle = () => {
        this.setState({
            diseaseCollapseOpen: !this.state.diseaseCollapseOpen
        });
    };

    handleCloseDiseaseCollapse = () => {
        this.setState({
            diseaseCollapseOpen: false
        });
    };

    getDrawer = (classes) => {
        return (
            <div>
                <div className={classes.toolbar + ' ' + classes.drawerTop}>
                    <Hidden smUp implementation="css">
                        <IconButton onClick={this.handleDrawerToggle}>
                            <CloseIcon/>
                        </IconButton>
                    </Hidden>
                </div>
                <Divider/>
                <List component="nav">
                    <ListItem button component={Link} to="/">
                        <ListItemIcon><DashboardIcon/></ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/persons">
                        <ListItemIcon><GroupIcon/></ListItemIcon>
                        <ListItemText>Persons</ListItemText>
                    </ListItem>
                    <ListItem button onClick={this.handleDiseaseCollapseToggle}>
                        <ListItemIcon><AssessmentIcon/></ListItemIcon>
                        <ListItemText>Diseases</ListItemText>
                        {this.state.diseaseCollapseOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.diseaseCollapseOpen}>
                        <List component="nav" disablePadding>
                            {this.props.diseases.map((disease, id) => (
                                <ListItem
                                    button
                                    className={classes.nested}
                                    key={id}
                                    component={Link}
                                    to={'/diseases/' + disease.id}
                                    onClick={this.handleCloseDiseaseCollapse}
                                >
                                    <ListItemIcon><ArrowRightIcon/></ListItemIcon>
                                    <ListItemText>{disease.name}</ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </List>
                <Divider/>
            </div>
        );
    };

    componentDidMount = async () => {
        await this.props.getDiseases();
    };

    render() {
        const { classes } = this.props;
        const { container } = this.props;

        const drawer = this.getDrawer(classes);

        return (
            <div className={classes.root}>
                <Router history={history}>
                    <CssBaseline/>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" noWrap>Responsive bar</Typography>
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer}>
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={container}
                                variant="temporary"
                                anchor="left"
                                open={this.state.mobileOpen}
                                classes={{paper: classes.drawerPaper}}
                                ModalProps={{keepMounted: true}}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                variant="permanent"
                                open={true}
                                classes={{paper: classes.drawerPaper}}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>

                            <Switch>
                                <Route exact path="/" component={Dashboard} />
                                <Route exact path="/persons" component={Persons}/>
                                <Route path="/diseases/:id" component={Disease}/>
                            </Switch>

                    </main>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    diseases: state.diseasesReducer.diseases
});

const mapDispatchToProps = dispatch => ({
    getDiseases: () => dispatch(fromDiseaseActions.getDiseases())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(App));