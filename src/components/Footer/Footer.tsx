import { NavLink } from 'react-router-dom';

import './Footer.scss';
import logo from '../../images/logo.svg';
import arrowUp from '../../images/arrows/arrow-top.svg';

const handleClick = () => document.body.scrollIntoView({
  behavior: 'smooth',
});

export const Footer = () => (
  <div className="footer">
    <div className="footer__content">
      <div className="footer__logo">
        <NavLink className="logo" to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>

      <ul className="footer__list">
        <li className="footer__item">
          <a
            className="footer__link"
            href="https://github.com/pos1bl/react_phone-catalog"
          >
            Github
          </a>
        </li>

        <li className="footer__item">
          <a
            className="footer__link"
            href="https://github.com/pos1bl"
          >
            Contacts
          </a>
        </li>

        <li className="footer__item">
          <a
            className="footer__link"
            href="https://github.com/pos1bl"
          >
            Rights
          </a>
        </li>
      </ul>

      <button
        className="footer__button button"
        type="button"
        onClick={handleClick}
      >
        <span className="button__text">Back to top</span>

        <div className="button__image">
          <img src={arrowUp} alt="arrow up" />
        </div>
      </button>
    </div>
  </div>
);
