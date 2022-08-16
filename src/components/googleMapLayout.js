import React, { Component } from 'react';
import { LoadScript } from '@react-google-maps/api';
//import { LIBRARIES } from '../../utils/utils';



function MapLayout({ children }) {
  //const librariez = LIBRARIES;

  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyAIJx9hwjxcmt2-VjyW5MCxwPqlVvTW51w"}
      //libraries={librariez}
    >
      { children }
    </LoadScript>
  )
}

export default MapLayout;