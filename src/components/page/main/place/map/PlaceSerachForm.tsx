import { Input, Select, Typography } from "antd";
import { searchTypeList, scoreList } from "../../../../../mock/index";
import { useState } from "react";

interface Props {
    onChangeRating?: (value: number) => void;
    onChangeType?: (value: string) => void;
}

const PlaceSearchForm: React.FC<Props> = ({ onChangeRating, onChangeType }) => {
    const [value, setValue] = useState<string>("restaurant");
    const [scoreValue, setScoreValue] = useState<number>(3.0);

    const handleScoreChange = (value: number) => {
        setScoreValue(value);
        if (onChangeRating) {
            onChangeRating(value);
        }
    };

    const handleTypeChange = (value: string) => {
        setValue(value);
        onChangeType && onChangeType(value);
    };

    return (
        <div>
            <Typography.Title level={4}>
                Restaurants, Hotels & Attractions around you
            </Typography.Title>
            <Select
                value={value}
                style={{ width: 250, margin: "10px" }}
                options={searchTypeList.map((item) => ({
                    value: item.label,
                    label: item.label,
                }))}
                onChange={handleTypeChange} // 선택된 검색 유형 값을 업데이트
            />
            <Select
                value={scoreValue}
                size="middle"
                style={{ width: 70 }}
                options={scoreList.map((item) => ({
                    value: item.value,
                    label: item.label,
                }))}
                onChange={handleScoreChange} // 평점 값 변경 핸들러
            />
        </div>
    );
};

export default PlaceSearchForm;
