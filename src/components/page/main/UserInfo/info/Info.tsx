import React, { useState } from "react";
import { Alert, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const Info: React.FC = () => {
    const [value, setValue] = useState(() => dayjs(new Date()));
    const [selectedValue, setSelectedValue] = useState(() => dayjs(new Date()));

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };

    const onDoubleClickHandler = () => {
        console.log("onDoubleClickHandler");
    };

    return (
        <>
            <Alert
                message={`You selected date: ${selectedValue?.format(
                    "YYYY-MM-DD"
                )}`}
            />
            <div onDoubleClick={onDoubleClickHandler}>
                <Calendar
                    value={value}
                    onSelect={onSelect}
                    onPanelChange={onPanelChange}
                />
            </div>
        </>
    );
};

export default Info;
