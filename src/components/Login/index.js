import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await authApi.login(email, password);
            if (response && response.code === 200) {
                localStorage.setItem("accessToken", response.accessToken);
                console.log(response.message);
                navigate("/dashboard");
            } else {
                console.log("failure");
            }
        } catch (error) {
            console.log(error);
            console.log("failure");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="login-form">
                <Typography variant="h3">Task Management</Typography>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="login-input"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="login-input"
                />
                <Button type="submit" className="login-button">
                    Sign in
                </Button>
                <Typography variant="body1" className="login-redirect">
                    Don't have an account?
                    <Link to="/register" className="sign-up-button">
                        <Button variant="contained">Sign up</Button>
                    </Link>
                </Typography>
            </form>
        </>
    );
};

export default Login;
