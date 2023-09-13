import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Login from "./Login";


//create your first component
const Home = () => {
	return (
		<div className="bg-dark text-light">
			<Login />

		</div>
	);
};

export default Home;
