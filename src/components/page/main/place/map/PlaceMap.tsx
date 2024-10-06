import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import PlaceList from "./PlaceList";
import PlaceSearchForm from "./PlaceSerachForm";
import { fetchRestaurantsList } from "../../../../../api/place/placeApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../app/store";
import { mockRestaurantDataList } from "../../../../../mock";
import {
    GoogleMap,
    InfoWindow,
    LoadScript,
    Marker,
} from "@react-google-maps/api";

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
    const [places, setPlaces] = useState<any>([]);
    // const [places, setPlaces] = useState<Place[]>([]);
    const [bounds, setBounds] = useState<any>(null);

    // 지도 변경 시 restaurant 리스트 가져오기
    useEffect(() => {
        if (bounds) {
            console.log("Fetching restaurants within bounds:", bounds);

            const { ne, sw } = bounds;
            const boundsData = {
                bl_latitude: sw.lat, // 남서쪽 (SW)의 위도
                tr_latitude: ne.lat, // 북동쪽 (NE)의 위도
                bl_longitude: sw.lng, // 남서쪽 (SW)의 경도
                tr_longitude: ne.lng, // 북동쪽 (NE)의 경도
            };
            setPlaces(mockRestaurantDataList.data);
            // dispatch(fetchRestaurantsList(boundsData))
            //     .unwrap()
            //     .then((res: any) => {
            //         console.log("res", res);
            //         setPlaces(res.data);
            //     })
            //     .catch((error: any) => {
            //         console.log("error", error);
            //     });
        }
    }, [bounds, dispatch]);

    // 초기 좌표 설정
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
                <PlaceSearchForm />
                <PlaceList places={places} /> {/* 상태로부터 전달 */}
            </div>
            <div style={{ width: "720px", height: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: mapApi }}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={14}
                    margin={[50, 50, 50, 50]}
                    onChange={(e) => {
                        // 지도의 중심 좌표 업데이트
                        setCoordinates({
                            lat: e.center.lat,
                            lng: e.center.lng,
                        });

                        // 지도의 경계값 업데이트
                        setBounds({
                            ne: e.marginBounds.ne,
                            sw: e.marginBounds.sw,
                        });
                    }}
                    {...places?.map((place: any, index: number) => (
                        <Marker
                            key={index}
                            position={{
                                lat: Number(place.latitude),
                                lng: Number(place.longitude),
                            }}
                            // lat={Number(place.latitude)} // Marker에 lat, lng 전달
                            // lng={Number(place.longitude)}
                            // text={place.name}
                        >
                            <InfoWindow>
                                <div>{place.name}</div>{" "}
                                {/* 마커 위에 표시할 텍스트 */}
                            </InfoWindow>
                        </Marker>
                    ))}
                ></GoogleMapReact>
            </div>
        </div>
    );
};

export default PlaceMap;
