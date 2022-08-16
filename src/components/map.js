import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from "@react-google-maps/api";

var json = '{"name": "Peter", "age": 22, "country": "United States"}';

// Converting JSON-encoded string to JS object
var obj = JSON.parse(json);

const containerStyle = {
    width: '1100px',
    height: '700px'
  };

const center = {
    lat: 37.774,
    lng: -122.442
};

let shape = {
    coords: [25, 25, 25],
    type: 'circle'
};

const NFT_1 = [
  {
    id: 1,
    name: "Will",
    pfp: "https://ipfs.io/ipfs/QmZF9jMdNj2dwZJP2WdbeU4AVfc7K1ZhY9wbC14e3BDZi4/06660.png",
    telegram:"https://t.me/ningani0430",
    twitter:"http://twitter.com/yanffyy",
    base:"San Diego",
    position: { lat: 37.79, lng:-122.442}
  },
  {
    id: 2,
    name: "Yan",
    pfp: "https://ipfs.io/ipfs/QmZF9jMdNj2dwZJP2WdbeU4AVfc7K1ZhY9wbC14e3BDZi4/06660.png",
    telegram:"https://t.me/yanffyy",
    twitter:"http://twitter.com/yanffyy",
    base:"Duke",
    position: { lat: 37.7742, lng: -122.445 }
  },
  {
    id: 3,
    name: "Jason",
    pfp: "https://ipfs.io/ipfs/QmZF9jMdNj2dwZJP2WdbeU4AVfc7K1ZhY9wbC14e3BDZi4/06660.png",
    telegram:"https://t.me/jasonhu42",
    twitter:"http://twitter.com/yanffyy",
    base:"San Francisco",
    position: { lat: 37.770, lng: -122.447 }
  },
  {
    id: 4,
    name: "Hugo",
    pfp: "https://ipfs.io/ipfs/QmZF9jMdNj2dwZJP2WdbeU4AVfc7K1ZhY9wbC14e3BDZi4/06660.png",
    telegram:"https://t.me/jasonhu42",
    twitter:"http://twitter.com/yanffyy",
    base:"Berkeley",
    position: { lat: 37.774, lng: -122.439 }
  },
  {
    id: 5,
    name: "Farza",
    pfp: "https://ipfs.io/ipfs/QmZF9jMdNj2dwZJP2WdbeU4AVfc7K1ZhY9wbC14e3BDZi4/06660.png",
    telegram:"https://t.me/jasonhu42",
    twitter:"http://twitter.com/yanffyy",
    base:"San Diego",
    position: { lat: 37.774, lng: -122.46 }
  }
];

function Map() {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAIJx9hwjxcmt2-VjyW5MCxwPqlVvTW51w"
  })
  const [map, setMap] = React.useState(null)
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    NFT_1.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

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

  return isLoaded ? (
        <><button
          type="button"
          className="w-full mt-5 items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={getLocation}
      >
          Verify Location
      </button><GoogleMap
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={ev => {
              console.log("latitide = ", ev.latLng.lat());
              console.log("longitude = ", ev.latLng.lng());
              () => setActiveMarker(null);
          } }
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
      >
              {NFT_1.map(({ id, name, telegram, pfp,twitter,base, position }) => (
                  <Marker
                    key={id}
                    position={position}
                    onClick={() => handleActiveMarker(id)}
                    icon={{
                        url: "https://ipfs.io/ipfs/QmZF9jMdNj2dwZJP2WdbeU4AVfc7K1ZhY9wbC14e3BDZi4/06660.png",
                        scaledSize: new google.maps.Size(50, 50),
                        shape:shape
                    }}
                  >
                    {activeMarker === id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>
                                <h3>{name}</h3>
                                <h1>Base: {base} </h1>
                                <a href={telegram}>Telegram</a>
                                <br></br>
                                <a href={twitter}>Twitter</a>
                            </div>
                        </InfoWindow>
                    ) : null}
                  </Marker>
              ))}
          </GoogleMap></>
  ):<></>
}

export default Map;