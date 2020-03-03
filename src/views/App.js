import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from "@material-ui/icons/Group";
import AssessmentIcon from '@material-ui/icons/Assessment';

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
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen: false
        };
    }

    handleDrawerToggle = () => {
        this.setState({
            mobileOpen: !this.state.mobileOpen
        });
    };

    getDrawer = (classes) => {
        return (
            <div>
                <div className={classes.toolbar + ' ' + classes.drawerTop}/>
                <Divider/>
                <List>
                    <ListItem button>
                        <ListItemIcon><GroupIcon/></ListItemIcon>
                        <ListItemText>Persons</ListItemText>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button>
                        <ListItemIcon><AssessmentIcon/></ListItemIcon>
                        <ListItemText>Maladie 1</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><AssessmentIcon/></ListItemIcon>
                        <ListItemText>Maladie 2</ListItemText>
                    </ListItem>
                </List>
            </div>
        );
    };

    render() {
        const { classes } = this.props;
        const { container } = this.props;

        const drawer = this.getDrawer(classes);

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >

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
                    <h1>Hello world !</h1>
                </main>
            </div>
        );
    }
}

export default withStyles(useStyles)(App);