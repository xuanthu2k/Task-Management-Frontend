import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import tasksApi from "../../api/tasksApi";
import MessageDialog from "../MessageDialog";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
        margin: "1rem 0",
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
    button: {
        margin: "0.5rem 0",
    },
}));

const NewTask = (props) => {
    const accessToken = localStorage.getItem("accessToken");
    const { modalOpen, onClose } = props;
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const postData = await tasksApi.createTask({
            accessToken,
            title,
            description,
            dueDate,
        });
        if (postData === 0) {
            setMessage("Create Task Failure!!!");
            setOpenDialog(true);
            setLoading(false);
        } else {
            setMessage("Create Task Success!!!");
            setOpenDialog(true);
            setLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <MessageDialog
                open={openDialog}
                onClose={handleCloseDialog}
                message={message}
            />
            <Modal open={modalOpen} onClose={onClose} className={classes.modal}>
                <div className={classes.paper}>
                    <Typography variant="h3" className={classes.title}>
                        New Task
                    </Typography>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <TextField
                                variant="filled"
                                label="Title"
                                type="text"
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                                className={classes.textField}
                            />
                            <TextField
                                variant="filled"
                                label="Description"
                                type="text"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                className={classes.textField}
                            />
                            <TextField
                                variant="filled"
                                label="Due Date"
                                type="date"
                                value={dueDate}
                                onChange={(event) =>
                                    setDueDate(event.target.value)
                                }
                                className={classes.textField}
                                InputProps={{
                                    style: {
                                        height: "80px",
                                    },
                                }}
                            />
                            <Button type="submit" className={classes.button}>
                                Create
                            </Button>
                            <Button
                                type="button"
                                onClick={onClose}
                                className={classes.button}
                            >
                                Cancel
                            </Button>
                        </form>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default NewTask;
