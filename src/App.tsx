import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";
import "./App.css";
import Login from "./components/page/login/login";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./components/page/login/Signup";
import Home from "./components/page/main/Home";
import Info from "./components/page/main/UserInfo/info/Info";
import Detail from "./components/page/main/UserInfo/info/Detail";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { setIsAuthenciated } from "./slice/userSlice";

function App() {
    const { isAuthenciated } = useSelector(
        (state: RootState) => state.user,
        shallowEqual
    );
    const dispatch = useDispatch<AppDispatch>();
    const refreshToken = localStorage.getItem("refreshToken");
    useEffect(() => {
        if (refreshToken) {
            dispatch(setIsAuthenciated(true));
        } else {
            dispatch(setIsAuthenciated(false));
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {isAuthenciated || refreshToken ? (
                    <Route path="/" element={<Home />} />
                ) : (
                    <Route path="/" element={<Login />} />
                )}
                <Route path="/join" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/info" element={<Info />} />
                <Route path="/detail" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
