import { makeStyles } from "@material-ui/core/styles";

const newTaskFormStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: "50%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        margin: "1rem 1rem",
    },
    form: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1rem",
    },
    textField: {
        width: "100%",
        margin: "0.5rem 0",
    },
    createButton: {
        margin: theme.spacing(1),
        width: "50%",
        backgroundColor: "#4CAF50",
        color: "white",
        "&:hover": {
            backgroundColor: "#357a38",
        },
    },
    cancelButton: {
        margin: theme.spacing(1),
        width: "50%",
        backgroundColor: "#df994f",
        color: "white",
        "&:hover": {
            backgroundColor: "#c7581f",
        },
    },
    deleteButton: {
        margin: theme.spacing(1),
        width: "50%",
        backgroundColor: "#d13d1f",
        color: "white",
        "&:hover": {
            backgroundColor: "#c73315",
        },
    },
    textContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    buttonContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
    },
    textarea: {
        width: "95%",
        maxHeight: "200px",
        maxWidth: "95%",
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
        fontSize: theme.typography.fontSize,
        fontFamily: theme.typography.fontFamily,
        "&:focus": {
            outline: "none",
            borderColor: theme.palette.primary.main,
        },
    },
}));

export default newTaskFormStyles;
