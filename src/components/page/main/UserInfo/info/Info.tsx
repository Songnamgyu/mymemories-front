import React, { ReactEventHandler, useEffect, useState } from "react";
import { Badge, BadgeProps, Calendar, CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../../../common/CommonHeader";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../app/store";
import { getDiaryList } from "../../../../../api/diary/diaryApi";

const Info: React.FC = () => {
    const [value, setValue] = useState(dayjs(new Date()));
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
    };

    const { diaryData } = useSelector(
        (state: RootState) => state.diary,
        shallowEqual
    );

    useEffect(() => {
        const date = value.format("YYYYMM");
        dispatch(getDiaryList({ date }));
    }, [value, dispatch]); // value 값이 변경될 때만 useEffect 실행

    const onDoubleClickHandler = () => {
        const date = value.format("YYYY-MM-DD");
        navigate(`/detail/${date}/0`);
    };

    // 날짜별로 다이어리 데이터를 렌더링
    const dateCellRender = (currentDate: Dayjs) => {
        const formattedDate = currentDate.format("YYYYMMDD");
        // 현재 날짜와 diaryData의 날짜를 비교하여 일치하는 데이터를 필터링
        const listData = diaryData.filter((item) => {
            const date = dayjs(item.selectedDate).format("YYYYMMDD");
            return date === formattedDate;
        });
        const handleModifyDiaryById = (
            id: number,
            selectedDate: string,
            e: any
        ) => {
            e.stopPropagation(); // 이벤트 버블링 방지
            console.log("targetId", id);
            navigate(`/detail/${selectedDate}/${id}`);
        };
        return (
            <ul className="events">
                {listData.map((item: any) => (
                    <li
                        key={item.id}
                        onDoubleClick={(e) =>
                            handleModifyDiaryById(item.id, item.selectedDate, e)
                        }
                    >
                        <div className="badgeContainer">
                            <span className="badge">
                                <img
                                    src={`/assets/emotion${item.score}.png`}
                                    alt={`emotion-${item.score}`}
                                />
                                {item.content}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    // Calendar의 cellRender를 사용하여 각 셀에 대해 커스텀 렌더링
    const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
        if (info.type === "date") return dateCellRender(current);
        return info.originNode;
    };

    return (
        <CommonHeader>
            <div
                onDoubleClick={onDoubleClickHandler}
                style={{ height: "100%" }}
            >
                <Calendar
                    value={value}
                    onSelect={onSelect}
                    cellRender={cellRender}
                />
            </div>
        </CommonHeader>
    );
};

export default Info;
