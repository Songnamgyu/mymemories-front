import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import PlaceList from "./PlaceList";
import PlaceSearchForm from "./PlaceSerachForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../app/store";
import { mockRestaurantDataList } from "../../../../../mock";
import { Card, Typography } from "antd";
import CustomMarker from "./CustomMarker";

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
    const [bounds, setBounds] = useState<any>(null);

    useEffect(() => {
        if (bounds) {
            const { ne, sw } = bounds;
            const boundsData = {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            };
            setPlaces(mockRestaurantDataList.data);
        }
    }, [bounds, dispatch]);

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
                <PlaceList places={places} />
            </div>
            <div style={{ width: "720px", height: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: mapApi }}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={14}
                    margin={[50, 50, 50, 50]}
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
                    {places?.map((place: any, i: number) => (
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
