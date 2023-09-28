import { useContext } from 'react';

import { CartItem } from '../CartItem/CartItem';
// import { AddedContext } from '../../context/CartContext';
import './CartContainer.scss';
import { AddedContext } from '../../context/AddedContext';

export const CartContainer = () => {
  const { cartProducts } = useContext(AddedContext);

  return (
    <ul className="cart-container">
      {cartProducts.map(cartProduct => (
        <li className="cart-container__item" key={cartProduct.id}>
          <CartItem cartItem={cartProduct} />
        </li>
      ))}
    </ul>
  );
};
