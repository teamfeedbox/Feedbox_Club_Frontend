
import React, { useEffect, useState } from "react";
import "./ProductList.css";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await fetch(
<<<<<<< HEAD
        "https://club-community-feedbox2-0-sdcn.vercel.app/merchandise/getallproducts"
=======
        `https://club-community-feedbox2-0-sdcn.vercel.app/merchandise/getallproducts`
>>>>>>> 7c82d27442a7e494d7a4da28c9c8f4883b300cf0
      );
      const data = await allProducts.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  let colorCodes = ["#EC722F", "#EC4884", "#3F7CD6", "#9747FF", "#B95E7D"];

  return (
    <section
      id="Projects"
      className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-[90px] mb-5"
    >
    {console.log(products, "LIST ALL PRODUCTS")}
      {products.map((product, index) => {
        const colorIndex = index % colorCodes.length;
        const colo = colorCodes[colorIndex];

        return (
          <>
          <ProductCard
            product={product}
            setProducts={setProducts}
            products={products} 
            id={product._id}
            colo={colo}
            productsList={products}
          />
          </>
        );
      })}
    </section>
  );
};
export default ProductList;
