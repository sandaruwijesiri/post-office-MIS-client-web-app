import * as React from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./CSS/TrackPackageMapStyling.css";

export default function TrackMyPackageScreen(){
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAuYYZazxHt-Kl5vWNfLnfffVrYGDBdgeo",
  });
  const center = useMemo(() => ({ lat: 6.79581, lng: 79.90155 }), []);    // default centre

  return (
    <div className='map-container-parent'>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName='map-container'
          center={center}
          zoom={19}
          >
            
          <Marker position={{ lat: 6.79581, lng: 79.90155 }} />
          </GoogleMap>
      )}
    </div>
  );
     // marker position
}