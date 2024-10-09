import { Status, Wrapper } from "@googlemaps/react-wrapper";
import GoogleMap from "./GoogleMap";

const render = (status: Status) => {
    console.log("status", status);
    switch (status) {
        case Status.LOADING:
            return <div>Loading...</div>;
        case Status.SUCCESS:
            return <GoogleMap />;
        case Status.FAILURE:
            return <div>Error</div>;
        default:
            return <div>Error</div>;
    }
};

const GoogleMapContainer = () => {
    const mapApi: any = process.env.REACT_APP_GOOGLE_MAP_API;

    return <Wrapper apiKey={mapApi} render={render} libraries={["marker"]} />;
};
export default GoogleMapContainer;
