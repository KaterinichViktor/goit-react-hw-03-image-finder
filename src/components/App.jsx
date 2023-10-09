import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Audio } from 'react-loader-spinner';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button'; // Import your Button component
import Modal from './Modal'; // Import your Modal component

import { fetchImages } from '../API'; // Import the fetchImages function from your API file

import '../App.css'; // Import your CSS file for styling

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    query: '',
    showModal: false,
    largeImageURL: '',
    page: 1, // Add a page state to keep track of the current page
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      // If the query changes, reset the page number to 1
      this.setState({ page: 1 }, () => {
        this.fetchImages();
      });
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, images: [], error: null, page: 1 });
  };

  fetchImages = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    fetchImages(query, page) // Pass the page number to fetchImages
      .then(images => {
        if (images.length === 0) {
          toast.error(`No images found for ${query}`);
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1, // Increment the page number
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  openModal = (largeImageURL) => {
    console.log('Large Image URL:', largeImageURL);
    this.setState({ showModal: true, largeImageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { images, isLoading, error, showModal, largeImageURL } = this.state;

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 24,
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />

        {error && <p>Whoops, something went wrong: {error.message}</p>}

        <ImageGallery images={images} onImageClick={this.openModal} />

        {isLoading && (
          <Audio
            height={80}
            width={80}
            radius={9}
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle=""
            wrapperClass=""
          />
        )}

        {images.length > 0 && !isLoading && (
          <Button onClick={this.fetchImages} />
        )}

        {showModal && (
          <Modal
            src={largeImageURL} // Pass the largeImageURL as the src prop
            alt="Large Image" // Provide an alt text for the image
            onClose={this.closeModal}
          />
        )}

        <ToastContainer autoClose={3000} position="top-right" />
      </div>
    );
  }
}

export default App;
