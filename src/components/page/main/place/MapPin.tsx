import { forwardRef, ReactNode, useEffect } from "react";

interface MapPinProps {
    children: ReactNode;
}

const MapPin = forwardRef<HTMLDivElement, MapPinProps>(function MapPin(
    { children },
    ref
) {
    useEffect(() => {
        if (typeof ref !== "function") {
            if (ref?.current) {
                const initPin = new google.maps.marker.PinElement({
                    background: "#db4455",
                    borderColor: "#881824",
                });
                ref.current.appendChild(initPin.element);

                return () => {
                    ref.current?.removeChild(initPin.element);
                };
            }
        }
    }, [ref]);

    return <div ref={ref}>{children}</div>;
});

export default MapPin;
