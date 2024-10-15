import { Card } from "antd";
import Meta from "antd/es/card/Meta";

interface Props {
    placeList: any[];
    rating: number;
    type: string;
}

const PlaceList = ({ placeList, rating, type }: Props) => {
    return (
        <div className="placeListContainer">
            {Array.isArray(placeList) &&
                placeList
                    .filter((item: any) => item.rating >= rating)
                    .map((data: any) => {
                        // 데이터에 주소가 있는 경우에만 카드를 렌더링
                        if (!data?.address) return null;

                        const imageUrl = data?.photo?.images?.large?.url;

                        return (
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={
                                    imageUrl ? (
                                        <img alt="place" src={imageUrl} />
                                    ) : (
                                        <div
                                            style={{
                                                height: "150px",
                                                alignContent: "center",
                                                textAlign: "center",
                                            }}
                                        >
                                            No Image
                                        </div>
                                    )
                                }
                                key={data.id}
                            >
                                <Meta title={data.name} />
                                <div className="cardInfo">
                                    <div className="infoItem">
                                        Address: {data.address}
                                    </div>
                                    <div className="infoItem">
                                        Rating: {data.rating}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
        </div>
    );
};

export default PlaceList;
