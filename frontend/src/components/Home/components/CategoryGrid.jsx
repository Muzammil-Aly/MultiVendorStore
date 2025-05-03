import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useApi } from "../../ContextProvider/ApiContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
const CategoryGridSlider = () => {
  const { getAllStoreProducts } = useApi();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllStoreProducts()
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, []);

  console.log("category Products", products);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="bg-white py-12 px-6 md:px-16">
      <h2 className="text-3xl font-semibold text-gray-900 text-center mb-10 border-b-2 border-gray-200 pb-4 w-fit mx-auto">
        What's New
      </h2>

      {error && <p className="text-center text-red-500">{error}</p>}

      <Slider {...settings}>
        {products.map((cat, index) => (
          <Link to={`/post/${cat._id}`} className="no-underline text-inherit">
            <div key={index} className="px-2">
              <div className="group bg-white border rounded-xl shadow-sm hover:shadow-lg overflow-hidden transition-shadow duration-300">
                <div className="overflow-hidden">
                  <img
                    src={cat.productImage}
                    alt={cat.name}
                    className="w-full h-[550px] object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryGridSlider;
