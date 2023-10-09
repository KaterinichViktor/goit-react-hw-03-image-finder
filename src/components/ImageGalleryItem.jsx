import React from 'react';

const ImageItem = ({ image, onImageClick }) => (
    <li className="image-item">
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="image"
        onClick={() => onImageClick(image.largeImageURL)}
      />
    </li>
  );
  

export default ImageItem;
