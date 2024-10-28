import { THUNK_STATUS } from "../../utils/constants";
import "./Loader.css";

const Loader = ({ loadingStatus }) => {
	return (
		<>
			{loadingStatus === THUNK_STATUS.LOADING && (
				<div className="parent">
					<div className="loader"></div>
				</div>
			)}
		</>
	);
};

export default Loader;
