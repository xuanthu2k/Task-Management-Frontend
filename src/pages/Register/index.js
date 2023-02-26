import React, { useState } from "react";
import { Button, CircularProgress, TextField, Typography } from "@material-ui/core";
import authApi from "../../api/authApi";
import MessageDialog from "../../components/MessageDialog";
import { useNavigate } from "react-router-dom";
import authFormStyles from "../../styles/authFormStyles";

const Register = () => {
    const classes = authFormStyles();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!username || username.length > 50) {
                setMessage("Username invalid");
                setOpenDialog(true);
                return;
            }
            if (!email) {
                setMessage("Email invalid");
                setOpenDialog(true);
                return;
            }
            if (!password || password.length > 50 || password.length < 6) {
                setMessage("Password invalid");
                setOpenDialog(true);
                return;
            }
            if (!phone || phone.length > 15 || phone.length < 7 || isNaN(phone)) {
                setMessage("Phone invalid");
                setOpenDialog(true);
                return;
            }
            setLoading(true);
            const response = await authApi.register(username, email, password, phone);
            if (response && response.code === 200) {
                alert("Register success!!!");
                setLoading(false);
                navigate("/login");
            } else {
                console.log(username, email, password, phone);
                setMessage("Register Failure!!!");
                setLoading(false);
                setOpenDialog(true);
            }
        } catch (error) {
            setMessage("Register Failure!!!");
            setOpenDialog(true);
            setLoading(false);
            console.log(error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleBackToLogin = () => {
        navigate("/login");
    };

    return (
        <>
            <MessageDialog open={openDialog} onClose={handleCloseDialog} message={message} />
            {loading ? (
                <CircularProgress />
            ) : (
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Typography variant="h4" className={classes.formTitle}>
                        Register
                    </Typography>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className={classes.formInput}
                    />
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
                    <TextField
                        label="Phone"
                        type="phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className={classes.formInput}
                    />
                    <Button type="submit" className={classes.signUpButton}>
                        Register
                    </Button>
                    <Button
                        type="button"
                        onClick={handleBackToLogin}
                        className={classes.formButton}
                    >
                        Back to Login
                    </Button>
                </form>
            )}
        </>
    );
};

export default Register;
