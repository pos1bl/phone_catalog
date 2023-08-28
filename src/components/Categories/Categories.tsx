import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import categoryImages from '../../helpers/data/categories-images';
import './Categories.scss';
import { ProductsContext } from '../../helpers/context/ProductsContext';

export const Categories = () => {
  const { phones, tablets, accessories } = useContext(ProductsContext);
  const { phonesImage, tabletsImage, accessoriesImage } = categoryImages;

  return (
    <div className="categories">
      <h1 className="categories__title">
        Shop by category
      </h1>

      <ul className="categories__list">
        <li className="categories__item">
          <NavLink className="categories__link" to="/phones">
            <div className="
              categories__image-wrapper
              categories__image-wrapper--phones
              "
            >
              <img
                className="categories__image categories__image--phones"
                src={phonesImage}
                alt={phonesImage}
              />
            </div>

            <h3 className="categories__caption">
              Mobile phones
            </h3>

            <p className="categories__amount">
              {`${phones.length} models`}
            </p>
          </NavLink>
        </li>

        <li className="categories__item">
          <NavLink className="categories__link" to="/tablets">
            <div className="
              categories__image-wrapper
              categories__image-wrapper--tablets
              "
            >
              <img
                className="categories__image categories__image--tablets"
                src={tabletsImage}
                alt={tabletsImage}
              />
            </div>

            <h3 className="categories__caption">
              Tablets
            </h3>

            <p className="categories__amount">
              {`${tablets.length} models`}
            </p>
          </NavLink>
        </li>

        <li className="categories__item">
          <NavLink className="categories__link" to="/accessories">
            <div className="
              categories__image-wrapper
              categories__image-wrapper--accessories
              "
            >
              <img
                className="categories__image categories__image--accessories"
                src={accessoriesImage}
                alt={accessoriesImage}
              />
            </div>

            <h3 className="categories__caption">
              Accessories
            </h3>

            <p className="categories__amount">
              {`${accessories.length} models`}
            </p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
