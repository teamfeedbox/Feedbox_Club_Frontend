import React, { useState, useEffect } from "react";
import Product from "./Product";
import { MDBContainer, MDBRow, MDBCol, MDBRipple } from "mdb-react-ui-kit";
import bannerImg from "./BannerImg.jpg";
import "./Store.css";

const App = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const allProducts = await fetch(
				`http://localhost:8000/merchandise/getallproducts`
			);
			const data = await allProducts.json();
			setProducts(data);
		};

		console.log(process.env);

		fetchProducts();
	}, []);

	// const deleteProduct = (id) => {
	//   setProducts(products.filter(product => product.id !== id));
	// }

	// const editProduct = (product) => {
	//   console.log('Edit product:', product);
	//   // Implementation for edit functionality
	// }

	console.log(localStorage.getItem("user"));
	let colors = ["#9647ff", "#eb732f", "#ec4882", "#417cd3"];

	return (
		// <div className='w-[100vw]'>
		// <div className="mx-auto w-full mt-[25vh] min-h-full flex flex-wrap justify-center gap-5">

		//   {products.map(product => (
		//     <Product
		//       key={product._id}
		//       product={product}
		//       // onDelete={deleteProduct}
		//       // onEdit={editProduct}
		//       />
		//       ))}
		//       </div>
		// </div>

		<MDBContainer
			fluid
			className="my-[55px] text-center"
			style={{ backgroundColor: "white" }}
		>
			<MDBRow className="">
				{/* <h4 className="mt-4 mb-5">
          <strong>Product Listing</strong>
        </h4> */}
				<div className="w-full h-">
					<img
						src={bannerImg}
						alt="bannerIMG"
						className="w-full h-full object-cover"
					/>
				</div>
			</MDBRow>

			<MDBRow className="mt-0 justify-content-center">
				{products.map((product, index) => {
					const colorIndex = index % colors.length;
					const colo = colors[colorIndex];
					return <Product key={product._id} product={product} colors={colo} />;
				})}
			</MDBRow>
      
		</MDBContainer>
	);
};

export default App;
