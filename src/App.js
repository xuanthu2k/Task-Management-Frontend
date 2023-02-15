import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DetailTask from "./pages/DetailTask";
import UserInfo from "./pages/UserInfo";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/task/:id" element={<DetailTask />} />
                <Route path="/info" element={<UserInfo />} />
            </Routes>
        </Router>
    );
}

export default App;
