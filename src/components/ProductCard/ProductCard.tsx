import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Properties } from '../../data/properties';
import favouriteIcon from '../../images/favourites.svg';
import favouriteIconSelected from '../../images/favourites-selected.svg';
import { CurrentProductsContext } from '../../context/CurrentProductsContext';
import { handleAdd, handleDelete } from '../../helpers/cartHelper';
import {
  handleAdd as handleAddFav,
  handleDelete as handleDeleteFav,
} from '../../helpers/favHelper';
import { UniversalProduct } from '../../types/Cart';
import { AddedContext } from '../../context/AddedContext';
import './ProductCard.scss';

type Props = {
  product: UniversalProduct;
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
  const {
    cartProducts,
    setCartProducts,
    favProducts,
    setFavProducts,
  } = useContext(AddedContext);
  const [isAddedCart, setIsAddedCart] = useState(false);
  const [isAddedFav, setIsAddedFav] = useState(false);

  useEffect(() => {
    const isAddCart = cartProducts
      .find(({ product: curProduct }) => curProduct.itemId === itemId);
    const isAddFav = favProducts
      .find(({ itemId: id }) => id === itemId);

    setIsAddedCart(!!isAddCart);
    setIsAddedFav(!!isAddFav);
  });

  const handleAddToCart = () => handleAdd({
    setIsAdded: setIsAddedCart,
    product,
    setCartProducts,
  });

  const handleDeleteFromCart = () => handleDelete({
    setIsAdded: setIsAddedCart,
    product,
    setCartProducts,
  });

  const handleAddToFav = () => handleAddFav({
    setIsAdded: setIsAddedFav,
    product,
    setFavProducts,
  });

  const handleDeleteFromFav = () => handleDeleteFav({
    setIsAdded: setIsAddedFav,
    product,
    setFavProducts,
  });

  return (
    <div className="phone-card" data-cy="cardsContainer">
      <Link
        to={`/${category}/${itemId}`}
        state={{ search: searchParams.toString() }}
      >
        <img
          src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
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
        {isAddedCart ? (
          <button
            type="button"
            className="
              phone-card__cart-button
              phone-card__cart-button--selected
              "
            onClick={handleDeleteFromCart}
          >
            Added to cart
          </button>
        ) : (
          <button
            type="button"
            className="phone-card__cart-button"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        )}

        {isAddedFav ? (
          <button
            data-cy="addToFavorite"
            type="button"
            className="phone-card__favourite-button"
            onClick={handleDeleteFromFav}
          >
            <img src={favouriteIconSelected} alt="favourite icon" />
          </button>
        ) : (
          <button
            type="button"
            className="phone-card__favourite-button"
            onClick={handleAddToFav}
          >
            <img src={favouriteIcon} alt="favourite icon" />
          </button>
        )}
      </div>
    </div>
  );
};
