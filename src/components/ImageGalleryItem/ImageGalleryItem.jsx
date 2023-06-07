import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ image, alt, largeImage, onSubmit }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => onSubmit(largeImage)}>
      <img
        loading="lazy"
        className={css.ImageGalleryItemImage}
        src={image}
        alt={alt}
        width="360px"
      />
    </li>
  );
};
