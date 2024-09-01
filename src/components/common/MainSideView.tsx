import React from "react";

const MainSideView = () => {
    return (
        <div
            className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center"
            style={{
                background: `linear-gradient(rgba(2,2,2,.7), rgba(0,0,0,.7)), url('https://images.unsplash.com/photo-1650825556125-060e52d40bd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80') center center`,
                backgroundSize: "cover",
            }}
        >
            <div
                className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
            ></div>
            <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
                <h1 className="text-white font-bold text-4xl font-sans">
                    내안의 추억 내안의 기억
                </h1>
                <h1 className="text-white font-bold text-4xl font-sans">
                    My Memories
                </h1>
            </div>
        </div>
    );
};

export default MainSideView;
