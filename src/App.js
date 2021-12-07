import axios from "axios";
import { useState, useEffect } from "react";

import './App.css';

function App() {
  const [state, setState] = useState({
    products: [],
    cart: [],
    total: 0
  });

  useEffect(() => {
    axios
      .get("https://web-ge8buw2ff-bird-and-be.vercel.app/api/interview")
      .then((res) => {
        setState({
          ...state,
          products: res.data.products
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // TODO: resolve dependency warning

  function addToCart(productId, price) {
    setState({
      ...state,
      cart: [...state.cart, productId],
      total: state.total + price
    });
  }

  function removeFromCart(productId, price) {
    setState({
      ...state,
      cart: state.cart.filter((product) => product !== productId),
      total: state.total - price
    });
  }

  return (
    <div>
      <div className="d-lg-flex p-2 justify-content-center">
        {state.products.map((product) => (
          <div className="product-card" key={product.id}>
            <div>
              <img
                src={product.primary_image.url_standard}
                alt={product.primary_image.description}
                className="product-img"
              />
            </div>
            <div>
              <h4>{product.name}</h4>
              <h3>${product.price}</h3>
              <div
                className="card-description"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
              {state.cart.includes(product.id) ? (
                <button
                  onClick={() => removeFromCart(product.id, product.price)}
                  className="btn btn-danger"
                >
                  Remove from cart
                </button>
              ) : (
                <button
                  onClick={() => addToCart(product.id, product.price)}
                  className="btn btn-primary"
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <h1>Total: ${state.total}</h1>
      </div>
    </div>
  );
}

export default App;
