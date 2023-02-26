import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    dialogPaper: {
        minHeight: "20vh",
        maxHeight: "90vh",
        minWidth: "30vw",
        maxWidth: "90vw",
        overflowY: "auto",
    },
    dialogTitle: {
        textAlign: "center",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    dialogContent: {
        paddingBottom: theme.spacing(1),
        textAlign: "center",
    },
    dialogContentText: {
        paddingBottom: theme.spacing(1),
        color: "red",
        fontSize: "120%",
        textAlign: "center",
    },
    dialogActions: {
        padding: theme.spacing(1, 2),
    },
}));

function MessageDialog({ open, onClose, message }) {
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialogPaper }}>
            <DialogTitle className={classes.dialogTitle}>Message</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText className={classes.dialogContentText}>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button onClick={onClose} color="primary" variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MessageDialog;
