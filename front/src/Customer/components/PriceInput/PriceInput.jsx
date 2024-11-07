import { forwardRef } from "react";

const PriceInput = forwardRef((props, ref) => {
	const { id, className, onChange, min, max, defaultValue, value } = props;

	return (
		<input
			type="number"
			className={className}
			id={id}
			onChange={onChange}
			min={min}
			max={max}
			defaultValue={defaultValue}
			ref={ref}
		/>
	);
});

export default PriceInput;
