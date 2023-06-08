import css from './Button.module.css';
export const Button = ({ onLoadeMore, isLoading ,text}) => {
  return (
    <button
      className={css.Button}
      type="button"
      onClick={onLoadeMore}
      disabled={isLoading}
    >
      {text}
    </button>
  );
};
