import React, { useState, useEffect } from "react";
// import "./styles.css";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Button,
} from "@material-ui/core";
import tasksApi from "../../api/tasksApi";
import { useNavigate, useParams } from "react-router-dom";

const DetailTask = () => {
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();
    const params = useParams();

    const handleBackToDashboard = () => {
        navigate("/dashboard");
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const taskData = await tasksApi.getTask(accessToken, params.id);
            if (taskData === 0) {
                navigate("/login");
            } else {
                console.log(taskData.data);
                setTask(taskData.data);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="dashboard-header">
                <Button
                    type="button"
                    className="dashboard-button"
                    onClick={handleBackToDashboard}
                >
                    Back To Dashboard
                </Button>
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
                                Create Date:{" "}
                                {new Date(task.createdAt).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    }
                                )}
                            </Typography>
                            <Typography variant="body2">
                                Due Date:{" "}
                                {new Date(task.DueDate).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    }
                                )}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Grid>
        </>
    );
};

export default DetailTask;
