import { useEffect, useRef, useState } from "react";
import MapMarker from "./MapMarker";

function GoogleMap() {
    const ref = useRef<HTMLDivElement>(null);
    const [googleMap, setGoogleMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current) {
            const initialMap = new window.google.maps.Map(ref.current, {
                center: {
                    lat: 37.549186395087,
                    lng: 127.07505567644,
                },
                zoom: 16,
                mapId: process.env.REACT_APP_GOOGLE_VECTOR_MAP_KEY as string,
                /* disableDefaultUI: true,
          clickableIcons: false, */
                minZoom: 12,
                maxZoom: 18,
                gestureHandling: "greedy",
                restriction: {
                    latLngBounds: {
                        north: 39,
                        south: 32,
                        east: 132,
                        west: 124,
                    },
                    strictBounds: true,
                },
            });

            setGoogleMap(initialMap);
        }
    }, []);

    return (
        <div ref={ref} id="map">
            {googleMap !== undefined ? <MapMarker map={googleMap} /> : null}
        </div>
    );
}

export default GoogleMap;
