import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productAdded } from '../redux/carts/action';

export default function AddProduct() {
  const [nameProduct, setNameProduct] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const dispatch = useDispatch();

  function handleAddProduct(e) {
    e.preventDefault();
    dispatch(productAdded(nameProduct, category, imageUrl, price, quantity));
    setNameProduct('');
    setCategory('');
    setImageUrl('');
    setQuantity('');
    setPrice('');
  }

  return (
    <div>
      {/* <!-- Product Input Form --> */}
      <div className="formContainer">
        <h4 className="formTitle">Add New Product</h4>
        <form
          className="space-y-4 text-[#534F4F]"
          id="lws-addProductForm"
          onSubmit={handleAddProduct}
        >
          {/* <!-- product name --> */}
          <div className="space-y-2">
            <label htmlFor="name">Product Name</label>
            <input
              className="addProductInput"
              id="lws-inputName"
              type="text"
              value={nameProduct}
              onChange={(e) => setNameProduct(e.target.value)}
              required
            />
          </div>
          {/* <!-- product category --> */}
          <div className="space-y-2">
            <label htmlFor="category">Category</label>
            <input
              className="addProductInput"
              id="lws-inputCategory"
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          {/* <!-- product image url --> */}
          <div className="space-y-2">
            <label htmlFor="image">Image Url</label>
            <input
              className="addProductInput"
              id="lws-inputImage"
              type="text"
              required
              value={`${imageUrl}`}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          {/* <!-- price & quantity container --> */}
          <div className="grid grid-cols-2 gap-8 pb-4">
            {/* <!-- price --> */}
            <div className="space-y-2">
              <label htmlFor="price">Price</label>
              <input
                className="addProductInput"
                type="number"
                id="lws-inputPrice"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {/* <!-- quantity --> */}
            <div className="space-y-2">
              <label htmlFor="quantity">Quantity</label>
              <input
                className="addProductInput"
                type="number"
                id="lws-inputQuantity"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          {/* <!-- submit button --> */}
          <button type="submit" id="lws-inputSubmit" className="submit">
            Add Product
          </button>
        </form>
      </div>
      {/* <!-- Product Input Form Ends --> */}
    </div>
  );
}
