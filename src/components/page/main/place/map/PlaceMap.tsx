import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import PlaceList from "./PlaceList";
import PlaceSearchForm from "./PlaceSerachForm";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../app/store";
import CustomMarker from "./CustomMarker";
import { fetchRestaurantsList } from "../../../../../api/place/placeApi";

interface Place {
    id: number;
    name: string;
    lat: number;
    lng: number;
}

interface MapProps {
    mapApi: string;
    coordinates: { lat: number; lng: number };
    setCoordinates?: any;
}

const PlaceMap: React.FC<MapProps> = ({
    mapApi,
    setCoordinates,
    coordinates,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [bounds, setBounds] = useState<any>(null);
    const [rating, setRating] = useState(3);
    const [type, setType] = useState("restaurant");

    const { placeList } = useSelector(
        (state: RootState) => state.place,
        shallowEqual
    );

    // 평점 변경 핸들러
    const onChangeRating = (value: any) => {
        setRating(value); // 평점이 변경되면 `rating` 상태가 업데이트됨
    };
    const onChangeType = (type: string) => {
        setType(type);
    };
    // 지도 범위가 바뀔 때마다 새로운 장소를 가져오고 `places` 업데이트
    useEffect(() => {
        if (bounds) {
            const { ne, sw } = bounds;
            const boundsData = {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            };
            dispatch(fetchRestaurantsList(boundsData))
                .unwrap()
                .then((res) => {})
                .catch((error) => {
                    console.log("error", error);
                });
            // 장소 데이터를 불러와 `places` 업데이트
            // setPlaces(mockRestaurantDataList.data);
        }
    }, [bounds, dispatch, setCoordinates]);

    // 좌표 설정 (최초 로딩 시)
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setCoordinates({ lat: latitude, lng: longitude });
            }
        );
    }, [setCoordinates]);

    return (
        <div className="mapContainer">
            <div className="placeSearchContainer">
                <PlaceSearchForm
                    onChangeRating={onChangeRating}
                    onChangeType={onChangeType}
                />
                <PlaceList placeList={placeList} rating={rating} type={type} />
            </div>
            <div style={{ width: "720px", height: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: mapApi }}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={14}
                    margin={[50, 50, 50, 50]}
                    key={`${rating}-${placeList?.length}-${bounds?.ne?.lat}-${bounds?.sw?.lng}`}
                    onChange={(e) => {
                        setCoordinates({
                            lat: e.center.lat,
                            lng: e.center.lng,
                        });
                        setBounds({
                            ne: e.marginBounds.ne,
                            sw: e.marginBounds.sw,
                        });
                    }}
                >
                    {/* 평점 필터 적용 후 Marker 생성 */}

                    {placeList
                        ?.filter((item: any) => item.rating >= rating) // rating 값 이상인 장소들만 필터링
                        .map((place: any, i: number) => (
                            <CustomMarker
                                key={i}
                                lat={Number(place.latitude)}
                                lng={Number(place.longitude)}
                                name={place.name}
                                photoUrl={
                                    place.photo
                                        ? place.photo.images.large.url
                                        : null
                                }
                            />
                        ))}
                </GoogleMapReact>
            </div>
        </div>
    );
};

export default PlaceMap;
