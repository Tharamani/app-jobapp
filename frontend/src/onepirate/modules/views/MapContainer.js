import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  div: {
    flex: 1,
    justifyContent: "center",
    margin: "50px",
    alignItems: "center",
    position: "absolute",
    width: "50px",
    height: "25px",
  },

  map: {
    flex: 1,
    width: "50px",
    height: "25px",
  },
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <div >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin:'100px',
          }}
        >
          <h1>ZenRays Technologies Pvt. Ltd.</h1>
          <p>
            No 393, 1st Floor, Guru Krupa 7th Cross Road, 8th Main Rd, Mico
            Layout, BTM 2nd Stage, Bengaluru, Karnataka 560076
          </p>
        </div>
        <div >
          <Map
            google={this.props.google}
            zoom={17}
            //   style={mapStyles}
            style={{ width: "100%", height: "500px"}}
            initialCenter={{
              lat: 12.913632569949442,
              lng: 77.60701744783356,
            }}
          >
             <Marker
              onClick={this.onMarkerClick}
              name={
                "ZenRays Technologies Pvt. Ltd. No 393, 1st Floor, Guru Krupa 7th Cross Road, 8th Main Rd, Mico Layout, BTM 2nd Stage, Bengaluru, Karnataka 560076"
              }
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </Map>
        </div>

       
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBMXBw6xR9Uftmmn2wyLkZzeVakpwLSi-Y",
})(MapContainer);
