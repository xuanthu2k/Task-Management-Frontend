import { makeStyles } from "@material-ui/core/styles";

const pageStyles = makeStyles((theme) => ({
    root: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
        height: 80,
        padding: "0 30px",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        color: "black",
        backgroundColor: "yellow",
    },
    card: {
        maxWidth: 345,
        margin: theme.spacing(2),
        cursor: "pointer",
    },
    title: {
        fontSize: 24,
        color: "blue",
    },
    description: {
        fontSize: 16,
    },
    status: {
        fontSize: 14,
        color: "red",
    },
    dueDate: {
        fontSize: 14,
    },
}));

export default pageStyles;
