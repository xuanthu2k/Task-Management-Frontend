import React, { useState } from "react";
import {
    Button,
    CircularProgress,
    TextField,
    Typography,
} from "@material-ui/core";
import "./styles.css";
import authApi from "../../api/authApi";
import MessageDialog from "../../components/MessageDialog";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
            setLoading(true);
            const response = await authApi.register(
                username,
                email,
                password,
                phone
            );
            if (response && response.code === 200) {
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

    return (
        <>
            <MessageDialog
                open={openDialog}
                onClose={handleCloseDialog}
                message={message}
            />
            {loading ? (
                <CircularProgress />
            ) : (
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
                    <TextField
                        label="Phone"
                        type="phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className="register-input"
                    />
                    <Button type="submit" className="register-button">
                        Submit
                    </Button>
                </form>
            )}
        </>
    );
};

export default Register;
