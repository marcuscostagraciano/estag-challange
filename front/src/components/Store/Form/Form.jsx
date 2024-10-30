const readOnlyStyle = {
	cursor: "not-allowed",
};

const Form = ({
	onChange,
	onSubmit,
	productsList,
	productCode,
	productAmount,
	productMaxAmount,
	productPrice,
	productTax,
}) => {
	const renderProductsList = productsList.map((product) => {
		if (product.amount)
			return (
				<option key={product.code} value={product.code}>
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
				<input
					type="number"
					name="amount-input"
					id="amount-input"
					title={
						productCode
							? `Amount to be bought. Max: ${productMaxAmount}`
							: "Select a product to input the amount"
					}
					placeholder="Amount"
					min={1}
					max={productMaxAmount}
					ref={productAmount}
					required
					disabled={!productCode}
				/>
				<input
					type="number"
					name="tax-input"
					id="tax-input"
					title="Product's category tax"
					placeholder="Product's category tax"
					value={productTax}
					readOnly
				/>
				<input
					type="number"
					name="unitary-price-input"
					id="unitary-price-input"
					title="Product's unitary price"
					placeholder="Product's unitary price"
					value={productPrice}
					readOnly
				/>
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
					disabled={!productCode}
				/>
			</form>
		</>
	);
};

export default Form;
