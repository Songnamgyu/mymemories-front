import React, { useState } from "react";
import { Breadcrumb, Layout, theme } from "antd";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";
import Info from "./UserInfo/info/Info";
import { handleMoveSubMenu } from "../../../utils/navigationUtil"; // 유틸리티 함수 import

const { Header, Content } = Layout;

const Home: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [selectedMenu, setSelectedMenu] = useState<string | undefined>("");

    const navigate = useNavigate();

    // handleMoveSubMenu를 유틸리티 함수로 리팩토링
    const handleMenuClick = (items2: any) => {
        handleMoveSubMenu(items2, setSelectedMenu, navigate);
    };

    return (
        <>
            <CommonHeader handleMoveSubMenu={handleMenuClick}>
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
                        {/* selectedMenu 값에 따라 Info 컴포넌트 렌더링 */}
                        {selectedMenu === "info" && <Info />}
                    </Content>
                </Layout>
            </CommonHeader>
        </>
    );
};

export default Home;
