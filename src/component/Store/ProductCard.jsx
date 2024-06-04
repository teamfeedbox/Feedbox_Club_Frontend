import React, { useState, useEffect } from "react";
// import image from "./image.png";
import EditModal from "./EditModal";
import "./ProductCard.css";
import Vibrant from "node-vibrant";
import Swal from "sweetalert2";

const ProductCard = ({ product, setProducts, products, id, colo, productsList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonColor, setButtonColor] = useState("#000"); // Default color

  const handleDeleteClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this resource?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteCall = await fetch(
          `https://club-community-feedbox2-0-sdcn-f4nbfkrt9-feedboxs-projects.vercel.app/merchandise/product/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );

        const response = await deleteCall.json();
        console.log(response);

        const updatedData = products.filter((item) => {
          return item._id !== id;
        });

        setProducts([...updatedData]);

        Swal.fire("Deleted!", response, "success");
      }
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" style={{border: "2px dashed", borderColor : colo, backgroundColorbackgroundColor: "#fff",}}>
        <img
          src={product.imageUrl}
          alt="Product"
          className="h-80 w-72 object-fill rounded-t-xl"
        />
        <div className="px-4 py-2 w-72">
          <p className="text-lg font-bold text-black truncate block capitalize">
            {product.name}
          </p>
          <div className="flex items-center">
            <p className="text-sm text-gray-600 cursor-auto ml-0">
              <span className="material-symbols-outlined relative top-[.7vh] mr-1">
                ₹
              </span>
              {product.price}{" "}
            </p>
            <div className="ml-auto flex gap-2">
              <button onClick={openModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#E57373"
                    d="M42.583,9.067l-3.651-3.65c-0.555-0.556-1.459-0.556-2.015,0l-1.718,1.72l5.664,5.664l1.72-1.718C43.139,10.526,43.139,9.625,42.583,9.067"
                  ></path>
                  <path
                    fill="#FF9800"
                    d="M4.465 21.524H40.471999999999994V29.535H4.465z"
                    transform="rotate(134.999 22.469 25.53)"
                  ></path>
                  <path
                    fill="#B0BEC5"
                    d="M34.61 7.379H38.616V15.392H34.61z"
                    transform="rotate(-45.02 36.61 11.385)"
                  ></path>
                  <path
                    fill="#FFC107"
                    d="M6.905 35.43L5 43 12.571 41.094z"
                  ></path>
                  <path
                    fill="#37474F"
                    d="M5.965 39.172L5 43 8.827 42.035z"
                  ></path>
                </svg>
              </button>
              <button onClick={handleDeleteClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#9575CD"
                    d="M34,12l-6-6h-8l-6,6h-3v28c0,2.2,1.8,4,4,4h18c2.2,0,4-1.8,4-4V12H34z"
                  ></path>
                  <path
                    fill="#7454B3"
                    d="M24.5 39h-1c-.8 0-1.5-.7-1.5-1.5v-19c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5v19C26 38.3 25.3 39 24.5 39zM31.5 39L31.5 39c-.8 0-1.5-.7-1.5-1.5v-19c0-.8.7-1.5 1.5-1.5l0 0c.8 0 1.5.7 1.5 1.5v19C33 38.3 32.3 39 31.5 39zM16.5 39L16.5 39c-.8 0-1.5-.7-1.5-1.5v-19c0-.8.7-1.5 1.5-1.5l0 0c.8 0 1.5.7 1.5 1.5v19C18 38.3 17.3 39 16.5 39z"
                  ></path>
                  <path
                    fill="#B39DDB"
                    d="M11,8h26c1.1,0,2,0.9,2,2v2H9v-2C9,8.9,9.9,8,11,8z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={product}
        setProducts={setProducts}
        products={products}
        id={id}
      />
    </>
  );
};

export default ProductCard;
