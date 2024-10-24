import "../Form.css";

const ProductsForm = ({ onSubmit, nameRef, amountRef, priceRef }) => {
	return (
		<>
			<form id="input-form" onSubmit={onSubmit}>
				<div className="inputs">
					<input
						type="text"
						id="category_name"
						placeholder="Category name"
						required
						minLength="3"
						pattern="[a-zà-úA-ZÀ-Ú]+([ a-zà-úA-ZÀ-Ú]+)?([ 0-9]+)?"
						maxLength="30"
						title="Nome da categoria"
						ref={nameRef}
					/>
					<input
						type="number"
						id="amount"
						placeholder="Amount"
						min="0"
						step="1"
						required
						pattern="[^0][0-9]+"
						title="Taxa sobre a categoria"
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
						title="Preço unitário"
						inputMode="numeric"
						ref={priceRef}
					/>
				</div>
				<input
					type="submit"
					id="submit-button"
					className="primary-bg"
					value="Add Category"
				/>
			</form>
		</>
	);
};

export default ProductsForm;
