import CommonHeader from "../../../common/CommonHeader";
import GoogleMapContainer from "./GoogleMapContainer";
import GoogleMapReact from "google-map-react";
import PlaceMap from "./map/PlaceMap";
import { useState } from "react";

const Place = () => {
    const [coordinates, setCoordinates] = useState({
        lat: 11.847676,
        lng: 109.095887,
    });
    const [bounds, setBounds] = useState(null);
    const mapApi: any = process.env.REACT_APP_GOOGLE_MAP_API;
    return (
        <CommonHeader>
            <div style={{ height: "100%" }}>
                <PlaceMap
                    mapApi={mapApi}
                    setCoordinates={setCoordinates}
                    setBounds={setBounds}
                    coordinates={coordinates}
                />
            </div>
        </CommonHeader>
    );
};
export default Place;
