import "../Form.css";

function Form({ onSubmit, categoryNameRef, categoryTaxRef }) {
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
						title="Category name"
						ref={categoryNameRef}
					/>
					<input
						type="number"
						id="tax"
						placeholder="Tax"
						min="0"
						max="100"
						step="0.01"
						required
						pattern="[0-9]{1,3}(\.[0-9]{1,2})?"
						title="Category tax"
						inputMode="numeric"
						ref={categoryTaxRef}
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
}

export default Form;
