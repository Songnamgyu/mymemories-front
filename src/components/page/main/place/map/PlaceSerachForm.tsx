import { Input, Select, Typography } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { searchTypeList, scoreList } from "../../../../../mock/index";
import { useState } from "react";

const PlaceSearchForm = () => {
    const [value, setValue] = useState<string>("RE");
    const [scoreValue, setScoreValue] = useState<number>(3.0);
    return (
        <div>
            PlaceSearchForm
            <Typography.Title level={4}>
                Restaurants, Hotels & Attractions aound you
            </Typography.Title>
            <Select
                value={value}
                style={{ width: "250px", margin: "10px" }}
                options={searchTypeList?.map((item: any) => ({
                    value: item.value,
                    label: item.label,
                }))}
            />
            <Select
                value={scoreValue}
                size="middle"
                style={{ width: "70px" }}
                options={scoreList?.map((item: any) => ({
                    value: item.value,
                    label: item.label,
                }))}
            />
        </div>
    );
};

export default PlaceSearchForm;
