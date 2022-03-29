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

	let url = "http://localhost:3001/santos";
	let api = helpHttp();
	useEffect(() => {
		setLoading(true);

		api.get(url).then((res) => {
			//console.log(res);
			if (!res.err) {
				setDb(res);
				setError(null);
			} else {
				setDb(null);
				setError(res);
			}

			setLoading(false);
		});
	}, [url]);

	const createData = (data) => {
		data.id = Date.now();

		let options = {
			body: data,
			headers: { "content-type": "application/json" },
		};
		//console.log(data);
		api.post(url, options).then((res) => {
			//console.log(res);
			if (!res.err) {
				setDb([...db, res]);
			} else {
				setError(res);
			}
		});
	};

	const updateData = (data) => {
		let endpoint = `${url}/${data.id}`;
		//console.log(endpoint);

		let options = {
			body: data,
			headers: { "content-type": "application/json" },
		};

		api.put(endpoint, options).then((res) => {
			if (!res.err) {
				let newData = db.map((el) => (el.id === data.id ? data : el));
				setDb(newData);
			} else {
				setError(res);
			}
		});
	};

	const deleteData = (id) => {
		let isDelete = window.confirm(
			`Estas seguro se eliminar el registro con el id ${id}`
		);

		if (isDelete) {
			let endpoint = `${url}/${id}`;
			let options = {
				headers: { "content-type": "application/json" },
			};
			//console.log(data);
			api.del(endpoint, options).then((res) => {
				//console.log(res);
				if (!res.err) {
					let newData = db.filter((el) => el.id !== id);
					setDb(newData);
				} else {
					setError(res);
				}
			});
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
