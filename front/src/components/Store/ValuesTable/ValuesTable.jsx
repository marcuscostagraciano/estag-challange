import { useDispatch, useSelector } from "react-redux";

import "./ValuesTable.css";

import {
	clearCart,
	selectTax,
	selectTotalValue,
} from "../../../features/cart/cartSlice";
import { patchProductAmount } from "../../../features/products/productsSlice";
import { PATCH_OPERATIONS } from "../../../utils/constants";

const ValuesTable = ({ productsList }) => {
	const areProductsInList = !!productsList.length;

	const dispatch = useDispatch();
	const tax = useSelector(selectTax);
	const total = useSelector(selectTotalValue);

	const handleCancelPurchase = () => {
		const confirmation = window.confirm(
			"Are you sure you want to cancel the purchase?"
		);

		if (confirmation) {
			const oldCart = [...productsList];

			oldCart.forEach((product) => {
				dispatch(
					patchProductAmount({
						...product,
						operation: PATCH_OPERATIONS.ADD,
					})
				);
			});
			dispatch(clearCart());
		}
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
					!areProductsInList
						? "Add Products to enable the buttons"
						: ""
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
