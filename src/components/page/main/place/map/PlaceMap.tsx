import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import PlaceList from "./PlaceList";
import PlaceSearchForm from "./PlaceSerachForm";
import { fetchRestaurantsList } from "../../../../../api/place/placeApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../app/store";

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
    setBounds?: any;
}

const PlaceMap: React.FC<MapProps> = ({
    mapApi,
    setCoordinates,
    setBounds,
    coordinates,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [places, setPlaces] = useState<Place[]>([]);

    // 지도 변경 시 restaurant 리스트 가져오기
    useEffect(() => {
        // restaurants 목록 요청
        dispatch(fetchRestaurantsList())
            .unwrap()
            .then((res: any) => {
                console.log("res", res);
                setPlaces(res.data);
            })
            .catch((error: any) => {
                console.log("error", error);
            });
    }, [setBounds, dispatch]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setCoordinates({ lat: latitude, lng: longitude });
            }
        );
    }, []);

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
                        if (e.marginBounds) {
                            setBounds({
                                ne: e.marginBounds.ne,
                                sw: e.marginBounds.sw,
                            });
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default PlaceMap;
