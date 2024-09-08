import React, { useState } from "react";
import { Alert, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../../../common/CommonHeader";

const Info: React.FC = () => {
    const [value, setValue] = useState(() => dayjs(new Date()));
    const [selectedValue, setSelectedValue] = useState(() => dayjs(new Date()));

    const navigate = useNavigate();

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };

    const onDoubleClickHandler = () => {
        console.log("onDoubleClickHandler");
        navigate("/detail");
    };

    return (
        <>
            <CommonHeader>
                <div
                    onDoubleClick={onDoubleClickHandler}
                    style={{ height: "100%" }}
                >
                    <Calendar
                        value={value}
                        onSelect={onSelect}
                        onPanelChange={onPanelChange}
                    />
                </div>
            </CommonHeader>
        </>
    );
};

export default Info;
