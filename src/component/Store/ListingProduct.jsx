import React from "react";

const ListingProduct = ({ product, listProduct }) => {
	// Initialize filteredProducts array
	const filteredProducts = [];
	// Check if listProduct is defined and has length
	if (product && listProduct) {
		// Check if listProduct has length
		if (listProduct.length > 0) {
			for (let i = 0; i < listProduct.length; i++) {
				// Check if the current item is defined and has _id before comparing
				if (listProduct[i] && listProduct[i]._id !== product._id) {
					filteredProducts.push(listProduct[i]);
					// Break if we have collected four unique products
					if (filteredProducts.length === 4) {
						break;
					}
				}
			}
		}
	}
	const colorCode = ["417cd3", "ec4882", "9647ff", "eb732f"];

	return (
		<>
			<div className="flex flex-row">
				<button className="bg-[#eb732f] px-4 text-white">
					Similar Products
				</button>
				<hr
					className="flex-1"
					style={{ backgroundColor: "black", height: "1px" }}
				/>
			</div>
			<div className="mt-8 mb-8 flex flex-wrap gap-4 justify-center md:justify-start space-x-0 md:space-x-4">
				{filteredProducts.map((data, index) => (
					<div
						key={data._id}
						className="max-w-xs m-4 flex flex-col items-center border-2 border-dashed rounded-lg shadow-lg overflow-hidden transition-all transform hover:scale-105"
						style={{
							borderRadius: "15px",
							borderColor: `#${colorCode[index % colorCode.length]}`,
                            width: "15em", height: "18em"
						}}
					>
						<div
							className="h-56 w-full"
							style={{ borderRadius: "15px 15px 0 0" }}
						>
							<img
								src={data.imageUrl}
								className="h-full w-full object-cover rounded-lg h-full"
								alt="Product Image"
								style={{
									borderRadius: "15px 15px 0 0",
									width: "100%",
									height: "100%",
								}}
							/>
						</div>
						<div className="p-2 text-center">
							<h7 className="font-semibold">{data.name}</h7>
							<br />
							<span className="text-gray-600" style={{color : "#eb732f"}}>₹{data.price}</span>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default ListingProduct;
