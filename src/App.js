import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const UserInfo = React.lazy(() => import("./pages/UserInfo"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
    return (
        <Suspense fallback={<div>Lazy load...</div>}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/info" element={<UserInfo />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </Suspense>
    );
}

export default App;
