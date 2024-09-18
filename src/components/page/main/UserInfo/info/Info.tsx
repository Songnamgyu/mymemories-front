import React, { useEffect, useState } from "react";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../../../common/CommonHeader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../app/store";

const Info: React.FC = () => {
    const [value, setValue] = useState(dayjs(new Date()));
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
    };
    console.log("value", value.format("YYYYMM"));
    useEffect(() => {}, []);

    const onDoubleClickHandler = () => {
        const date = value.format("YYYY-MM-DD"); // Use the selected value for navigation
        navigate(`/detail/${date}`);
    };

    return (
        <CommonHeader>
            <div
                onDoubleClick={onDoubleClickHandler}
                style={{ height: "100%" }}
            >
                <Calendar value={value} onSelect={onSelect} />
            </div>
        </CommonHeader>
    );
};

export default Info;
