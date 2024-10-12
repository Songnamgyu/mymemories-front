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
                padding: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            {photoUrl != null && photoUrl && (
                <img
                    src={photoUrl}
                    alt={name}
                    style={{
                        width: "100px",
                        height: "25px",
                        objectFit: "cover",
                        marginTop: "4px",
                    }}
                />
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
