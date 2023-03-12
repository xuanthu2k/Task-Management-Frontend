import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
    },
}));

function NotFound() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">Oops! Page not found.</Typography>
        </div>
    );
}

export default NotFound;
