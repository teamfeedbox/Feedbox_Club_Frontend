import React, { useState } from 'react';
import { Modal, Button, Image, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

const BuyNow = ({ show, onHide, product, quantity }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    size: "",
    quantity: quantity
  });

  const [productCategory, setProductCategory] = useState("cloth"); // Example category

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission, for example, console log and clear form.
    console.log(formData);
    alert("Your order has been placed. Thanks!");

    setFormData({
      name: "",
      email: "",
      address: "",
      size: "",
      quantity: quantity
    });
    onHide(); // Hide modal after submission.
    
  };

  const printData = () => {
    onHide();
    alert("Your order are placed. Thanks !!!")
    console.log(formData)
  }

  const isFormIncomplete = formData.name === "" || formData.email === "" || formData.address === "" || (productCategory === "cloth" && formData.size === "");

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Image src={product.image} alt='img' fluid />
        <p>{product.description}</p>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Select value={quantity} onChange={handleQuantityChange}>
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </Form.Select>
        </Form.Group> */}
        <span style={{}}>Quantity you choose: {quantity}</span>
        <span>Coins you need: </span>
        <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='xyz@mail.com'
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder='House No., Street, Colony, State'
                />
              </Form.Group>

              {productCategory === "cloth" && (
                <Form.Group className="mb-3">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder='S/M/X/XL/XXL'
                  />
                </Form.Group>
              )}
              
              <Button variant="primary" type="submit" onClick={handleSubmit} disabled={isFormIncomplete}>
                Submit
              </Button>
            </Form>

      </Modal.Body>
    </Modal>
  );
};

export default BuyNow;