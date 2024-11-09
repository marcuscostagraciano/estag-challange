import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import "./SideBar.css";

import { THUNK_STATUS } from "../../../utils/constants";

import {
	asyncFetchCategories,
	getCategoriesStatus,
	selectAllCategories,
} from "../../../features/categories/categoriesSlice";
import PriceInput from "../PriceInput/PriceInput";

const SideBar = ({ setFilteredProductList, productsList }) => {
	const DEFAULT_SELECT = "default";

	const dispatch = useDispatch();
	const categoriesList = useSelector(selectAllCategories);
	const categoriesStatus = useSelector(getCategoriesStatus);

	const categoryFilterRef = useRef();
	const artistRef = useRef();
	const maxPriceRef = useRef();
	const minPriceRef = useRef();

	const [initialsAndArtists, setInitialsAndArtists] = useState([]);
	const [sortedCategoriesList, setSortedCategoriesList] = useState([]);
	const [productsPrices, setProductsPrices] = useState({
		min: 0,
		max: 0,
	});

	useEffect(() => {
		if (categoriesStatus === THUNK_STATUS.IDLE)
			dispatch(asyncFetchCategories());

		if (categoriesList) {
			const nameSortedCategories = [...categoriesList].sort(
				(catA, catB) => catA.name.localeCompare(catB.name)
			);
			setSortedCategoriesList(nameSortedCategories);
		}

		if (productsList) {
			const sortedArtistsList = [
				...new Set(productsList.map((product) => product.artist)),
			].sort();
			const artistsInitials = [
				...new Set(sortedArtistsList.map((artist) => artist[0])),
			];
			const initialsAndArtists = artistsInitials.map((initial) => ({
				initial,
				artists: sortedArtistsList.filter((artist) =>
					artist.startsWith(initial)
				),
			}));
			setInitialsAndArtists(initialsAndArtists);

			const productsPrices = [...productsList].map(
				(product) => product.price
			);
			const minPrice = Math.min(...productsPrices);
			const maxPrice = Math.max(...productsPrices);

			setProductsPrices({
				min: minPrice,
				max: maxPrice,
			});

			minPriceRef.current.value = minPrice;
			maxPriceRef.current.value = maxPrice;
		}
	}, [categoriesList, categoriesStatus, dispatch, productsList]);

	const handleOnChange = () => {
		let filteredList = productsList;

		const selectedCategoryCode = categoryFilterRef.current.value;
		const selectedArtist = artistRef.current.value;
		const isCategoryCodeNumber = !!Number(selectedCategoryCode);
		const minPrice = Number(minPriceRef.current.value);
		const maxPrice = Number(maxPriceRef.current.value);

		if (isCategoryCodeNumber)
			filteredList = filteredList.filter(
				(product) => product.category.code == selectedCategoryCode
			);
		if (selectedArtist != DEFAULT_SELECT)
			filteredList = filteredList.filter(
				(product) => product.artist == selectedArtist
			);
		filteredList = filteredList.filter(
			(product) => minPrice <= product.price && product.price <= maxPrice
		);
		setFilteredProductList(filteredList);
	};

	const handleReset = () => {
		artistRef.current.value = DEFAULT_SELECT;
		categoryFilterRef.current.value = DEFAULT_SELECT;
		maxPriceRef.current.value = productsPrices.max;
		minPriceRef.current.value = productsPrices.min;
		setFilteredProductList(productsList);
	};

	const renderArtistsSelect = initialsAndArtists.map((object) => (
		<optgroup key={object.initial} label={object.initial}>
			{object.artists.map((artist) => (
				<option value={artist} key={artist}>
					{artist}
				</option>
			))}
		</optgroup>
	));

	return (
		<aside className="sidebar">
			<h1>Filters</h1>
			<label htmlFor="genre-selection">Genres</label>
			<select
				defaultValue={DEFAULT_SELECT}
				onChange={handleOnChange}
				ref={categoryFilterRef}
				id="genre-selection"
				name="genre-selection"
			>
				<option value={DEFAULT_SELECT}>All</option>
				{sortedCategoriesList.map((cat) => (
					<option value={cat.code} key={cat.code}>
						{cat.name}
					</option>
				))}
			</select>
			<label htmlFor="artist-selection">Artists</label>
			<select
				defaultValue={DEFAULT_SELECT}
				onChange={handleOnChange}
				ref={artistRef}
				id="artist-selection"
				name="artist-selection"
			>
				<option value={DEFAULT_SELECT}>All</option>
				{renderArtistsSelect}
			</select>

			<section className="price-inputs">
				<h2>Prices</h2>
				<label>
					Min
					<PriceInput
						onChange={handleOnChange}
						id={"min-value"}
						min={productsPrices.min}
						max={productsPrices.max}
						defaultValue={minPriceRef?.current?.value}
						ref={minPriceRef}
					/>
				</label>
				<label>
					Max
					<PriceInput
						onChange={handleOnChange}
						id={"max-value"}
						min={productsPrices.min}
						max={productsPrices.max}
						defaultValue={maxPriceRef?.current?.value}
						ref={maxPriceRef}
					/>
				</label>
			</section>

			<button onClick={handleReset} id="reset-filter-button">
				Reset
			</button>
		</aside>
	);
};

export default SideBar;
