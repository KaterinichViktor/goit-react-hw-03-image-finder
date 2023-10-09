import React from 'react';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className="image-gallery">
    {images.map(image => (
      <li
        key={image.id}
        className="image-item"
        onClick={() => onImageClick(image.largeImageURL)}
      >
        <img
          src={image.webformatURL}
          alt={image.tags}
          className="image"
        />
      </li>
    ))}
  </ul>
);

export default ImageGallery;
