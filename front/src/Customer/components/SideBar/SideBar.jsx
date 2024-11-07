import { useRef } from "react";
import "./SideBar.css";

const SideBar = ({
	initialsAndArtists,
	categoriesList,
	setFilteredProductList,
	productsList,
}) => {
	const DEFAULT_SELECT = "default";
	const categoryFilterRef = useRef();
	const artistRef = useRef();
	console.log({ initialsAndArtists });

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
				{categoriesList.map((cat) => (
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
				{/* {artists.map((artist, index) => (
					<option value={artist} key={index}>
						{artist}
					</option>
				))}
				{artists.map((artist) => (
					<optgroup key={artist} label={artist}>
						<option value={DEFAULT_SELECT}>All</option>
					</optgroup>
				))} */}
				{/* {artists} */}
			</select>
			<button onClick={handleReset}>Reset</button>
		</aside>
	);
};

export default SideBar;
