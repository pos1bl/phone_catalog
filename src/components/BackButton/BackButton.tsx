import { Link, useLocation } from 'react-router-dom';

import arrowLeft from '../../images/arrows/arrow-left.svg';
import './BackButton.scss';

export const BackButton = () => {
  const { state } = useLocation();

  return (
    <Link
      to={{ pathname: '..', search: state?.search }}
      data-cy="backButton"
      className="back-button"
    >
      <img
        src={arrowLeft}
        alt="back"
        className="back-button__image"
      />

      <span className="back-button__caption">
        Back
      </span>
    </Link>
  );
};
