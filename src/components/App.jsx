import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Audio } from 'react-loader-spinner';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button'; 
import Modal from './Modal'; 

import { fetchImages } from '../API'; 

import '../App.css';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    query: '',
    showModal: false,
    largeImageURL: '',
    page: 1, 
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {

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

    fetchImages(query, page)
      .then(images => {
        if (images.length === 0) {
          toast.error(`No images found for ${query}`);
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
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
    const showLoadMoreButton = images.length >= 12;
  
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
  
        {showLoadMoreButton && !isLoading && (
          <Button onClick={this.fetchImages} />
        )}
  
        {showModal && (
          <Modal
            src={largeImageURL}
            alt="Large Image"
            onClose={this.closeModal}
          />
        )}
  
        <ToastContainer autoClose={3000} position="top-right" />
      </div>
    );
  }  
}

export default App;
