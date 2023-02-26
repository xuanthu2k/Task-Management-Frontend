import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, CircularProgress, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import tasksApi from "../../api/tasksApi";
import { useNavigate } from "react-router-dom";
import NewTask from "../../components/NewTask";
import userApi from "../../api/userApi";
import pageStyles from "../../styles/pageStyles";
import DetailTask from "../../components/DetailTask";
import CardTask from "../../components/CardTask";

const Dashboard = () => {
    const classes = pageStyles();

    const [reRender, setReRender] = useState(false);
    const [tasks, setTasks] = useState([]);
    // const [newTasks, setNewTasks] = useState([]);
    // const [incompleteTasks, setIncompleteTasks] = useState([]);
    // const [completeTasks, setCompleteTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [taskDetailModalOpen, setTaskDetailModalOpen] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    const handleNewTaskModalOpen = () => {
        setTaskModalOpen(true);
    };

    const handleNewTaskModalClose = () => {
        setTaskModalOpen(false);
    };

    const handleTaskDetailModalOpen = () => {
        setTaskDetailModalOpen(true);
    };

    const handleTaskDetailModalClose = () => {
        setTaskDetailModalOpen(false);
    };

    const handleReRender = () => {
        setReRender(!reRender);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const tasksData = await tasksApi.getTasks(accessToken);
            const userData = await userApi.getInfo(accessToken);
            if (tasksData === 0 || userData === 0) {
                navigate("/login");
            } else {
                // sort by DueDate
                const tasksArray = tasksData.data;
                tasksArray.sort((a, b) => new Date(a.DueDate) - new Date(b.DueDate));
                setTasks(tasksArray);
                setLoading(false);
            }
        };
        fetchData();
    }, [reRender]);

    const handleClickCard = (id) => {
        setTaskDetailModalOpen(true);
        localStorage.setItem("taskId", id);
    };

    const handleClickUserInfo = () => {
        navigate("/info");
    };

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Button type="button" className={classes.button} onClick={handleClickUserInfo}>
                    Info
                </Button>
                <Button type="button" className={classes.button} onClick={handleNewTaskModalOpen}>
                    New
                </Button>
                {taskModalOpen && (
                    <NewTask
                        onClose={handleNewTaskModalClose}
                        reRender={handleReRender}
                        modalOpen={taskModalOpen}
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                )}
                {taskDetailModalOpen && (
                    <DetailTask
                        onClose={handleTaskDetailModalClose}
                        reRender={handleReRender}
                        modalOpen={handleTaskDetailModalOpen}
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                )}
                <Button type="button" onClick={handleLogout} className={classes.button}>
                    Logout
                </Button>
            </div>
            <Grid container direction="row" justify="center" alignItems="center">
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={4}>
                        {/* Column for New tasks */}
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h5">New Tasks</Typography>
                            {tasks.filter((task) => task.Status === "New").length > 0 ? (
                                tasks
                                    .filter((task) => task.Status === "New")
                                    .map((task) => (
                                        <CardTask handleClickCard={handleClickCard} task={task} />
                                    ))
                            ) : (
                                <Typography>No new tasks</Typography>
                            )}
                        </Grid>

                        {/* Column for Incomplete tasks */}
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h5">Incomplete Tasks</Typography>
                            {tasks.filter((task) => task.Status === "Incomplete").length > 0 ? (
                                tasks
                                    .filter((task) => task.Status === "Incomplete")
                                    .map((task) => (
                                        <CardTask handleClickCard={handleClickCard} task={task} />
                                    ))
                            ) : (
                                <Typography>No incomplete tasks</Typography>
                            )}
                        </Grid>

                        {/* Column for Complete tasks */}
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h5">Complete Tasks</Typography>
                            {tasks.filter((task) => task.Status === "Complete").length > 0 ? (
                                tasks
                                    .filter((task) => task.Status === "Complete")
                                    .map((task) => (
                                        <CardTask handleClickCard={handleClickCard} task={task} />
                                    ))
                            ) : (
                                <Typography>No complete tasks</Typography>
                            )}
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default Dashboard;
