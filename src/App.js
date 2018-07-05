import React, { Component } from 'react';
import axios from 'axios'

import { MapWrapper, Locations, SearchTextInput, Modal, Nav, LocationItem} from './components'
import defaultLocations from './catalog/locations'
import { GOOGLE_API_KEY } from './config'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      locations: [...defaultLocations],
      showModal: false,
      isFetching: false,
      selectedLocation: null,
      hasFetchError: false,
      locationAddress: '',
      locationPlaceId: '',
      locationIcon: '',
      locationRating: ''
    }
    this.onLocationMarkerClick = this.onLocationMarkerClick.bind(this)
    this.filterLocations = this.filterLocations.bind(this)
    this.onLocationItemClick = this.onLocationItemClick.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  filterLocations(e) {
    const filter = e.target.value.toUpperCase()
    const locations = defaultLocations.filter(l => l.name.toUpperCase().includes(filter))
    this.setState({ locations })
  }

  onLocationMarkerClick(props) {
    const { name, position: { lat, lng }} = props
    this.setState({ selectedLocation: { name, lat, lng } })
    this.fetchAndDisplayLocationDetails(name, lat, lng)
  }

  onLocationItemClick(location, e) {
    const { name, lat, lng } = location
    this.setState({ selectedLocation: { name, lat, lng } })
    this.fetchAndDisplayLocationDetails(name, lat, lng)
  }

  closeModal() {
    this.setState({
      showModal: false, selectedLocation: null, isFetching: false, hasFetchError: false,
      locationAddress: '', locationPlaceId: '', locationIcon: '', locationRating: ''
    })
  }

  fetchAndDisplayLocationDetails(location) {
    this.setState({ isFetching: true, showModal: true })
    const endpoint = `/api/place/textsearch/json?query=${location}&key=${GOOGLE_API_KEY}`
    axios
      .get(endpoint)
      .then((res) => {
        const data = res.data.results[0]
        const locationAddress = data.formatted_address
        const locationPlaceId = data.place_id
        const locationIcon = data.icon
        const locationRating = data.rating
        this.setState({ isFetching: false, locationAddress, locationPlaceId, locationIcon, locationRating })
      })
      .catch((err) => {
        this.setState({ isFetching: false, hasFetchError: true })
      })
  }

  render() {
    const {
      locations, showModal, isFetching, selectedLocation, hasFetchError,
      locationAddress, locationPlaceId, locationIcon, locationRating
    } = this.state
    const locationName = selectedLocation === null ? '' : selectedLocation.name

    const locationItems = locations.map((l, i) => <LocationItem
      key={ i }
      location={ l }
      onClick={ (e) => {this.onLocationItemClick(l, e)}}
    />)
    return (
      <div>
        <Nav
          title='New York Maps'
        />
        <Modal
          visible={showModal}
          onClose={this.closeModal}
        >
          <h3 style={{ textAlign: 'center' }}><strong>{ locationName }</strong></h3>
          { isFetching ?
            <div className='progress'>
              <div className='progress-bar progress-bar-striped progress-bar-animated' style={{ width: '100%' }}>
                <span>Fetching details for <strong> { locationName } </strong>. Please wait. </span>
              </div>
            </div>:
            <div>
              {
                hasFetchError ? 
                <p style={{ color: 'red'}}> Oops! Something went wrong when fetching details for this location.</p>:
                <div style={{padding: '15px'}}>
                  <p><label>Formatted Address: </label> <strong>{ locationAddress }</strong></p>
                  <hr />
                  <p><label>Icon: </label> <img src={ locationIcon } width='20px' height='20px' alt='Location Icon'/></p>
                  <hr />
                  <p><label>Place ID: </label> <strong>{ locationPlaceId }</strong></p>
                  <hr />
                  <p><label>Rating: </label> <strong>{ locationRating }</strong></p>
                  <hr />
                </div>
              }
            </div>
          }
        </Modal>
        <div className='container-fluid'>
          <div className='row' style={{height: '92vh'}}>
            <div className='col-sm-3' style={{marginTop: '10px'}}>
              <SearchTextInput onChange={this.filterLocations} placeholder='Filter Locations'/>
              <Locations
                locationItems={locationItems}
              />
            </div>
            <div className='col-sm-9'>
              <MapWrapper 
                onLocationMarkerClick={this.onLocationMarkerClick}
                locations={locations}
                defaultLocation={{lat: 0, lng: 0}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
