import React from "react";
import "./App.css";
import Login from "./components/page/login/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/page/login/Signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/join" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
