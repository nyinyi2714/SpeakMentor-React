import Modal from 'react-modal'
import './ModalComponent.css'
import React from 'react';

export default function ModalComponent({ saveCurrConversation, isOpen, onRequestClose, children }) {
  const customStyles = {
    content: {
      width: "max-content",
      height: 'min-content',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: "2rem",
      gap: '1rem',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '30',
    },
    overlay: {zIndex: 30}
  };

  return (
    <Modal
      appElement={document.getElementById('root')}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      {children}
      <div className="modal-btn-container">
        <button onClick={saveCurrConversation} className='modal-close-btn save'>Save</button>
        <button onClick={onRequestClose} className='modal-close-btn'>Cancel</button>
      </div>

    </Modal>
  );
}