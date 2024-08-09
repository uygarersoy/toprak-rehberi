import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/Dashboard";
import CreateProfilePage from "./pages/CreateProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Routes>
            <Route path="/" exact element={isLoggedIn ? <DashBoard /> : <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/dashboard" element={<DashBoard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/create-account" element={<CreateProfilePage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
        </Routes>        
    );
}

export default App;