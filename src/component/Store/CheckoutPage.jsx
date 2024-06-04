import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./CheckoutPage.css";
import ListingProduct from "./ListingProduct";
import COIN_RUPEE from "./rupee.png";
import dummy from "./images.png";

const ModalWithForm = ({ show, onClose, product, quantity }) => {
	// const [message, setMessage] = useState({});
	// const [message2, setMessage2] = useState({});
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		address: "",
		size: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		const apiBody = {
			price: product.price,
			quantity: quantity,
			name: formData.name,
			email: formData.email,
			size: formData.size,
		};

		console.log(apiBody);

		const updateToSheet = async () => {
			let data = await fetch(
				`http://localhost:8000/submitProduct/${window.location.pathname.split("/")[
				window.location.pathname.split("/").length - 1
				]
				}`,
				{
					method: "POST",
					headers: {
						Authorization: "Bearer " + localStorage.getItem("jwt"),
						"Content-Type": "application/json",
					},
					body: JSON.stringify(apiBody),
				}
			);
			return await data.json();
		};

		const message = await updateToSheet();

		if (message.status === true) {
			Swal.fire({
				title: message.message,
				text: message.message2,
				icon: "success",
			});
		} else {
			Swal.fire({
				title: message.message,
				icon: "error",
			});
		}

		setLoading(false);

		console.log("Form Data Submitted: ", formData);
		// Clear the form
		setFormData({
			name: "",
			email: "",
			address: "",
			size: "",
		});
		onClose(); // Optionally close the modal on form submission
	};

	// Check if Name, Email, and Address fields are not empty
	const isFormIncomplete =
		!formData.name || !formData.email || !formData.address;

	if (!show) {
		return null;
	}
	console.log(localStorage.getItem("jwt"));
	return (
		<div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
			<div className="bg-white rounded-lg p-5 w-70 h-200 border-solid border-2 border-sky-500 flex flex-col justify-center items-center mx-auto">
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Name
						</label>
						<input
							type="text"
							name="name"
							id="name"
							value={formData.name}
							onChange={handleChange}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							value={formData.email}
							onChange={handleChange}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="address"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Address
						</label>
						<input
							type="text"
							name="address"
							id="address"
							value={formData.address}
							onChange={handleChange}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					{product.category === "cloth" && (
						<div className="mb-4">
							<label
								htmlFor="size"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Size
							</label>
							<input
								type="text"
								name="size"
								id="size"
								value={formData.size}
								onChange={handleChange}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
					)}
					<div className="flex justify-between items-center">
						<button
							type="submit"
							className={
								!loading
									? "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
									: "bg-green-500 text-white font-bold py-2 px-4 rounded"
							}
							disabled={loading || isFormIncomplete}
						>
							{!loading ? (
								<span>Submit</span>
							) : (
								<span
									class="spinner-grow spinner-grow-sm"
									role="status"
									aria-hidden="true"
								></span>
							)}
						</button>
						<button
							onClick={onClose}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export const CheckoutPage = () => {
	const [listProduct, setListProduct] = useState();

	useEffect(() => {
		const fetchProducts = async () => {
			const allProducts = await fetch(
				"http://localhost:8000/merchandise/getallproducts"
			);
			const data = await allProducts.json();
			setListProduct(data);
		};

		fetchProducts();
	}, []);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [quantity, setQuantity] = useState(1); // Initialize quantity with 1
	const [product, setProduct] = useState();

	const increment = () => {
		setQuantity((prevQuantity) => prevQuantity + 1);
	};

	const decrement = () => {
		setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Prevent quantity from going below 1
	};

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	let id =
		window.location.pathname.split("/")[
		window.location.pathname.split("/").length - 1
		];
	useEffect(() => {
		const fetchData = async () => {
			const productData = await fetch(`http://localhost:8000/getProduct/${id}/`);
			const data = await productData.json();
			setProduct(data);
			console.log("106", product);
		};
		fetchData();
	}, [id]);

	useEffect(() => {
		const fetchCoin = async () => {
			const coinData = await fetch(`http://localhost:8000/getCoins`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("jwt"),
				},
			});
			const coinsData = await coinData.json();
			console.log(coinsData);
		};
		fetchCoin();
	}, []);
	console.log(product);
	// let imgURL = product.imageUrl;
	// using  lg:justify-between for space
	let url1
	let url2
	let url3
	if(product) {
		url1 = product.tileImages[0].url;
		url2 = product.tileImages[1].url;
		url3 = product.tileImages[2].url;
	}
	return (
		<>
			<div className="parentDiv flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 lg:space-x-8 xl:space-x-12 justify-center mt-12 px-5 py-5">
				{/* Thumbnail side */}
				
				<div className="thumbnailImg">
					<div
						style={{ border: "2px dashed #9647ff" }}
						className="mt-2 h-24 w-24 rounded-3xl"
					>
						<img src={url1 ? url1 : dummy} alt="img1" className="w-full h-full  rounded-3xl"/>
					</div>
					<div
						style={{ border: "2px dashed #ec4882" }}
						className="mt-4 h-24 w-24 rounded-3xl"
					>
						<img src={url2 ? url2 : dummy} alt="img2" className="w-full h-full  rounded-3xl"/>
					</div>
					<div
						style={{ border: "2px dashed #9647ff" }}
						className="mt-4 h-24 w-24 rounded-3xl"
					>
						<img src={url3 ? url3 : dummy} alt="img3" className="w-full h-full  rounded-3xl"/>
					</div>
				</div>
				{/*  */}
				{/* shadow-[5px_5px_0px_0px_rgba(109,40,217)] */}
				{/* Adjustments for desktop: more spacing between elements and larger overall layout */}
				<div className="productImage w-84 h-64 md:w-1/2 lg:w-2/5 xl:w-1/3 h-64 md:h-96 lg:h-auto bg-gray-200 border shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] overflow-hidden">
					<img
						src={product && product.imageUrl}
						alt="product_img"
						className=""
						style={{width: "750px", height: "637px"}}
					/>
					{/* <img
                    src={imgURL}
                    className="w-full h-full "
                    alt=""
                /> */}
				</div>
				<div className="productDetail w-full md:w-1/2 lg:w-1/2 xl:w-1/3 h-auto ">
					<h1 className="py-2 text-5xl m-0 -top-0 font-semibold">
						<span className="font-extrabold  ">
							Feed your mind<br />
							Feed your soul
						</span>
						<hr
							className="flex-1"
							style={{ backgroundColor: "black", height: "1px" }}
						/>

						<p className="text-black m-0 text-sm">
							<span>{!product ? "N/A" : product.name}</span>
						</p>
					</h1>

					<button className="flex items-center justify-center bg-purple-600 rounded-xl px-4 py-2 text-white font-bold text-lg shadow-md">
						<img src={COIN_RUPEE} alt="Coin" className="h-6 w-6 mr-2" />
						<span>{!product ? "N/A" : product.price}</span>
					</button>
					<p className="text-black font-medium m-0 text-sm">Coins need for product:</p>

					<p className="py-1 text-base md:text-lg lg:text-2xl font-bold">
						Product Description:
						<div className="font-extralight tracking-widest text-sm mt-3 " style={{width: "470px", height: "208px"}}>

							<span className="font-bold">
								{!product ? "Product Description:" : product.description}
							</span>
						</div>
					</p>

					<div className="flex py-4 mt-4 lg:mt-8">
						<button
							onClick={toggleModal}
							className=" bg-[#9647ff]  text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110  lg:text-xl "
						>
							Buy Now
						</button>
					</div>
				</div>
				{/* Modal Usage */}
				<ModalWithForm
					show={isModalOpen}
					onClose={toggleModal}
					product={product}
					quantity={quantity}
				>
					<p>
						This is a modal! Place your content here, such as a form or product
						details.
					</p>
				</ModalWithForm>
			</div>
			<div className="ml-48">
				{/* <div className="flex flex-row">
					<button className="bg-[#eb732f] px-4 text-white">
						Similar Products
					</button>
					<hr
						className="flex-1"
						style={{ backgroundColor: "black", height: "1px" }}
					/>
				</div> */}

				{/* Suggestions */}
				<ListingProduct product={product} listProduct={listProduct} />
			</div>
		</>
	);
};
