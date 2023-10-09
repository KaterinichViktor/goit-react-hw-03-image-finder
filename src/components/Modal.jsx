import React, { useEffect, useRef } from 'react';

const Modal = ({ src, alt, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal-container">
      <div className="modal" ref={modalRef}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
