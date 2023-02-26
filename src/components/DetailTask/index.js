import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import tasksApi from "../../api/tasksApi";
import MessageDialog from "../MessageDialog";
import { Box, CircularProgress, Link, MenuItem, Select, TextareaAutosize } from "@material-ui/core";
import newTaskFormStyles from "../../styles/newTaskFormStyles";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const DetailTask = (props) => {
    const classes = newTaskFormStyles();

    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const { modalOpen, onClose, reRender } = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("");
    const [subTasks, setSubTasks] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const taskId = localStorage.getItem("taskId");
        setLoading(true);
        const fetchData = async () => {
            const taskDetail = await tasksApi.getTask(accessToken, taskId);
            if (taskDetail === 0) {
                navigate("/login");
            } else {
                const { Title, Description, DueDate, Status, SubTasks } = taskDetail.data;
                console.log(SubTasks);
                const date = moment(DueDate).format("YYYY-MM-DD");
                setTitle(Title);
                setDescription(Description);
                setDueDate(date);
                setStatus(Status);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!title) {
                setMessage("Title invalid!");
                setOpenDialog(true);
                return;
            }
            if (!description) {
                setMessage("Description invalid!");
                setOpenDialog(true);
                return;
            }
            if (!dueDate) {
                setMessage("dueDate invalid!");
                setOpenDialog(true);
                return;
            }
            if (dueDate) {
                const today = new Date();
                const dueDateConverted = new Date(dueDate);
                if (today > dueDateConverted && status !== "Complete") {
                    setMessage(
                        "dueDate must not be less than today! Please change dueDate or status!"
                    );
                    setOpenDialog(true);
                    return;
                }
            }
            setLoading(true);
            const taskId = localStorage.getItem("taskId");
            const response = await tasksApi.updateTask({
                taskId,
                accessToken,
                title,
                description,
                dueDate,
                status,
            });
            if (response === 0) {
                setMessage("Update Task Failure!!!");
                setOpenDialog(true);
                setLoading(false);
            } else {
                onClose();
                setOpenDialog(true);
                setLoading(false);
                reRender();
            }
        } catch (error) {
            setMessage("Server has error!!!");
            setOpenDialog(true);
            setLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    const handleOpenSubTasks = () => {
        alert("This feature is coming soon");
    };

    const handleDeleteTask = async () => {
        try {
            const confirm = window.confirm("Are you sure delete this task?");
            if (!confirm) {
                return;
            }
            setLoading(true);
            const taskId = localStorage.getItem("taskId");
            const response = await tasksApi.deleteTask(accessToken, taskId);
            if (response === 0) {
                setMessage("Delete Task Failure!!!");
                setOpenDialog(true);
                setLoading(false);
            } else {
                setOpenDialog(true);
                setLoading(false);
                reRender();
                onClose();
            }
        } catch (error) {
            setMessage("Server has error!!!");
            setOpenDialog(true);
            setLoading(false);
        }
    };

    return (
        <>
            <MessageDialog open={openDialog} onClose={handleCloseDialog} message={message} />
            <Modal open={modalOpen} onClose={onClose} className={classes.modal}>
                <div className={classes.paper}>
                    <Typography variant="h3" className={classes.title}>
                        Detail Task
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
                                onChange={(event) => setTitle(event.target.value)}
                                className={classes.textField}
                            />
                            <TextareaAutosize
                                placeholder="Description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                className={classes.textarea}
                            />
                            <TextField
                                variant="filled"
                                label="Due Date"
                                type="date"
                                value={dueDate}
                                onChange={(event) => setDueDate(event.target.value)}
                                className={classes.textField}
                                InputProps={{
                                    style: {
                                        height: "80px",
                                    },
                                }}
                            />
                            <Box className={classes.textContainer} component="div">
                                <Typography className={classes.title}>SubTasks:</Typography>
                                <Button onClick={handleOpenSubTasks}>
                                    {subTasks.length} tasks
                                </Button>
                                <Typography className={classes.title}>|</Typography>
                                <Typography className={classes.title}>Status:</Typography>
                                <Select label="Status" value={status} onChange={handleChangeStatus}>
                                    <MenuItem value="New">New</MenuItem>
                                    <MenuItem value="Incomplete">Incomplete</MenuItem>
                                    <MenuItem value="Complete">Complete</MenuItem>
                                </Select>
                            </Box>
                            <Box className={classes.buttonContainer} component="div">
                                <Button type="submit" className={classes.createButton}>
                                    Update
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleDeleteTask}
                                    className={classes.deleteButton}
                                >
                                    Delete
                                </Button>
                                <Button
                                    type="button"
                                    onClick={onClose}
                                    className={classes.cancelButton}
                                >
                                    Close
                                </Button>
                            </Box>
                        </form>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default DetailTask;
