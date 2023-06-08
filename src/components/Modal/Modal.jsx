import css from './Modal.module.css';
import * as basicLightbox from 'basiclightbox';

export const Modal = ({img}) => {
 	return basicLightbox
    .create(
      `
		  <div className={css.Overlay}>
        <div className={css.Modal}>
          <img src=${img} alt="Big img" />
        </div>
      </div>
	`
    )
    .show();
};
