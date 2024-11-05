import "./ProductCard.css";

const ProductCard = ({ product }) => {
	return (
		<article
			key={product.code}
			className="product-card"
			title={product.name}
		>
			<img
				src={product.img_url}
				alt={'Image of "' + product.name + '" album'}
			/>
			<section className="product-info">
				<span
					className={
						"offside-regular" +
						(product.name.length > 20 ? " marquee" : "")
					}
				>
					{product.name}
				</span>
				<p>$ {product.price}</p>
			</section>
		</article>
	);
};

export default ProductCard;
