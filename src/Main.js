
import React, { useState, useEffect } from "react";
import Home from "./Home";
import Event from "./Event";
import Docs from "./Docs";
import Contact from "./Contact";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
  } from "react-google-maps";
  import mapStyles from './mapStyles'
  import * as parkData from "./data/parkData.json";
  
  
  function Map() {
    const [selectedPark, setSelectedPark] = useState(null);
  
    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") {
          setSelectedPark(null);
        }
      };
      window.addEventListener("keydown", listener);
  
      return () => {
        window.removeEventListener("keydown", listener);
      };
    }, []);
  

    return (
      <GoogleMap
        defaultZoom={19}
        defaultCenter={{ lat: 43.6561, lng: -79.3802}}
        options={{ styles: mapStyles }}
      >
        {parkData.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            position={{
              lat: park.geometry.coordinates[1],
              lng: park.geometry.coordinates[0]
            }}
            onClick={() => {
              setSelectedPark(park);
            }}
            icon={{
              url:  "https://img.icons8.com/color/48/000000/map-pin.png",
              scaledSize: new window.google.maps.Size(50, 50)
            }}
          />
        ))}
  
        {selectedPark && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedPark(null);
            }}
            position={{
              lat: selectedPark.geometry.coordinates[1],
              lng: selectedPark.geometry.coordinates[0]
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      
    );
  }
  
  const MapWrapped = withScriptjs(withGoogleMap(Map));
  
  export default function Main() {
    return (
        <HashRouter>
        <div>
          <h1>Google Maps Integration using ReactJS</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/event">Event</NavLink></li>
            <li><NavLink to="/docs">Docs</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Route path="/" component={Home}/>
            <Route path="/event" component={Event}/>
            <Route path="/docs" component={Docs}/>
            <Route path="/contact" component={Contact}/>
          </div>
        </div>
    
  
      <div style={{ width: "97vw", height: "100vh" }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAzo9Xzk5QwuAixqF8Kxdxp1zgMfL2DtKA&v=3.exp&libraries=geometry,drawing,places}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
      </HashRouter>
    
      );
}
  