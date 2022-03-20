import React from "react";
import CrudApi from "./components/CrudApi";
import CruddApp from "./components/CrudApp";

function App() {
	return (
		<>
			<h1>Ejercicios con React</h1>
			<CrudApi />
			<hr />
			<CruddApp />
			<hr />
		</>
	);
}

export default App;
