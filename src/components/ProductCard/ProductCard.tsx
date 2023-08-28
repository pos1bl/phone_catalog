import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Properties } from '../../helpers/data/properties';
import { Product } from '../../types/Product';
import favouriteIcon from '../../images/favourites.svg';
import './ProductCard.scss';
import {
  CurrentProductsContext,
} from '../../helpers/context/CurrentProductsContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    itemId,
    name,
    fullPrice,
    price,
    image,
    category,
  } = product;

  const { searchParams } = useContext(CurrentProductsContext);

  return (
    <div className="phone-card" data-cy="cardsContainer">
      <Link
        to={`/${category}/${itemId}`}
        state={{ search: searchParams.toString() }}
      >
        <img
          src={`_new/${image}`}
          alt={itemId}
          className="phone-card__image"
        />

        <h3 className="phone-card__title">
          {name}
        </h3>

        <div className="phone-card__price-container price-container">
          <h2 className="price-container__current-price">
            {`$${price}`}
          </h2>

          <h2 className="price-container__full-price">
            {`$${fullPrice}`}
          </h2>
        </div>
      </Link>

      <hr className="phone-card__line" />

      <ul className="phone-card__propeties">
        {Object.values(Properties).map(property => (
          <li
            className="
              phone-card__property-container
              property-container
            "
            key={property}
          >
            <span className="property-container__property">
              {property}
            </span>

            <span className="property-container__value">
              {product[property]}
            </span>
          </li>
        ))}
      </ul>

      <div className="phone-card__buttons">
        <button
          type="button"
          className="phone-card__cart-button"
        >
          Add to cart
        </button>

        <button
          type="button"
          className="phone-card__favourite-button"
        >
          <img src={favouriteIcon} alt="favourite icon" />
        </button>
      </div>
    </div>
  );
};
