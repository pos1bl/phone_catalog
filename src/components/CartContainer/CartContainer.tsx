import { useContext } from 'react';

import { CartContext } from '../../helpers/context/CartContext';
import { CartItem } from '../CartItem/CartItem';
import './CartContainer.scss';

export const CartContainer = () => {
  const { cartProducts } = useContext(CartContext);

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
