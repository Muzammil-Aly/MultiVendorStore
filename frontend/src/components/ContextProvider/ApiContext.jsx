import React, { createContext, useContext } from "react";
import axios from "axios";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const getAllProducts = () =>
    axios.get("/api/v1/product/getSliderProducts?tagline=Title");
  const getProductById = () =>
    axios.get(`/api/v1/product/getProductById/${slug}`);

  const getAllStoreProducts = () => axios.get("/api/v1/product/getProducts");
  const addtoCart = (_id) => axios.post(`/api/v1/product/addToCart/${_id}`);
  const sellerCartDetails = () => axios.get("/api/v1/product/sellerOrders");

  return (
    <ApiContext.Provider
      value={{
        getAllProducts,
        getProductById,
        getAllStoreProducts,
        addtoCart,
        sellerCartDetails,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
