import React, { useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

const Product = ({ product, colors }) => {
  return (
    <>
      <Card style={{ width: '16rem', height: '25.125rem', borderColor : `${colors}`, borderStyle: 'dashed', borderRadius: '30px' }} className="py-0 px-0 mx-5 mt-5 border-2 border-dashed">
        <Card.Img variant="top" src={product.imageUrl} className=" md:h-[50vh] sm:h-[75vh]" style={{borderTopLeftRadius: '30px', borderTopRightRadius: '30px', width: '18rem', height : '15.56rem'}}/>
        <Card.Body>
          <Card.Title><span className="font-normal">Product Name : </span><span>{product.name}</span></Card.Title>
          {console.log(product)}
          <Link to={`product/${product._id}`} path={`{product.name}`} className="no-underline">
            <div
              className="mask"
              
            >
              <h5 style={{color : "brown"}}>
                  &#8377; {product.price}
              </h5>
              <div className="d-flex justify-content-start align-items-start h-100">

              </div>
            </div>
            <div className="hover-overlay">
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </div>
          </Link>
        </Card.Body>
      </Card>

    </>
  );
};

export default Product;
