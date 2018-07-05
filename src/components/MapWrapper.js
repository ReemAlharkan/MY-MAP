import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

import { GOOGLE_API_KEY } from '../config'

class MapWrapper extends Component {
  static defaultProps = {
    center: { lat: 40.730610, lng: -73.935242 }, // new york
    zoom: 12
  }

  constructor(props) {
    super(props)
    this.state = {
      lat: 40.730610,
      lng: -70.935242,
      selectedPlace: 'No Where'
    }
  }

  render () {
    const { locations, onLocationMarkerClick } = this.props
    const markers = locations.map((location, i) => (
      <Marker
        key={ i }
        onClick={ onLocationMarkerClick }
        position={{ lat: location.lat, lng: location.lng }}
        name={ location.name }
      />)
    )
    const { google, center, zoom } = this.props
    return (
      <Map
        google={ google }
        style={{ width: '100%', height: '100%'}}
        zoom={ zoom  }
        initialCenter={ center }
      >
        { markers }
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapWrapper)
