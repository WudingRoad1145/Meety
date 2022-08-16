import React, { memo, useContext, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import MapStyle from './map.module.css'
//import { updateUserMarker } from '../../store/deliveryActions'

function success(pos) {
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

function GoogleMapBox() {
  //const [mapRef, setMapRef] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAIJx9hwjxcmt2-VjyW5MCxwPqlVvTW51w"
  })

  //onLoad={map => setMapRef(map)}
  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerClassName={MapStyle.box}
        center={navigator.geolocation.getCurrentPosition(success)}
        zoom={15}
        clickableIcons={false}
        onClick={(e) => console.log(e.latLng)}
        options={{
          "gestureHandling": "cooperative",
          streetViewControl: false
        }}
      >
        <Marker
          position={navigator.geolocation.getCurrentPosition(success)}
          draggable={true}
          //onDragEnd={(e) => dispatch(updateUserMarker(e.latLng))}
        />

        <Marker
          position={{ lat:-13.07823, lng:-76.38772 }}
          draggable={false}
          icon={{
            url: "https://ipfs.io/ipfs/QmZF9jMdNj2dwZJP2WdbeU4AVfc7K1ZhY9wbC14e3BDZi4/06660.png",
          }}
        />
        <Marker
          position={{"lat": -13.4176305, "lng": -76.1319676 }}
          draggable={false}
          icon={{
            url: "https://ipfs.io/ipfs/QmZF9jMdNj2dwZJP2WdbeU4AVfc7K1ZhY9wbC14e3BDZi4/06660.png",
          }}
        />
        <Marker
          position={{"lat": -14.0738371, "lng": -75.7276072 }}
          draggable={false}
          icon={{
            url: "https://ipfs.io/ipfs/QmZF9jMdNj2dwZJP2WdbeU4AVfc7K1ZhY9wbC14e3BDZi4/06660.png",
          }}
        />

      </GoogleMap>
    )
  }

  return isLoaded ? renderMap() : <></>
}

export default memo(GoogleMapBox);