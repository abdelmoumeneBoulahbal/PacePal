import React from 'react';
import './SuccessModal.css';
import success from '../../assets/icons/check.png'

const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="success-modal">
        <div className="modal-header">
          <img src={success} alt="" />
          <h3>Success</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="ok-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;