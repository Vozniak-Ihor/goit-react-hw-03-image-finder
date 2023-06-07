import css from './Button.module.css';
export const Button = ({onLoadeMore,isLoading})=> {
return (
  <button  className={css.Button} type="button" onClick={onLoadeMore} disabled={isLoading}>
    {isLoading ? 'Loading' : 'Show more'}
  </button>
);
}

