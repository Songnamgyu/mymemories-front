import { Card } from "antd";

interface MarkerProps {
    lat: number;
    lng: number;
    name: string;
    photoUrl: string;
}

const CustomMarker: React.FC<MarkerProps> = ({ name, photoUrl }) => {
    return (
        <Card
            style={{
                width: 100, // Card를 정사각형으로 설정
                height: 100,
                textAlign: "center",
                padding: 5,
                overflow: "hidden",
            }}
            bodyStyle={{
                padding: 0, // 내부 패딩을 0으로 설정
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center", // 수직 중앙 정렬
            }}
        >
            {photoUrl ? ( // photoUrl이 존재하는 경우에만 이미지 표시
                <img
                    src={photoUrl}
                    alt={name}
                    style={{
                        width: "100px",
                        height: "75px", // 이미지 높이를 조정
                        objectFit: "cover",
                        marginBottom: "4px", // 마진 조정
                    }}
                />
            ) : (
                <div
                    style={{
                        height: "75px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    No Image
                </div>
            )}

            <div
                style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginTop: 4,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    textAlign: "center",
                }}
            >
                {name}
            </div>
        </Card>
    );
};

export default CustomMarker;
