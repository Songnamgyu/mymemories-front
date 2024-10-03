import { Card } from "antd";
import Meta from "antd/es/card/Meta";

interface Props {
    places: any[];
}

const PlaceList = ({ places }: Props) => {
    return (
        <div className="placeListContainer">
            {places.map((data: any) => {
                return (
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={
                            <img
                                alt="place"
                                src={
                                    data?.photo?.images?.large?.url
                                        ? data.photo.images.large.url
                                        : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                }
                            />
                        }
                        key={data.id}
                    >
                        <Meta
                            title={data.name}
                            description={
                                data.description || "No description available"
                            }
                        />
                    </Card>
                );
            })}
        </div>
    );
};

export default PlaceList;
