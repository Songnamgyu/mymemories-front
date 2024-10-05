import CommonHeader from "../../../common/CommonHeader";
import GoogleMapContainer from "./GoogleMapContainer";
import GoogleMapReact from "google-map-react";
import PlaceMap from "./map/PlaceMap";
import { useState } from "react";

const Place = () => {
    const [coordinates, setCoordinates] = useState({
        lat: 11.94,
        lng: 108,
    });
    const [bounds, setBounds] = useState(null);
    const mapApi: any = process.env.REACT_APP_GOOGLE_MAP_API;
    return (
        <CommonHeader>
            <div style={{ height: "100%", display: "flex" }}>
                <PlaceMap
                    mapApi={mapApi}
                    setCoordinates={setCoordinates}
                    setBounds={setBounds}
                    coordinates={coordinates}
                />
                {/* <GoogleMapContainer />
                <div>11</div> */}
            </div>
        </CommonHeader>
    );
};
export default Place;
