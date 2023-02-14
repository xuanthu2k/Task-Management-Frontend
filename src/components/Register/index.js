import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import "./styles.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Use the data from the form fields to make a call to a server or save the data in the state, etc.
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="register-form">
                <Typography variant="h4">Register</Typography>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="register-input"
                />
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="register-input"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="register-input"
                />
                <Button type="submit" className="register-button">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default Register;
