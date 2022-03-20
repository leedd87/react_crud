import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import React, { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import Message from "./Message";
import Loader from "./Loader";

const CruddApi = () => {
	const [db, setDb] = useState(null);
	const [dataToEdit, setDataToEdit] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		let url = "http://localhost:3001/santo";
		let api = helpHttp();

		api.get(url).then((res) => {
			console.log(res);
			if (!res.err) {
				setDb(res);
				setError(null);
			} else {
				setDb(null);
				setError(res);
			}

			setLoading(false);
		});
	}, []);

	const createData = (data) => {
		data.id = Date.now();
		//console.log(data);

		setDb([...db, data]);
	};

	const updateData = (data) => {
		let newData = db.map((el) => (el.id === data.id ? data : el));
		setDb(newData);
	};

	const deleteData = (id) => {
		let isDelete = window.confirm(
			`Estas seguro se eliminar el registro con el id ${id}`
		);

		if (isDelete) {
			let newData = db.filter((el) => el.id !== id);
			setDb(newData);
		} else {
			return;
		}
	};

	return (
		<>
			<h2>CRUD API</h2>
			<article className="grid-1-2">
				<CrudForm
					createData={createData}
					updateData={updateData}
					dataToEdit={dataToEdit}
					setDataToEdit={setDataToEdit}
				/>
				{loading && <Loader />}
				{error && (
					<Message
						msg={`Error ${error.status}: ${error.statusText}`}
						bgColor="#dc3545"
					/>
				)}
				{db && (
					<CrudTable
						data={db}
						setDataToEdit={setDataToEdit}
						deleteData={deleteData}
					/>
				)}
			</article>
		</>
	);
};

export default CruddApi;
