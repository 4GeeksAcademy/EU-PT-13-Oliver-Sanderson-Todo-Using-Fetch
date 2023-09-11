import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import FetchTest from "./fetchTest";


//create your first component
const Home = () => {
	return (
		<div className="bg-dark text-light">
			<FetchTest />

		</div>
	);
};

export default Home;
