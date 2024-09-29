import { Status, Wrapper } from "@googlemaps/react-wrapper";
import GoogleMap from "./GoogleMap";

const render = (status: Status) => {
    switch (status) {
        case Status.LOADING:
            return <div>Loading...</div>;
        case Status.SUCCESS:
            return (
                <div>
                    <GoogleMap />
                </div>
            );
        case Status.FAILURE:
            return <div>Error</div>;
        default:
            return <div>Error</div>;
    }
};

const GoogleMapContainer = () => {
    return (
        <div></div>
        // <Wrapper
        //     apiKey=""
        //     render={render}
        //     libraries={["marker"]}
        // />
    );
};
export default GoogleMapContainer;
