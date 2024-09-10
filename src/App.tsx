import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { setIsAuthenciated } from "./slice/userSlice";
import "tailwindcss/tailwind.css";
import "./App.css";
import Login from "./components/page/login/login";
import SignUp from "./components/page/login/Signup";
import Home from "./components/page/main/Home";
import Info from "./components/page/main/UserInfo/info/Info";
import Detail from "./components/page/main/UserInfo/info/Detail";

function App() {
    const { isAuthenciated } = useSelector(
        (state: RootState) => state.user,
        shallowEqual
    );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        dispatch(setIsAuthenciated(!!refreshToken)); // Set authenticated state based on the presence of refreshToken
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                {isAuthenciated ? (
                    <Route path="/" element={<Home />} />
                ) : (
                    <Route path="/" element={<Login />} />
                )}
                <Route path="/join" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/info" element={<Info />} />
                <Route path="/detail/:date" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
