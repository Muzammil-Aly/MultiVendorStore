import React, { useEffect, useState } from "react";
import { useApi } from "../../ContextProvider/ApiContext";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { getAllProducts } = useApi();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data.data); // Set products after confirming structure
      })
      .catch((err) => {
        setError("Something went wrong");
      });
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Featured Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((prod, idx) => (
          <Link to={`/post/${prod._id}`} className="no-underline text-inherit">
            <div key={idx} className="border rounded-md overflow-hidden group">
              <img
                src={prod.productImage}
                alt={prod.name}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
