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

    const handleApiLoaded = (map: any, maps: any) => {
        console.log("Map Loaded:", map, maps);
    };

    const handleChange = (value: any) => {
        console.log("Map changed:", value);
    };

    const handleChildClick = (childKey: any, childProps: any) => {
        console.log("Child clicked:", childKey, childProps);
    };

    // useEffect(() => {
    //     dispatch(fetchRestaurantsList())
    //         .unwrap()
    //         .then((res: any) => {
    //             console.log("res", res);
    //         })
    //         .catch((error: any) => {
    //             console.log("error", error);
    //         });
    // }, [coordinates, bounds]);
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
                <PlaceList /> {/* 상태로부터 전달 */}
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
                    onChildClick={handleChildClick}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) =>
                        handleApiLoaded(map, maps)
                    }
                />
            </div>
        </div>
    );
};

export default PlaceMap;
