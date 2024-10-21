import CategoryTable from "../components/Table";
import CategoryForm from "../components/Category/Form/Form";

function Category() {
	return (
		<>
			<section className="left-side-panel">
				<CategoryForm />
			</section>

			<div className="middle-divisor" />

			<section className="right-side-panel">
				<CategoryTable/>
			</section>
		</>
	);
}

export default Category;
