import React from "react";
import "tailwindcss/tailwind.css";
import "./App.css";
import Login from "./components/page/login/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/page/login/Signup";
import Home from "./components/page/main/Home";
import Info from "./components/page/main/UserInfo/info/Info";
import Detail from "./components/page/main/UserInfo/info/Detail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/join" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/info" element={<Info />} />
                <Route path="/detail" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
