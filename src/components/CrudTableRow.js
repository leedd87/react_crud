import React from "react";

const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
	//aca desestructuring de "el" (elemento) para poder pasarle las propiedades de la base de datos
	let { name, constellation, id } = el;

	return (
		<>
			<tr>
				<td>{name}</td>
				<td>{constellation}</td>
				<td>
					<button onClick={() => setDataToEdit(el)}>Editar</button>
					<button onClick={() => deleteData(id)}>Eliminar</button>
				</td>
			</tr>
		</>
	);
};

export default CrudTableRow;
