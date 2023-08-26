import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import './Navbar.scss';
import home from '../../images/home.svg';
import { CurrentProductsContext } from '../../helpers/CurrentProductsContext';

export const Navbar = () => {
  const { location } = useContext(CurrentProductsContext);
  const currentLocation = location.split('/');

  return (
    <div className="navbar">
      <NavLink className="navbar__home" to="/">
        <img src={home} alt="home" />
      </NavLink>

      {currentLocation.map((path, id) => {
        let link = path;

        if (link.includes('-')) {
          link = link.replaceAll('-', ' ');
        }

        return (
          <div key={path} className="navbar__wrapper">
            <div className="navbar__arrow" />

            {id === currentLocation.length - 1
              ? (
                <div className="navbar__caption">{link}</div>
              )
              : (
                <NavLink className="navbar__link" to={`/${link}`}>
                  {link}
                </NavLink>
              )}
          </div>
        );
      })}
    </div>
  );
};
