import Gallery from './ImageGallery/ImageGallery';
import css from './App.module.css';

export const App = () => {
  return (
    <>
      <div className={css.App}>
        <Gallery></Gallery>
      </div>
    </>
  );
};
