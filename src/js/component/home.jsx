import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import FetchTest from "./fetchTest";
import ToDo from "./ToDo";

//create your first component
const Home = () => {
	return (
		<div className="bg-dark text-light">
			<ToDo />
			<FetchTest />
		</div>
	);
};

export default Home;
