import React, { useState } from "react";
import { Button, TextField, Typography, CircularProgress } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import MessageDialog from "../../components/MessageDialog";
import authFormStyles from "../../styles/authFormStyles";

const Login = () => {
    const classes = authFormStyles();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!email || !password) {
                setMsg("email/password is empty!!!");
                setOpenDialog(true);
                return;
            }
            if (password.length < 6) {
                setMsg("invalid password");
                setOpenDialog(true);
                return;
            }

            setLoading(true);
            const response = await authApi.login(email, password);
            if (response.data && response.data.code === 200) {
                localStorage.setItem("accessToken", response.data.accessToken);
                setLoading(false);
                navigate("/dashboard");
            } else {
                setMsg(response.response.data.message);
                setOpenDialog(true);
                setLoading(false);
                navigate("/login");
            }
        } catch (error) {
            setMsg("has error!!!");
            setOpenDialog(true);
            setLoading(false);
            navigate("/login");
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <MessageDialog open={openDialog} onClose={handleCloseDialog} message={msg} />
            {loading ? (
                <CircularProgress />
            ) : (
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Typography variant="h3" className={classes.formTitle}>
                        Task Management
                    </Typography>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className={classes.formInput}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className={classes.formInput}
                    />
                    <Button type="submit" className={classes.signInButton}>
                        Sign in
                    </Button>
                    <Typography variant="body1" className={classes.redirect}>
                        Don't have an account?
                        <Link to="/register" className={classes.signUpButton}>
                            <Button variant="contained">Sign up</Button>
                        </Link>
                    </Typography>
                </form>
            )}
        </>
    );
};

export default Login;
