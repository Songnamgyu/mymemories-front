import { useEffect, useRef, useState } from "react";
import MapMarker from "./MapMarker"; // MapMarker 컴포넌트 import

function GoogleMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
        null
    );

    useEffect(() => {
        if (!mapRef.current) return;

        // Google Maps 인스턴스 생성
        const instance = new window.google.maps.Map(mapRef.current, {
            center: { lat: 37.5, lng: 127.0 },
            zoom: 16,
        });

        setGoogleMap(instance);

        // 더블 클릭 이벤트로 마커 추가 (이전 마커 제거 후 새 마커 추가)
        instance.addListener("dblclick", (e: google.maps.MapMouseEvent) => {
            if (e.latLng) {
                const newMarker = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                };
                setMarker(newMarker); // 새 마커 추가 (기존 마커는 덮어씀)
            }
        });

        return () => {
            instance.unbindAll();
        };
    }, []);

    return (
        <div>
            <div ref={mapRef} style={{ height: "100vh", width: "100vh" }} />

            {/* 마커 표시 */}
            {googleMap && marker && (
                <MapMarker
                    key={marker.lat + marker.lng} // 고유 key
                    position={{ lat: marker.lat, lng: marker.lng }}
                    map={googleMap}
                />
            )}
        </div>
    );
}

export default GoogleMap;
