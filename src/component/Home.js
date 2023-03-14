import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartAdded } from '../redux/carts/action';
import AddProduct from './AddProduct';

export default function Home({ innerRef }) {
  const newState = useSelector((state) => state);

  const dispatch = useDispatch();

  function handleAddToCart(cartId, quantity, count) {
    if (quantity > 0) {
      dispatch(cartAdded(cartId, Number(quantity), Number(count)));
    }
  }

  return (
    <main className="py-16 block" ref={innerRef}>
      <div className="productWrapper">
        {/* <!-- products container --> */}
        {!newState.length ? (
          <div className="font-bold mt-4">No product added</div>
        ) : (
          <div className="productContainer" id="lws-productContainer">
            {/* <!-- product item --> */}
            {newState?.map((cart) => (
              <div className="lws-productCard" key={cart.id}>
                <img className="lws-productImage" src={cart.imageUrl} alt="product" />
                <div className="p-4 space-y-2">
                  <h4 className="lws-productName">{cart.productName}</h4>
                  <p className="lws-productCategory">{cart.category}</p>
                  <div className="flex items-center justify-between pb-2">
                    <p className="productPrice">
                      BDT <span className="lws-price">{cart.price}</span>
                    </p>
                    <p className="productQuantity">
                      QTY <span className="lws-quantity">{cart.quantity}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="lws-btnAddToCart"
                    onClick={() => handleAddToCart(cart.id, cart.quantity, cart.count)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
            {/* <!-- product item ends --> */}
          </div>
        )}

        <AddProduct />
      </div>
    </main>
  );
}
