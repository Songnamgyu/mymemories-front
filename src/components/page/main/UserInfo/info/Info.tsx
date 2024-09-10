import React, { useState } from "react";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../../../common/CommonHeader";

const Info: React.FC = () => {
    const [value, setValue] = useState(dayjs(new Date()));
    const navigate = useNavigate();

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
    };

    const onDoubleClickHandler = () => {
        const id = value.format("YYYY-MM-DD"); // Use the selected value for navigation
        navigate(`/detail/${id}`);
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
