import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';
import api from '../service/image-service';

export class Gallery extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isEmpty: false,
    isVisible: false,
    error: null,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }

  onSubmit = value => {
    this.setState({
      images: [],
      query: value,
      page: 1,
      isEmpty: false,
      isVisible: false,
      error: null,
      isLoading: true,
      loader: true,
      showModal: false,
      largeImage: '',
    });
  };

  getPhotos = (query, page) => {
    api
      .fetchImages(query, page)
      .then(response => {
        return response.json();
      })
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          isEmpty: false,
          images: [...prevState.images, ...hits],
          showButton: page < Math.ceil(totalHits / 12),
          isVisible: true,
          isLoading: false,
        }));
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => {
        // loader: true,
        this.setState({ isLoader: false, loader: false });
      });
  };

  handleModalClick = largeImage => {
    this.setState({ largeImage, showModal: true });
    console.log(this.state.largeImage);
  };

  onLoadeMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, loader: true }));
  };

  onClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      images,
      isEmpty,
      isVisible,
      error,
      largeImage,
      isLoading,
      loader,
      showModal,
    } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {isEmpty && <b textAlign="center">Sorry. There are no images ... 😭</b>}
        {error && <b textAlign="center">Sorry.{error} 😭</b>}
        <ul className={css.ImageGallery}>
          {images.map(item => (
            <ImageGalleryItem
              key={item.id}
              image={item.webformatURL}
              alt={item.tags}
              largeImage={item.largeImageURL}
              handleClick={this.handleModalClick}
            />
          ))}
        </ul>
        {isVisible && (
          <Button
            onLoadeMore={this.onLoadeMore}
            isLoading={this.state.isLoading}
            text={isLoading ? 'Loading' : 'Show more'}
          />
        )}
        {loader && <Loader />}
        {showModal && <Modal largeImage={largeImage} onClose={this.onClose} />}
      </>
    );
  }
}

export default Gallery;
