import "./Form.css";

function Form() {
	return (
		<>
			<form id="input-form" action="" onSubmit={() => alert('submited')}>
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
						title="Taxa sobre a categoria"
						inputMode="numeric"
					/>
				</div>
                <input type="submit" id="submit-button" className="primary-bg" value="Add Category" />
			</form>
		</>
	);
}

export default Form;
