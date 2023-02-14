import React, { useState, useEffect } from "react";
import "./styles.css";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Button,
} from "@material-ui/core";
import tasksApi from "../../api/tasksApi";
import { useNavigate } from "react-router-dom";
import NewTask from "../../components/NewTask";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const tasksData = await tasksApi.getTasks(accessToken);
            if (tasksData === 0) {
                navigate("/login");
            } else {
                setTasks(tasksData.data);
                setLoading(false);
            }
        };
        fetchData();
    }, [modalOpen]);

    return (
        <>
            <div className="dashboard-header">
                <Button
                    type="button"
                    className="dashboard-button"
                    onClick={handleModalOpen}
                >
                    New Task
                </Button>
                {modalOpen && (
                    <NewTask
                        onClose={handleModalClose}
                        modalOpen={modalOpen}
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                )}
                <Button
                    type="button"
                    onClick={handleLogout}
                    className="dashboard-button"
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
                            <Card className="dashboard-card">
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {task.Title}
                                    </Typography>
                                    <Typography
                                        className="dashboard-title"
                                        color="textSecondary"
                                    >
                                        {task.Description}
                                    </Typography>
                                    <Typography variant="body2">
                                        Status: {task.Status}
                                    </Typography>
                                    <Typography variant="body2">
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
        </>
    );
};

export default Dashboard;
