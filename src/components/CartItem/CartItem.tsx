import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Cart } from '../../types/Cart';
import { OperationOptions } from '../../data/operation-options';
import './CartItem.scss';
import { AddedContext } from '../../context/AddedContext';

type Props = {
  cartItem: Cart;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { setCartProducts } = useContext(AddedContext);

  const { id, quantity, product } = cartItem;
  const {
    image,
    name,
    price,
    category,
    itemId,
  } = product;

  const handleDelete = () => setCartProducts((prevProducts: Cart[]) => {
    const index = prevProducts
      .findIndex(({ product: prevProduct }) => prevProduct.itemId === itemId);

    return [
      ...prevProducts.slice(0, index),
      ...prevProducts.slice(index + 1),
    ];
  });

  const handleReduce = (operation: OperationOptions) => {
    setCartProducts(curProducts => {
      const newProducts = [...curProducts];

      const index = curProducts
        .findIndex(({ product: prevProduct }) => prevProduct.itemId === itemId);

      newProducts
        .splice(index, 1, { id, quantity: quantity + operation, product });

      return newProducts;
    });
  };

  return (
    <div className="cart-item">
      <button
        data-cy="cartDeleteButton"
        className="cart-item__delete"
        type="button"
        aria-label="delete"
        onClick={handleDelete}
      />

      <Link to={`/${category}/${itemId}`} className="cart-item__image-wrapper">
        <img
          src={`_new/${image}`}
          alt={`${id}`}
          className="cart-item__image"
        />
      </Link>

      <p className="cart-item__title">{name}</p>

      <div className="cart-item__reducer reducer">
        <button
          className={classNames(
            'reducer__button',
            'reducer__button--subtract',
            { 'reducer__button--subtract-inactive': quantity === 1 },
          )}
          type="button"
          aria-label="subtract"
          onClick={() => handleReduce(OperationOptions.SUBTRACTION)}
          disabled={quantity === 1}
        />

        <span className="reducer__quantity">{quantity}</span>

        <button
          className={classNames(
            'reducer__button',
            'reducer__button--add',
            { 'reducer__button--add-inactive': quantity === 100 },
          )}
          type="button"
          aria-label="add"
          onClick={() => handleReduce(OperationOptions.ADD)}
          disabled={quantity === 100}
        />
      </div>

      <h2 className="cart-item__price">{`$${price * quantity}`}</h2>
    </div>
  );
};
