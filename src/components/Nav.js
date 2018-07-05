import React from 'react'
import logo from '../logo.svg'

const Nav = ({title}) => (
  <nav className='navbar navbar-dark bg-dark'>
    <div className='navbar-brand' href='#'>
      <img
        src={logo}
        width='30' 
        height='30'
        style={{marginRight: '20px'}}
        className='d-inline-block align-top' 
        alt=''
      />
      <h4 style={{ display: 'inline', marginTop: '50px' }}>{title}</h4>
    </div>
</nav>
)

export default Nav
