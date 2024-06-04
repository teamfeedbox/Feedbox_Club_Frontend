import React, { useState } from "react";
import Swal from "sweetalert2";

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        price: 0,
        quantity: 0,
        image: null,
        tileImages: [],
    });
    const [imagePreview, setImagePreview] = useState();
    const [tileImagesPreview, setTileImagesPreview] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
    if (name === "description") {
        // Count the words in the textarea
        const words = value.split(/\s+/).filter(Boolean); // Split by whitespace and remove empty strings
        if (words.length <= 65) {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            // Optionally, alert the user that the word limit has been reached
            Swal.fire({
                title: "Limit Reached",
                text: "You can only enter up to 65 words in the description.",
                icon: "warning",
                timer: 3000,
                toast: true,
                position: "top-end",
                showConfirmButton: false,
            });
            // Truncate the text to the first 65 words if more are entered
            const trimmedText = words.slice(0, 65).join(" ");
            setFormData(prev => ({ ...prev, [name]: trimmedText }));
        }
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file));
        setFormData(prev => ({
            ...prev,
            image: file,
        }));
    };

    const handleTileImagesChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 3); // Limit to 3 files
        setTileImagesPreview(files.map(file => URL.createObjectURL(file)));
        setFormData(prev => ({
            ...prev,
            tileImages: files,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.price <= 0 || formData.quantity <= 0) {
            return Swal.fire({
                title: "Invalid Credentials",
                text: "Price or quantity must be greater than zero!",
                icon: "error",
            });
        }

        setLoading(true);
        const fdata = new FormData();
        const { name, description, category, price, quantity, image, tileImages } = formData;

        fdata.append("imageUrl", image);
        tileImages.forEach((file, index) => fdata.append("tileImages", file));
        fdata.append("name", name);
        fdata.append("description", description);
        fdata.append("category", category);
        fdata.append("quantity", quantity);
        fdata.append("price", price);

        const response = await fetch(`http://localhost:8000/merchandise/createproduct`, {
            method: "POST",
            body: fdata,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        });
        const product = await response.json();

        if (product.error) {
            Swal.fire({
                title: "Error",
                text: product.error,
                icon: "error",
            });
        } else {
            Swal.fire({
                title: "Product Added Successfully",
                icon: "success",
            });
        }

        setLoading(false);
        setFormData({
            name: "",
            description: "",
            category: "",
            price: 0,
            quantity: 0,
            image: null,
            tileImages: [],
        });
        setImagePreview(null);
        setTileImagesPreview([]);
    };

    return (
        <div>
            <div
                className="md:max-w-[50vw] w-[90%] mx-auto mt-[100px] mb-4 p-8 bg-white rounded-3xl shadow-lg "
                style={{
                    background: "white",
                    border: "2px dashed #8F51D6 ",
                }}
            >
                <div className="font-bold text-center text-black text-3xl ">
                    Add Product
                </div>
                <form
                    className="w-full max-w-[77vw] mx-auto mt-[5vh] bg-white "
                    onSubmit={handleSubmit}
                >
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-pink-600 text-xs font-bold mb-2"
                            htmlFor="grid-name"
                        >
                            NAME
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-name"
                            type="text"
                            placeholder="Product Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0 ">
                        <label
                            className="block uppercase tracking-wide text-pink-600 text-xs font-bold mb-2"
                            htmlFor="grid-description"
                        >
                            DESCRIPTION
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-1 px-3 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-description"
                            placeholder="Product Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide  text-pink-600 text-xs font-bold mb-2"
                            htmlFor="grid-category"
                        >
                            CATEGORY
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-category"
                            type="text"
                            placeholder="Product Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide  text-pink-600 text-xs font-bold mb-2"
                            htmlFor="grid-price"
                        >
                            PRICE
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-price"
                            type="number"
                            placeholder="Product Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide  text-pink-600 text-xs font-bold mb-2"
                            htmlFor="grid-quantity"
                        >
                            QUANTITY
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-quantity"
                            type="number"
                            placeholder="Product Quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* IMAGE FIELD */}
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide  text-pink-600 text-xs font-bold mb-2"
                            htmlFor="grid-image"
                        >
                            IMAGE
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxHeight: "100px", width: "150px", marginTop: "5px" }}
                                className="mx-auto object-cover"
                            />
                        )}
                    </div>
                    {/* TILE IMAGES FIELD */}
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide  text-pink-600 text-xs font-bold mb-2"
                            htmlFor="grid-tile-image"
                        >
                            TILE IMAGES
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-tile-image"
                            type="file"
                            accept="image/*"
                            onChange={handleTileImagesChange}
                            multiple
                            required
                        />
                        <div className="flex justify-center gap-2">
                            {tileImagesPreview.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="Tile Preview"
                                    style={{
                                        maxHeight: "100px",
                                        width: "150px",
                                        marginTop: "5px",
                                    }}
                                    className="object-cover"
                                />
                            ))}
                        </div>
                    </div>
                    {/* Other form fields and submit button */}
                    {/* Submit Button */}
                    <div className="flex justify-center items-center mb-10">
                        <button
                            type="submit"
                            className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={loading}
                        >
                            {!loading ? (
                                "Submit Now"
                            ) : (
                                <div className="flex items-center justify-center">
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline w-4 h-4 mr-2 text-gray-200 animate-spin"
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
                                    Loading...
                                </div>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
