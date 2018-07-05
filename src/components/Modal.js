import React from 'react'

const Modal = ({ children, onClose, visible }) => (
  <div className='app_modal' style={{ display: (visible? 'block' : 'none') }}>
    <div className='app_modal-content' onClick={ onClose }>
      <span className='app_modal-close'>&times;</span>
      {children}
    </div>
</div>
)

export default Modal
