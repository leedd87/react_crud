import React from "react";
import CrudApi from "./components/CrudApi";
import CruddApp from "./components/CrudApp";
import SongSearch from "./components/SongSearch";

function App() {
	return (
		<>
			<h1>Ejercicios con React</h1>
			<SongSearch />
			<hr />
			<CrudApi />
			<hr />
			<CruddApp />
			<hr />
		</>
	);
}

export default App;
