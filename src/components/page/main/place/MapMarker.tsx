import { useEffect } from "react";

interface MapMarkerProps {
    position: { lat: number; lng: number };
    map: google.maps.Map;
}

function MapMarker({ position, map }: MapMarkerProps) {
    useEffect(() => {
        // 마커 생성
        const marker = new google.maps.Marker({
            position,
            map,
        });

        // 마커 제거를 위한 cleanup 함수
        return () => {
            marker.setMap(null);
        };
    }, [position, map]);

    return null;
}

export default MapMarker;
