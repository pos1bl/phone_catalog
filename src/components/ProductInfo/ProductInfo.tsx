import { useContext, useEffect, useState } from 'react';

import { ProductDetails } from '../../types/ProductDetails';
import { Capacity } from '../Capacity/Capacity';
import { Colors } from '../Colors/Colors';
import favouriteIcon from '../../images/favourites.svg';
import favouriteIconSelected from '../../images/favourites-selected.svg';
import { MainProperties } from '../MainProperties/MainProperties';
import { Properties } from '../../types/Properties';
import { CartContext } from '../../helpers/context/CartContext';
import { handleAdd, handleDelete } from '../../helpers/cartHelper';
import { UniversalProduct } from '../../types/Cart';
import { FavContext } from '../../helpers/context/FavContext';
import {
  handleAdd as handleAddFav,
  handleDelete as handleDeleteFav,
} from '../../helpers/favHelper';
import './ProductInfo.scss';

type Props = {
  product: ProductDetails;
};

export const ProductInfo: React.FC<Props> = ({ product }) => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { favProducts, setFavProducts } = useContext(FavContext);
  const [isAddedCart, setIsAddedCart] = useState(false);
  const [isAddedFav, setIsAddedFav] = useState(false);

  const {
    id,
    name,
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    images,
  } = product;

  const mainProperties: Properties = {
    screen,
    resolution,
    processor,
    ram,
  };

  const universalProduct: UniversalProduct = {
    category: 'phones',
    itemId: id,
    name,
    fullPrice: priceRegular,
    price: priceDiscount,
    screen,
    capacity,
    color,
    ram,
    image: images[0],
  };

  useEffect(() => {
    const isAddCart = cartProducts
      .find(({ product: curProduct }) => curProduct.itemId === id);
    const isAddFav = favProducts
      .find(({ itemId }) => itemId === id);

    setIsAddedCart(!!isAddCart);
    setIsAddedFav(!!isAddFav);
  });

  const handleDeleteFromCart = () => handleDelete({
    setIsAdded: setIsAddedCart,
    product: universalProduct,
    setCartProducts,
  });
  const handleAddToCart = () => handleAdd({
    setIsAdded: setIsAddedCart,
    product: universalProduct,
    setCartProducts,
  });

  const handleAddToFav = () => handleAddFav({
    setIsAdded: setIsAddedFav,
    product: universalProduct,
    setFavProducts,
  });

  const handleDeleteFromFav = () => handleDeleteFav({
    setIsAdded: setIsAddedFav,
    product: universalProduct,
    setFavProducts,
  });

  return (
    <div className="product-info">
      <section className="product-info__colors">
        <Colors
          colors={colorsAvailable}
          currentColor={color}
        />
      </section>

      <hr className="product-info__line" />

      <section className="product-info__capacity">
        <Capacity
          capacities={capacityAvailable}
          currentCapacity={capacity}
        />
      </section>

      <hr className="product-info__line product-info__line--bottom" />

      <section className="product-info__price-container">
        <h1 className="product-info__current-price">{`$${priceDiscount}`}</h1>

        <span className="product-info__full-price">{`$${priceRegular}`}</span>
      </section>

      <section className="product-info__buttons">
        {isAddedCart ? (
          <button
            type="button"
            className="
              product-info__cart-button
              product-info__cart-button--selected
              "
            onClick={handleDeleteFromCart}
          >
            Added to cart
          </button>
        ) : (
          <button
            type="button"
            className="product-info__cart-button"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        )}

        {isAddedFav ? (
          <button
            type="button"
            className="product-info__favourite-button"
            data-cy="addToFavorite"
            onClick={handleDeleteFromFav}
          >
            <img src={favouriteIconSelected} alt="favourite icon" />
          </button>
        ) : (
          <button
            type="button"
            className="product-info__favourite-button"
            onClick={handleAddToFav}
          >
            <img src={favouriteIcon} alt="favourite icon" />
          </button>
        )}
      </section>

      <section className="product-info__main-properties">
        <MainProperties properties={mainProperties} />
      </section>
    </div>
  );
};
