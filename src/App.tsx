import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { setIsAuthenciated } from "./slice/userSlice";
import "tailwindcss/tailwind.css";
import "./App.css";
import Login from "./components/page/login/login";
import SignUp from "./components/page/login/Signup";
import Home from "./components/page/main/Home";
import Info from "./components/page/main/shcedule/info/Info";
import Detail from "./components/page/main/shcedule/info/Detail";
import Place from "./components/page/main/place/Place";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenciated = useSelector(
        (state: RootState) => state.user.isAuthenciated,
        shallowEqual
    );

    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        dispatch(setIsAuthenciated(!!refreshToken)); // refreshToken 유무로 인증 상태 설정
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/join" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/schedule" element={<Info />} />
                <Route path="/detail/:date/:id" element={<Detail />} />
                <Route path="/place" element={<Place />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
