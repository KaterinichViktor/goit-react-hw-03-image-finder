import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) { // Check if the click target is the modal container
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;

    return (
      <div className="modal-container" onClick={this.handleBackdropClick}> {/* Updated with onClick */}
        <div className="modal"> {/* Updated class name */}
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
