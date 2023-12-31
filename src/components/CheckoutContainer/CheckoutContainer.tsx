import { useContext } from 'react';

import './CheckoutContainer.scss';
import { AddedContext } from '../../context/AddedContext';

export const CheckoutContainer = () => {
  const { cartProducts, setIsCheckout } = useContext(AddedContext);

  const totalAmount = cartProducts
    .reduce((accumulator, { quantity }) => accumulator + quantity, 0);

  const totalPrice = cartProducts
    .reduce((accumulator, { quantity, product }) => {
      return accumulator + quantity * product.price;
    }, 0);

  return (
    <div className="checkout-container">
      <span className="checkout-container__price">{`$${totalPrice}`}</span>

      <span className="checkout-container__total" data-cy="productQauntity">
        {`Total for ${totalAmount} items`}
      </span>

      <hr className="checkout-container__line" />

      <button
        className="checkout-container__button"
        type="button"
        onClick={() => setIsCheckout(true)}
      >
        Checkout
      </button>
    </div>
  );
};
