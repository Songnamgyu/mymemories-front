import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { handleMoveSubMenu } from "../../utils/navigationUtil"; // 유틸리티 함수 import
import { useDispatch } from "react-redux";
import { setLogout } from "../../slice/userSlice";

const { Header, Sider } = Layout;

interface CommonHeaderProps {
    handleMoveSubMenu?: (
        items2: any,
        setSelectedMenu: (key: string) => void,
        navigate: any
    ) => void; // 타입 정의 추가
    children?: React.ReactNode;
}

const items1: MenuProps["items"] = ["MyMemories"].map((key) => ({
    key,
    label: key,
}));

const items2: MenuProps["items"] = [
    UserOutlined,
    // LaptopOutlined,
    // NotificationOutlined,
].map((icon, index) => {
    const key = String(index + 1);
    const subMenu = ["Memories"];
    const subMenuChildrenList = [
        {
            Memories: [{ 1: "Schedule" }, { 2: "Place" }],
        },
    ];

    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: subMenu[index],
        children: subMenuChildrenList
            .filter((item: any) => subMenu[index] in item)
            .flatMap((item: any) => {
                const subkey = Object.keys(item)[0];
                return item[subkey].map((ele: any) => {
                    const subMenuKey = Object.keys(ele)[0];
                    const subMenuLabel = ele[subMenuKey];
                    return {
                        key: `${subMenuLabel}`,
                        label: subMenuLabel,
                    };
                });
            }),
    };
});

const CommonHeader: React.FC<CommonHeaderProps> = ({
    handleMoveSubMenu,
    children,
}) => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
    const [selectedMenu, setSelectedMenu] = React.useState<string>("");
    const dispatch = useDispatch();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleLogout = () => {
        dispatch(setLogout());
        navigate("/");
    };
    // handleMoveSubMenu가 없는 경우 기본 함수 설정
    const onMenuClick = (items2: any) => {
        setSelectedMenu(items2.key); // 메뉴 선택 시 상태 업데이트
        if (handleMoveSubMenu) {
            handleMoveSubMenu(items2, setSelectedMenu, navigate); // 유틸리티 함수 호출
        } else {
            navigate(`/${items2.key}`);
            console.warn("handleMoveSubMenu prop is not provided");
            // 기본 동작 또는 대체 동작 구현
        }
    };

    return (
        <Layout style={{ height: "100%", display: "flex" }}>
            <Header style={{ display: "flex", alignItems: "center" }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["MyMemories"]}
                    items={items1}
                    style={{ flex: 1, minWidth: 0 }}
                />
                <button className="logout_button" onClick={handleLogout}>
                    <h4 className="text">로그아웃</h4>
                </button>
            </Header>
            <Layout id="sidebarLayout">
                <Sider
                    width={200}
                    style={{
                        background: colorBgContainer,
                        borderRight: "1px solid bloack",
                        marginTop: "-1.1px",
                    }}
                >
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{
                            height: "100%",
                            borderRight: "1px solid black",
                        }}
                        items={items2}
                        onClick={onMenuClick} // 메뉴 클릭 시 기본 처리 혹은 전달된 함수 호출
                    />
                </Sider>
                {children}
            </Layout>
        </Layout>
    );
};

export default CommonHeader;
