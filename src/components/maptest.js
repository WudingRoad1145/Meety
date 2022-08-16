import React, { useState } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '1200px',
  height: '800px'
};

const center = {
  lat: 37.774,
  lng: -122.442
};


function getLocation(){
    const onSuccess = (loc) => {
        const lat =loc.coords.latitude;
        const long = loc.coords.longitude;
        const crd = loc.coords;
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

    }

    const onError =()=>{
        console.log("Could not get Location")
    }

    navigator.geolocation.getCurrentPosition(onSuccess,onError)
}

function MapComponent() {
    // small bug- the map doesn't center to the user's location automatically
    return (
        <LoadScript
        googleMapsApiKey="AIzaSyAIJx9hwjxcmt2-VjyW5MCxwPqlVvTW51w"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
            </GoogleMap>
            <button
                    type="button"
                    className="w-full mt-5 items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={getLocation}
                >
                Get Location
            </button>
        </LoadScript>
    )
}

export default React.memo(MapComponent)