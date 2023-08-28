import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import './BreadCrumbs.scss';
import home from '../../images/home.svg';
import {
  CurrentProductsContext,
} from '../../helpers/context/CurrentProductsContext';

export const BreadCrumbs = () => {
  const { location } = useContext(CurrentProductsContext);
  const currentLocation = location.split('/');

  return (
    <div className="bread-crumbs" data-cy="breadCrumbs">
      <NavLink className="bread-crumbs__home" to="/">
        <img src={home} alt="home" />
      </NavLink>

      {currentLocation.map((path, id) => {
        let link = path;

        if (link.includes('-')) {
          link = link.replaceAll('-', ' ');
        }

        return (
          <div key={path} className="bread-crumbs__wrapper">
            <div className="bread-crumbs__arrow" />

            {id === currentLocation.length - 1
              ? (
                <div className="bread-crumbs__caption">{link}</div>
              )
              : (
                <NavLink className="bread-crumbs__link" to={`/${link}`}>
                  {link}
                </NavLink>
              )}
          </div>
        );
      })}
    </div>
  );
};
