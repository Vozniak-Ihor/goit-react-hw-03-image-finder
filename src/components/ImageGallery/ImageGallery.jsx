import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import css from "./ImageGallery.module.css"
import api from '../service/image-service';

export class Gallery extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isEmpty: true,
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
      isEmpty: true,
      isVisible: false,
      error: null,
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
        }));
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoader: false, inactiveButton: false });
      });
  };

  onLoadeMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isEmpty, isVisible, error, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
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
          />
        )}
      </>
    );
  }
}

export default Gallery;
