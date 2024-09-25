// src/utils/navigationUtil.ts
import { NavigateFunction } from "react-router-dom";

export const handleMoveSubMenu = (
    items2: any,
    setSelectedMenu: (key: string) => void,
    navigate: NavigateFunction
) => {
    setSelectedMenu(items2.key);

    // 메뉴 키 값에 따라 경로 설정
    switch (items2.key) {
        case "Schedule":
            navigate("/schedule"); // 'info' 메뉴 선택 시 '/info'로 이동
            break;
        case "modify":
            navigate("/modify"); // 'modify' 메뉴 선택 시 '/modify'로 이동
            break;
        default:
            console.warn(`Unknown menu item: ${items2.key}`);
            break;
    }
};
