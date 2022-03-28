import React from "react";
import CrudTableRow from "./CrudTableRow";

const CrudTable = ({ data, setDataToEdit, deleteData }) => {
	return (
		<>
			<h3>Tabla de Datos</h3>
			<table>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Constelacion</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{data.length > 0 ? (
						data.map((el) => (
							<CrudTableRow
								key={el.id}
								el={el}
								setDataToEdit={setDataToEdit}
								deleteData={deleteData}
							/>
						))
					) : (
						<tr>
							<td colSpan="3">Sin datos</td>
						</tr>
						//aca le agrego el "el" de elemento para pasarlo como prop al componente CrudTableRow
					)}
				</tbody>
			</table>
		</>
	);
};

export default CrudTable;
