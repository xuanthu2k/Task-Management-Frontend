import { makeStyles } from "@material-ui/core/styles";

const authFormStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
        marginTop: theme.spacing(4),
        backgroundColor: "#ffffff",
        borderRadius: "4px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        [theme.breakpoints.up("sm")]: {
            width: "50%",
            margin: "0 auto",
        },
    },
    formTitle: {
        margin: theme.spacing(2),
        color: "#000000",
    },
    formInput: {
        margin: theme.spacing(1),
        width: "100%",
    },
    formButton: {
        margin: theme.spacing(1),
        width: "50%",
        backgroundColor: "#4CAF50",
        color: "white",
        "&:hover": {
            backgroundColor: "#357a38",
        },
    },
    redirect: {
        marginTop: theme.spacing(1),
    },
    signInButton: {
        margin: theme.spacing(1),
        width: "50%",
        backgroundColor: "#4CAF50",
        color: "white",
        "&:hover": {
            backgroundColor: "#357a38",
        },
    },
    signUpButton: {
        margin: theme.spacing(1),
        textDecoration: "none",
        width: "50%",
        backgroundColor: "#2596be",
        color: "white",
        "&:hover": {
            backgroundColor: "#10355e",
        },
    },
}));

export default authFormStyles;
