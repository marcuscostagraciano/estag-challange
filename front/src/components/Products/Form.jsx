import "../Form.css";

const Form = ({
	onSubmit,
	nameRef,
	amountRef,
	priceRef,
	categoryRef,
	categoriesList,
}) => {
	const renderCategoriesOptions = categoriesList.map((category) => (
		<option key={category.code} value={category.code}>
			{category.name}
		</option>
	));
	const isCategoriesListEmpty = !!categoriesList.length;

	return (
		<>
			<form id="input-form" onSubmit={onSubmit}>
				<div className="inputs">
					<input
						type="text"
						id="product_name"
						placeholder="Product name"
						required
						minLength="3"
						pattern="[a-zà-úA-ZÀ-Ú]+([ a-zà-úA-ZÀ-Ú]+)?([ 0-9]+)?"
						maxLength="30"
						title="Product name"
						ref={nameRef}
					/>
					<input
						type="number"
						id="amount"
						placeholder="Amount"
						min="1"
						step="1"
						required
						pattern="[^0][0-9]+"
						title="Amount of products"
						inputMode="numeric"
						ref={amountRef}
					/>
					<input
						type="number"
						id="unit_price"
						placeholder="Unit price"
						min="0"
						step="0.01"
						required
						pattern="([0-9]*)\.?([0-9]{1,2})?"
						title="Unitary price"
						inputMode="numeric"
						ref={priceRef}
					/>
					<select
						id="category-selection"
						name="category-selection"
						title="Category selection"
						ref={categoryRef}
					>
						{renderCategoriesOptions}
					</select>
				</div>
				<input
					type="submit"
					id="submit-button"
					className="primary-bg"
					value="Add Product"
					title={
						!isCategoriesListEmpty
							? "Register a Category to enable this button"
							: ""
					}
					disabled={!isCategoriesListEmpty}
				/>
			</form>
		</>
	);
};

export default Form;
