import React, { useEffect, useState } from "react";
import { useApi } from "../../ContextProvider/ApiContext";
import Slider from "react-slick";

// Import Slick Carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  const { getAllProducts } = useApi();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data.data); // Set products after confirming structure
        setLoading(false); // Don't forget to set loading to false here
      })
      .catch((err) => {
        setError("Something went wrong");
        setLoading(false); // Ensure loading is set to false in case of error
      });
  }, []);

  const settings = {
    dots: true, // Show dots navigation
    infinite: true, // Loop through slides
    speed: 500,
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1,
    autoplay: true, // Automatically move slides
    autoplaySpeed: 4000, // Set the autoplay speed
    pauseOnHover: true, // Pause on hover
    fade: true, // Apply fade transition between slides for a smoother effect
  };

  if (loading)
    return <p className="text-center text-white">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="hero-section relative overflow-hidden">
      {/* Full-width background with image */}
      <Slider {...settings}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((p) => (
            <div key={p._id} className="relative group">
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <div className="relative">
                  {/* Hero Image - Fully Visible */}
                  <img
                    src={p.productImage}
                    alt={p.title.shortTitle}
                    className="h-[500px] w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  {/* Overlay with Text and Button */}
                  <div className="absolute inset-0 flex justify-center items-center text-center text-white px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <div className="text-white max-w-lg space-y-4">
                      <h2 className="text-4xl font-extrabold">
                        {p.title.shortTitle}
                      </h2>
                      <p className="text-xl font-medium">Rs. {p.price.mrp}</p>
                      {/* Prominent Add to Bag Button */}
                      <button className="mt-6 px-16 py-6 text-white bg-indigo-700 hover:bg-indigo-800 rounded-full shadow-xl transform transition-all duration-300 ease-in-out hover:scale-110 text-lg font-semibold">
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No products available</p>
        )}
      </Slider>

      {/* Optional: Decorative Animation */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-40"></div>
    </div>
  );
};

export default HeroSection;
