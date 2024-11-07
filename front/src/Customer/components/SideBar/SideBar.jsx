import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import "./SideBar.css";

import { THUNK_STATUS } from "../../../utils/constants";

import {
	asyncFetchCategories,
	getCategoriesStatus,
	selectAllCategories,
} from "../../../features/categories/categoriesSlice";

const SideBar = ({ setFilteredProductList, productsList }) => {
	const DEFAULT_SELECT = "default";

	const dispatch = useDispatch();
	const categoriesList = useSelector(selectAllCategories);
	const categoriesStatus = useSelector(getCategoriesStatus);

	const categoryFilterRef = useRef();
	const artistRef = useRef();

	const [initialsAndArtists, setInitialsAndArtists] = useState([]);
	const [sortedCategoriesList, setSortedCategoriesList] = useState([]);

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
		}
	}, [categoriesList, categoriesStatus, dispatch, productsList]);

	const handleOnChange = () => {
		const selectedCategoryCode = categoryFilterRef.current.value;
		const selectedArtist = artistRef.current.value;
		const isCategoryCodeNumber = !!Number(selectedCategoryCode);
		let filteredList = productsList;

		if (isCategoryCodeNumber)
			filteredList = filteredList.filter(
				(product) => product.category.code == selectedCategoryCode
			);
		if (selectedArtist != DEFAULT_SELECT)
			filteredList = filteredList.filter(
				(product) => product.artist == selectedArtist
			);
		setFilteredProductList(filteredList);
	};

	const handleReset = () => {
		artistRef.current.value = DEFAULT_SELECT;
		categoryFilterRef.current.value = DEFAULT_SELECT;
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
			<h1>Filtros</h1>
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
			<button onClick={handleReset}>Reset</button>
		</aside>
	);
};

export default SideBar;
