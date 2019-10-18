import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
        color: "#0ef",
        border: "0.15em solid #0ef",
        textTransform: "uppercase",
        background: "transparent",
        fontSize: "1.2em",
        fontWeight: "bold",
        lineHeight: "1.5em",
        '&:hover': {
            background: "none"
        },
        '&:active': {
            background: "none"
        },
        '&:focus': {
            background: "none"
        }
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
        // color: "#0ff",

    },
}));

export default (props) => {
    const classes = useStyles();
    return (
        <Fab
            variant="extended"
            aria-label="delete"
            onClick={props.onClick}
            className={classes.fab}
        >
            {/*<NavigationIcon className={classes.extendedIcon} />*/}
            {props.title}
        </Fab>
    );
}