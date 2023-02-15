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
import { useNavigate, useParams } from "react-router-dom";
import userApi from "../../api/userApi";
import pageStyles from "../../styles/pageStyles";

const UserInfo = () => {
    const classes = pageStyles();

    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

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
            const userInfo = await userApi.getInfo(accessToken);
            if (userInfo === 0) {
                navigate("/login");
            } else {
                console.log(userInfo.data);
                setInfo(userInfo.data);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Button
                    type="button"
                    className={classes.button}
                    onClick={handleBackToDashboard}
                >
                    Back To Dashboard
                </Button>
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
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Name: {info.Name}
                            </Typography>
                            <Typography
                                className="dashboard-title"
                                color="textSecondary"
                            >
                                Email {info.Email}
                            </Typography>
                            <Typography variant="body2">
                                Phone: {info.Phone}
                            </Typography>
                            <Typography variant="body2">
                                Role: {info.Role}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Grid>
        </div>
    );
};

export default UserInfo;
