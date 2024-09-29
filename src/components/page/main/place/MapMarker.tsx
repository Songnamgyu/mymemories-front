import { useEffect, useRef } from "react";
import MapPin from "./MapPin";
function MapMarker({ map }: { map: google.maps.Map | undefined }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!map || !ref.current) return; // map이 없을 때는 useEffect 실행 안함

        const initMarker = new google.maps.marker.AdvancedMarkerElement({
            position: {
                lat: 37.549186395087,
                lng: 127.07505567644,
            },
            map,
            title: "이건 마커다 마커마커",
            content: ref.current,
        });

        return () => {
            initMarker.map = null; // 클린업
        };
    }, [map]); // map이 변할 때만 useEffect 재실행

    if (!map) return <>error</>; // 임시 에러 처리

    return (
        <div>
            <MapPin ref={ref}>마커</MapPin>
        </div>
    );
}

export default MapMarker;
