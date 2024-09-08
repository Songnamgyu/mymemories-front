import React, { useState } from "react";
import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import Info from "./UserInfo/info/Info";

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["MyMemories"].map((key) => ({
    key,
    label: key,
}));

const items2: MenuProps["items"] = [
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
].map((icon, index) => {
    const key = String(index + 1);
    const subMenu = ["UserInfo"];
    const subMenuChildrenList = [
        {
            UserInfo: [{ 1: "info" }, { 2: "modify" }],
        },
    ];

    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: subMenu[index] || "Unknown", // subMenu가 하나밖에 없으므로 안전하게 처리
        children: subMenuChildrenList
            .filter((item: any) => subMenu[index] in item) // 현재 subMenu와 일치하는 항목 필터링
            .flatMap((item: any) => {
                const subkey = Object.keys(item)[0]; // 'UserInfo'
                return item[subkey].map((ele: any) => {
                    const subMenuKey = Object.keys(ele)[0]; // 1, 2
                    const subMenuLabel = ele[subMenuKey]; // 'info', 'modify'
                    return {
                        key: `${subMenuLabel}`,
                        label: subMenuLabel,
                    };
                });
            }),
    };
});

const Home: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [selectedMenu, setSelectedMenu] = useState<string | undefined>("");

    const navigator = useNavigate();

    const handleMoveSubMenu = (items2: any) => {
        setSelectedMenu(items2.key);
    };

    return (
        <Layout style={{ height: "1000px" }}>
            <Header style={{ display: "flex", alignItems: "center" }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["MyMemories"]}
                    items={items1}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{ height: "100%", borderRight: 0 }}
                        items={items2}
                        onClick={(e) => handleMoveSubMenu(e)}
                    />
                </Sider>
                <Layout style={{ padding: "0 24px 24px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>MyMemories</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {selectedMenu === "info" && <Info />}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Home;
