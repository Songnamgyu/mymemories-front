import React, { HtmlHTMLAttributes, ReactHTMLElement, useState } from "react";
import MainSideView from "../../common/MainSideView";
import { emit } from "process";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../api/users/userApi";
import { AppDispatch, RootState } from "../../../app/store";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        gender: "",
    });

    const navigator = useNavigate();

    const { message } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch<AppDispatch>();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    // handleSubmit 함수 수정
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        if (
            !formData?.username ||
            !formData?.email ||
            !formData?.password ||
            !formData?.confirmPassword ||
            !formData?.phoneNumber ||
            !formData?.gender
        ) {
            return alert("입력되지않은 항목이 있습니다.");
        }
        if (formData?.password !== formData?.confirmPassword) {
            return alert(
                "비밀번호를 확인해주세요. 두 비밀번호가 일치하지않습니다"
            );
        }
        console.log("Submitted Data:", formData);
        // 여기서 formData를 백엔드에 전송하는 로직 추가
        try {
            // formData를 백엔드에 전송하는 로직
            await dispatch(createUser(formData)).unwrap();

            // 회원가입 성공 시 처리
            alert("회원가입 성공");
            navigator("/"); // 회원가입 성공 시 페이지 이동
        } catch (error: any) {
            // 회원가입 실패 시 처리
            if (error.message === "Account already exists") {
                alert("회원가입 실패, 계정이 이미 존재합니다.");
            } else {
                console.error("회원가입 중 오류 발생:", error);
                alert("회원가입 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <>
            <div className="h-screen flex">
                <MainSideView />
                <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
                    <div className="w-full px-8 md:px-32 lg:px-24">
                        <form
                            className="bg-white rounded-md shadow-2xl p-5"
                            onSubmit={handleSubmit}
                        >
                            <h1 className="text-gray-800 font-bold text-2xl mb-1">
                                Sign Up!
                            </h1>
                            <p className="text-sm font-normal text-gray-600 mb-8">
                                Welcome My Memories
                            </p>
                            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-5">
                                <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-width="2"
                                        d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                                <input
                                    id="username"
                                    className="pl-2 w-full outline-none border-none"
                                    type="name"
                                    name="username"
                                    placeholder="name"
                                    value={formData.username}
                                    onChange={(e) => onChangeHandler(e)}
                                />
                            </div>
                            {/* Email Input */}
                            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                                <input
                                    id="email"
                                    className="pl-2 w-full outline-none border-none"
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => onChangeHandler(e)}
                                />
                            </div>
                            {/* Password Input */}
                            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    className="pl-2 w-full outline-none border-none"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => onChangeHandler(e)}
                                />
                            </div>
                            {/* Confirm Password Input */}
                            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    className="pl-2 w-full outline-none border-none"
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Password Confirm"
                                    value={formData.confirmPassword}
                                    onChange={(e) => onChangeHandler(e)}
                                />
                            </div>
                            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-5">
                                {/* <label className="block mb-1 text-sm text-slate-800">
                                    Contact Number
                                </label> */}
                                <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
                                    />
                                </svg>

                                <input
                                    className="pl-2 w-full outline-none border-none"
                                    id="contactNumber"
                                    value={formData.phoneNumber}
                                    onChange={(e) => onChangeHandler(e)}
                                    maxLength={16}
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                />
                            </div>
                            {/* Gender Radio Buttons */}
                            <div className="mb-5">
                                <label className="mr-4">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="M"
                                        checked={formData.gender === "M"}
                                        onChange={onChangeHandler}
                                        className="mr-1"
                                    />
                                    남자
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="F"
                                        checked={formData.gender === "F"}
                                        onChange={onChangeHandler}
                                        className="mr-1"
                                    />
                                    여자
                                </label>
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                            >
                                회원 가입
                            </button>
                            {/* Links */}
                            <div className="flex justify-between mt-4">
                                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                                    Forgot Password ?
                                </span>
                                <a className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                                    Don't have an account yet?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
