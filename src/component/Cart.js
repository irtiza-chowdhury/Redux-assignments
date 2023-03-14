import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartAdded, cartDeleted, decrementCount } from '../redux/carts/action';

export default function Cart({ innerRef }) {
  const newState = useSelector((state) => state);
  const [allCarts, setAllCarts] = useState([]);

  useEffect(() => {
    if (newState.length) {
      setAllCarts(() => [...newState]);
    }
  }, [newState]);

  const dispatch = useDispatch();

  let totalBill;
  if (newState.length) {
    totalBill = newState.reduce(
      (sumBill, cartItems) => sumBill + cartItems.count * cartItems.price,
      0
    );
  }

  const handleIncrementCount = (cartId, quantity, count) => {
    if (quantity > 0) {
      dispatch(cartAdded(cartId, quantity, count));
    }
  };
  const handleDecrementCount = (cartId, quantity, count) => {
    if (count >= 0) {
      dispatch(decrementCount(cartId, quantity, count));
    }
  };

  function handleCartDelete(itemID, count, quantity) {
    dispatch(cartDeleted(itemID, count, quantity));
  }
  return (
    <main className="py-16 hidden" ref={innerRef}>
      <div className="container 2xl:px-8 px-2 mx-auto">
        <h2 className="mb-8 text-xl font-bold">Shopping Cart</h2>
        <div className="cartListContainer">
          {!totalBill > 0 ? (
            <div className="font-bold mt-4">Please add product to cart.</div>
          ) : (
            <div className="space-y-6">
              {/* <!-- Cart Item --> */}
              {allCarts?.map((item) => (
                <div key={item.id}>
                  {item.count >= 1 && (
                    <div className="cartCard">
                      <div className="flex items-center col-span-6 space-x-6">
                        {/* <!-- cart image --> */}
                        <img className="lws-cartImage" src={item.imageUrl} alt="product" />
                        {/* <!-- cart item info --> */}
                        <div className="space-y-2">
                          <h4 className="lws-cartName">{item.productName}</h4>
                          <p className="lws-cartCategory">{item.category}</p>
                          <p>
                            BDT <span className="lws-cartPrice">{item.price}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0">
                        {/* <!-- amount buttons --> */}
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            className="lws-incrementQuantity"
                            onClick={() => handleIncrementCount(item.id, item.quantity, item.count)}
                          >
                            <i className="text-lg fa-solid fa-plus" />
                          </button>
                          <span className="lws-cartQuantity">{item.count}</span>
                          <button
                            type="button"
                            className="lws-decrementQuantity"
                            onClick={() => handleDecrementCount(item.id, item.quantity, item.count)}
                          >
                            <i className="text-lg fa-solid fa-minus" />
                          </button>
                        </div>
                        {/* <!-- price --> */}
                        <p className="text-lg font-bold">
                          BDT
                          <span className="lws-calculatedPrice">
                            {Number(item.count) * Number(item.price)}
                          </span>
                        </p>
                      </div>
                      {/* <!-- delete button --> */}
                      <div className="flex items-center justify-center col-span-2 mt-4 md:justify-end md:mt-0">
                        <button
                          type="button"
                          className="lws-removeFromCart"
                          onClick={() => {
                            setAllCarts(allCarts.filter(({ id }) => id !== item.id));
                            handleCartDelete(item.id, item.count, item.quantity);
                          }}
                        >
                          <i className="text-lg text-red-400 fa-solid fa-trash" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* <!-- Cart Items Ends --> */}
            </div>
          )}

          {/* <!-- Bill Details --> */}
          <div>
            <div className="billDetailsCard">
              <h4 className="mt-2 mb-8 text-xl font-bold text-center">Bill Details</h4>
              <div className="space-y-4">
                {/* <!-- sub total --> */}
                <div className="flex items-center justify-between">
                  <p>Sub Total</p>
                  <p>
                    BDT <span className="lws-subtotal">{totalBill} </span>
                  </p>
                </div>
                {/* <!-- Discount --> */}
                <div className="flex items-center justify-between">
                  <p>Discount</p>
                  <p>
                    BDT <span className="lws-discount">0</span>
                  </p>
                </div>
                {/* <!-- VAT --> */}
                <div className="flex items-center justify-between">
                  <p>VAT</p>
                  <p>
                    BDT <span className="vat">0</span>
                  </p>
                </div>
                {/* <!-- Total --> */}
                <div className="flex items-center justify-between pb-4">
                  <p className="font-bold">TOTAL</p>
                  <p className="font-bold">
                    BDT <span className="lws-total">{totalBill}</span>
                  </p>
                </div>
                <button type="button" className="placeOrderbtn">
                  place order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
