import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useAuth from '../../hooks/useAuth';
import useFoods from '../../hooks/useFoods';
import CartItem from './CartItem';

function precisionRoundMod(number, precision) {
  var factor = Math.pow(10, precision);
  var n = precision < 0 ? number : 0.01 / factor + number;
  return Math.round(n * factor) / factor;
}

function Checkout() {
  const { user, address } = useAuth();
  const { cart, getFoodById, confirmOrder } = useFoods();

  // calculate total price
  const totalPrice = cart.reduce((acc, food) => {
    const foodItem = getFoodById(food.foodId);
    return acc + foodItem.price * food.quantity;
  }, 0);

  const handleToken = (token) => {
    confirmOrder();
  }

  return (
    <div className="card checkout">
      <div className="card-body">
        <h3 className="mb-3">Checkout</h3>
        <p>Name: {user?.displayName} </p>
        <p>Phone: {address.phone ? address.phone : '--------'} </p>
        <p>City: {address?.city ? address.city : '---------'} </p>
        <p>House / Flat No: {address?.house ? address.house : '---------'} </p>

        {cart?.map((food, index) => (
          <CartItem key={index} foodId={food.foodId} quantity={food.quantity} />
        ))}

        <p className="d-flex justify-content-between">
          <span>Total Price: </span>
          <span>${precisionRoundMod(totalPrice, 2)}</span>
        </p>

        <p className="d-flex justify-content-between">
          <span>Shipping Charge:</span>
          <span>${precisionRoundMod(totalPrice ? 10 : 0, 2)}</span>
        </p>

        <h5 className="d-flex justify-content-between mb-3">
          <span>Total Payable:</span>
          <span>${precisionRoundMod(totalPrice ? totalPrice + 10 : 0, 2)}</span>
        </h5>

        <StripeCheckout
          token={handleToken}
          currency='USD'
          amount={precisionRoundMod(totalPrice ? totalPrice + 10 : 0, 2)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          allowRememberMe
          name="FizzFood"
          description="Online Food Service"
          image="/favicon.ico"
          panelLabel="Pay "
        >
          <button
            className={`btn btn-custom ${
              !address || !cart.length ? 'disabled' : ''
            }`}
          >
            Pay
          </button>
        </StripeCheckout>
      </div>
    </div>
  );
}

export default Checkout;
