import axios from "axios";
import { useState, useEffect } from "react";

import './App.css';

function App() {
  const [state, setState] = useState({
    products: [],
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
  }, []);

  return (
    <div>
      <div>
        {state.products.map((product) => (
          <div className="product-card" key={product.id}>
            <div>
              <img
                src={product.primary_image.url_standard}
                alt={product.primary_image.description}
              />
            </div>
            <div>
              <h4>{product.name}</h4>
              <h3>${product.price}</h3>
              <div
                className="card-description"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
              <a href="#" className="btn btn-primary">
                Add to cart
              </a>
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
