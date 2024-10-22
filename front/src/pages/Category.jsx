import CategoryTable from "../components/Table";
import CategoryForm from "../components/Category/Form/Form";
import { useRef } from "react";

function Category() {
	const categoryNameRef = useRef(null)
	const categoryTaxRef = useRef(null)

	const handleOnSubmit = (e) => {
		e.preventDefault();
	
		console.log(categoryNameRef.current.value);
		console.log(categoryTaxRef.current.value);

		categoryNameRef.current.value = ''
		categoryTaxRef.current.value = ''
	};

	return (
		<>
			<section className="left-side-panel">
				<CategoryForm onSubmit={handleOnSubmit} categoryNameRef={categoryNameRef} categoryTaxRef={categoryTaxRef}/>
			</section>

			<div className="middle-divisor" />

			<section className="right-side-panel">
				<CategoryTable />
			</section>
		</>
	);
}

export default Category;
