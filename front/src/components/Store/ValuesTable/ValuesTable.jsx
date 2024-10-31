import { useDispatch, useSelector } from "react-redux";

import "./ValuesTable.css";

import { selectTax, selectTotalValue } from "../../../features/cart/cartSlice";
import { asyncPostOrder } from "../../../features/orders/ordersSlice";
import { asyncPostOrderItem } from "../../../features/orderItem/orderItemSlice";
import Orders from "../../../services/Orders";
import Products from "../../../services/Products";

const ValuesTable = ({ productsList }) => {
	const areProductsInList = !!productsList.length;

	const dispatch = useDispatch();
	const tax = useSelector(selectTax);
	const total = useSelector(selectTotalValue);

	const handleCancelPurchase = () => {
		const confirmation = window.confirm(
			"Are you sure you want to cancel the purchase?"
		);

		if (confirmation) window.location.reload();
	};

	const handlePurchaseSubmit = async () => {
		const confirmation = window.confirm(
			"Are you sure you want to submit the purchase?"
		);

		if (confirmation) {
			const cart = [...productsList];
			const order = (await dispatch(asyncPostOrder())).payload;

			const operationsPromises = cart.map(async (product) => {
				// Cria o OrderItem
				const orderItem = (
					await dispatch(asyncPostOrderItem({ order, product }))
				).payload;
				// Altera o preço do Order
				const totalPriceOrderItem = orderItem.price + orderItem.tax;
				await Orders.putOrder(
					order.code,
					totalPriceOrderItem,
					orderItem.tax
				);
				// Altera a quantidade de Produtos
				await Products.patchProduct(product.code, product.amount);
			});

			Promise.all(operationsPromises).then(() => {
				alert("Successfully bought!");
				window.location.reload();
			});
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
				<button
					className="primary-bg"
					onClick={handlePurchaseSubmit}
					disabled={!areProductsInList}
				>
					Finish purchase
				</button>
			</section>
		</>
	);
};

export default ValuesTable;
