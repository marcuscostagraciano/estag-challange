import { useDispatch, useSelector } from "react-redux";

import "./ValuesTable.css";

import {
	clearCart,
	selectTax,
	selectTotalValue,
} from "../../../features/cart/cartSlice";

const ValuesTable = ({ areProductsInList }) => {
	const dispatch = useDispatch();
	const tax = useSelector(selectTax);
	const total = useSelector(selectTotalValue);

	const handleCancelPurchase = () => {
		const confirmation = window.confirm(
			"Are you sure you want to cancel the purchase?"
		);

		if (confirmation) dispatch(clearCart());
	};

	return (
		<>
			<section className="bottom-side-table">
				<table>
					<tbody>
						<tr>
							<td>Tax ($)</td>
							<td>{tax}</td>
						</tr>
						<tr>
							<td>Total ($)</td>
							<td>{total}</td>
						</tr>
					</tbody>
				</table>
			</section>

			<section
				className="cancel-finish-button"
				title={
					!areProductsInList ? "Add Products to use the buttons" : ""
				}
			>
				<button
					className="secondary-bg"
					onClick={handleCancelPurchase}
					disabled={!areProductsInList}
				>
					Cancel purchase
				</button>
				<button className="primary-bg" disabled={!areProductsInList}>
					Finish purchase
				</button>
			</section>
		</>
	);
};

export default ValuesTable;
