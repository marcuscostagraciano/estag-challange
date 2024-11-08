import "./ProductCard.css";
const NAME_MARQUEE_LENGTH = 23;
const ARTIST_MARQUEE_LENGTH = 22;

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
				className="product-image"
			/>
			<section className="product-info">
				<span
					className={
						"product-name offside-regular" +
						(NAME_MARQUEE_LENGTH < product.name.length
							? " marquee"
							: "")
					}
				>
					{product.name}
				</span>
				<span
					className={
						"product-artist" +
						(ARTIST_MARQUEE_LENGTH < product.artist.length
							? " marquee"
							: "")
					}
				>
					{product.artist}
				</span>
				<span className="product-price">$ {product.price}</span>
			</section>
		</article>
	);
};

export default ProductCard;
