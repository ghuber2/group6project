import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicGxlbnR5b2ZyaWVuZHMiLCJhIjoiY205enFub2luMWUwczJycHBncm92Y294dCJ9.KeP4XIME-8Wfva5aAMWXVw';

const PostMap = ({ lat, lng }) => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (!lat || !lng || mapRef.current) return;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/standard-satellite',
            center: [lng, lat],
            zoom: 16,
        });

        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current);

    }, [lat, lng]);

    return <div style={{ overflow: "hidden", height: 460, width: 700, borderRadius: 12 }}>
        {/contains map/}
        <div ref={mapContainerRef} style={{ height: 500, width: 700 }} />
    </div>;
};

export default PostMap;