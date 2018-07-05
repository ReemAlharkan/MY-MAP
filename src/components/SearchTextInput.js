import React from 'react'
import search from '../search.svg'

const SearchTextInput = ({ text, onChange, placeholder }) => (
  <div className='input-group mb-3'>
    <input
      type='text' 
      onChange={ onChange }
      className='form-control' 
      placeholder={ placeholder } 
      value={ text }
    />
    <div className='input-group-append'>
      <span className='input-group-text'>
        <img 
          src={ search }
          width='18'
          height='18px'
          alt='Search'/>
      </span>
    </div>
  </div>
)

export default SearchTextInput
