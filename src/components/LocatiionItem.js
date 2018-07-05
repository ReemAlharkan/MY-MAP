import React from 'react'

const LocationItem = ({ location, onClick }) => (
  <li
    onClick={ onClick }
    className='list-group-item list-group-item-action'
  >
    { location.name }
  </li>
)

export default LocationItem
