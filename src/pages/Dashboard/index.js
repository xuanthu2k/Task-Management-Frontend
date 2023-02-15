import React, { useState, useEffect } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import tasksApi from "../../api/tasksApi";
import { useNavigate } from "react-router-dom";
import NewTask from "../../components/NewTask";
import userApi from "../../api/userApi";
import pageStyles from "../../styles/pageStyles";

const Dashboard = () => {
    const classes = pageStyles();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    const handleNewTaskModalOpen = () => {
        setNewTaskModalOpen(true);
    };

    const handleNewTaskModalClose = () => {
        setNewTaskModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const tasksData = await tasksApi.getTasks(accessToken);
            const userData = await userApi.getInfo(accessToken);
            if (tasksData === 0 || userData === 0) {
                navigate("/login");
            } else {
                setTasks(tasksData.data);
                console.log(userData);
                setLoading(false);
            }
        };
        fetchData();
    }, [newTaskModalOpen]);

    const handleClickCard = (id) => {
        navigate(`/task/${id}`);
    };

    const handleClickUserInfo = () => {
        navigate("/info");
    };

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Button
                    type="button"
                    className={classes.button}
                    onClick={handleClickUserInfo}
                >
                    Info
                </Button>
                <Button
                    type="button"
                    className={classes.button}
                    onClick={handleNewTaskModalOpen}
                >
                    New
                </Button>
                {newTaskModalOpen && (
                    <NewTask
                        onClose={handleNewTaskModalClose}
                        modalOpen={newTaskModalOpen}
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                )}
                <Button
                    type="button"
                    onClick={handleLogout}
                    className={classes.button}
                >
                    Logout
                </Button>
            </div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {loading ? (
                    <CircularProgress />
                ) : (
                    tasks.map((task) => (
                        <Grid item key={task._id}>
                            <Card
                                className={classes.card}
                                onClick={() => handleClickCard(task._id)}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        className={classes.title}
                                    >
                                        {task.Title}
                                    </Typography>
                                    <Typography
                                        className={classes.description}
                                        color="textSecondary"
                                    >
                                        {task.Description}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        className={classes.status}
                                    >
                                        Status: {task.Status}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        className={classes.dueDate}
                                    >
                                        Due Date:{" "}
                                        {new Date(
                                            task.DueDate
                                        ).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    );
};

export default Dashboard;
