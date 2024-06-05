import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const EditModal = ({ isOpen, onClose, product, setProducts, products, id }) => {
  const [formData, setFormData] = useState({ ...product });
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.price <= 0 || formData.quantity <= 0) {
      Swal.fire({
        title: "Invalid Credentials",
        text: "Price or quantity must be greater than zero!",
      });
    }

    setLoading(true);
    const fdata = new FormData();
    const { name, description, category, price, quantity, image } = formData;

    fdata.append("imageUrl", image);
    fdata.append("name", name);
    fdata.append("description", description);
    fdata.append("category", category);
    fdata.append("quantity", quantity);
    fdata.append("price", price);

    const data = await fetch(
      `https://club-community-feedbox2-0-sdcn.vercel.app/merchandise/product/${id}`,
      {
        method: "PUT",
        body: fdata,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    const productData = await data.json();
    
    const oldData = products.map((prod) => {
      if(prod._id === id){
        prod.name = productData.name;
        prod.description = productData.description;
        prod.category = productData.category;
        prod.quantity = productData.quantity;
        prod.price = productData.price;
        prod.imageUrl = productData.imageUrl;
      }

      return prod;
    });

    setProducts([...oldData]);
    console.log(products);

    setLoading(false);

    if (productData.error) {
      Swal.fire({
        title: productData.error,
        text: "Please provide all credentials",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Product Updated Successfully",
        icon: "success",
      });
    }

    setFile(null);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formProductName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter product name"
              value={formData.name}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              name="description"
              onChange={handleChange}
              value={formData.description}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductCategory" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              onChange={handleChange}
              placeholder="Enter product category"
              value={formData.category}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice" className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              onChange={handleChange}
              placeholder="Enter product price"
              value={formData.price}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductQuantity" className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              onChange={handleChange}
              placeholder="Enter product quantity"
              value={formData.quantity}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductImage" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control onChange={handleImageChange} required type="file" />
            {file && (
              <img
                src={file}
                alt=""
                style={{
                  maxHeight: "175px",
                  minHeight: "175px",
                  width: "200px",
                  marginTop: "15px",
                }}
                className="mx-auto object-cover"
              />
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {!loading ? (
            <span>Save</span>
          ) : (
            <>
              {" "}
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Loading...{" "}
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
