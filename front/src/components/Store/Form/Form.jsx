import "./Form.css";

const Form = ({
	productsList,
	selectedProduct,
	selectedProductMaxAmount,
	productAmountRef,
	onChange,
	onSubmit,
}) => {
	const renderProductsList = productsList.map((product) => {
		if (product.amount)
			return (
				<option
					key={product.code}
					value={product.code}
					disabled={!!!product.amount}
				>
					{product.name}
				</option>
			);
	});
	const isProductsListEmpty = !!productsList.length;

	return (
		<>
			<form id="input-form" onSubmit={onSubmit}>
				<label htmlFor="product-selection">Product</label>
				<select
					name="product-selection"
					id="product-selection"
					title="Product selection"
					onChange={onChange}
					defaultValue={"default"}
				>
					<option value="default" disabled>
						Select a product
					</option>
					{renderProductsList}
				</select>
				<section className="inputs">
					<input
						type="number"
						name="amount-input"
						id="amount-input"
						title={
							selectedProduct
								? `Amount to be bought. Max: ${selectedProductMaxAmount}`
								: "Select a product to input the amount"
						}
						placeholder="Amount"
						min={1}
						max={selectedProductMaxAmount}
						ref={productAmountRef}
						required
						disabled={!selectedProduct?.code}
					/>
					<input
						type="number"
						name="tax-input"
						id="tax-input"
						title="Product's category tax"
						placeholder="Product's category tax"
						value={selectedProduct?.category.tax}
						readOnly
					/>
					<input
						type="number"
						name="unitary-price-input"
						id="unitary-price-input"
						title="Product's unitary price"
						placeholder="Product's unitary price"
						value={selectedProduct?.price}
						readOnly
					/>
				</section>
				<input
					type="submit"
					id="submit-button"
					className="primary-bg"
					value="Add Product to cart"
					title={
						!isProductsListEmpty
							? "Register a Product to enable this button"
							: ""
					}
					disabled={!selectedProduct?.code}
				/>
			</form>
		</>
	);
};

export default Form;
