import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Logo from '../asset/images/logo.png';
import Cart from './Cart';
import Home from './Home';

export default function FullBody() {
  const newState = useSelector((state) => state);
  const [allCarts, setAllCarts] = useState([]);

  useEffect(() => {
    if (newState.length) {
      setAllCarts(() => [...newState]);
    }
  }, [newState]);

  let totalCount;
  if (allCarts.length) {
    totalCount = allCarts?.reduce((sum, item) => sum + item.count, 0);
  }

  const homeRef = useRef();
  const cartRef = useRef();

  function showHome() {
    homeRef.current.classList.add('block');
    homeRef.current.classList.remove('hidden');
    cartRef.current.classList.add('hidden');
    cartRef.current.classList.remove('block');
  }

  function showCart() {
    homeRef.current.classList.add('hidden');
    homeRef.current.classList.remove('block');
    cartRef.current.classList.add('block');
    cartRef.current.classList.remove('hidden');
  }
  return (
    <>
      <nav className="bg-[#171C2A] py-4">
        <div className="navBar">
          <a href="/">
            <img src={Logo} alt="LWS" className="max-w-[140px]" />
          </a>

          <div className="flex gap-4">
            <button type="button" className="navHome" id="lws-home" onClick={showHome}>
              Home
            </button>
            <button type="button" className="navCart" id="lws-cart" onClick={showCart}>
              <i className="text-xl fa-sharp fa-solid fa-bag-shopping" />
              <span id="lws-totalCart">{totalCount}</span>
            </button>
          </div>
        </div>
      </nav>
      <Home innerRef={homeRef} />
      <Cart innerRef={cartRef} />
    </>
  );
}
