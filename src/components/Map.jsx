import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = "pk.eyJ1IjoicGxlbnR5b2ZyaWVuZHMiLCJhIjoiY205enFub2luMWUwczJycHBncm92Y294dCJ9.KeP4XIME-8Wfva5aAMWXVw";

export default function Map({ setCoordinates }) {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) return;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            zoom: 16,
            center: [-76.6099, 39.3941],
            style: "mapbox://styles/mapbox/standard-satellite",
        });

        const marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([-76.6099, 39.3941])
            .addTo(mapRef.current);

        marker.on("dragend", () => {
            const { lng, lat } = marker.getLngLat();
            setCoordinates(lng, lat);
        });

    }, [setCoordinates]);

    return <div style={{ overflow: "hidden", height: 460, width: 700, borderRadius: 12 }}>
        {/* {/contains map/} */}
        <div ref={mapContainerRef} style={{ height: 500, width: 700 }} />
    </div>;
}