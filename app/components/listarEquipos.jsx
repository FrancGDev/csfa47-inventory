

import React, { useState, useEffect } from "react";

const ListarEquipos = () => {
    const [equipos, setEquipos] = useState([]);
    const [tipo, setTipo] = useState("");
    const [estado, setEstado] = useState("");

    const handleTipoChange = (e) => {
        setTipo(e.target.value);
    };

    const handleEstadoChange = (e) => {
        setEstado(e.target.value);
    };

    useEffect(() => {
        const fetchEquipos = async () => {
            let url = "/api/equipos?";
            if (tipo) url += `tipo=${tipo}&`;
            if (estado) url += `estado=${estado}&`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setEquipos(data);
            } catch (error) {
                console.error("Error al obtener equipos:", error);
            }
        };

        fetchEquipos();  // Llama a la función dentro del useEffect
    }, [tipo, estado]);  // 'tipo' y 'estado' son las dependencias que disparan el efecto

    return (

        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Equipos en Inventario</h1>

            {/* Filtros */}
            <div className="mb-4 flex space-x-4">
                <div>
                    <label className="block text-lg font-medium mb-2">Tipo:</label>
                    <select
                        value={tipo}
                        onChange={handleTipoChange}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Seleccionar Tipo</option>
                        <option value="PC">PC</option>
                        <option value="RATON">RATON</option>
                        <option value="TECLADO">TECLADO</option>
                        <option value="PARLANTES">PARLANTES</option>
                        <option value="MONITOR">MONITOR</option>
                        <option value="IMPRESORA">IMPRESORA</option>
                        <option value="OTROS">OTROS</option>
                    </select>
                </div>
                <div>
                    <label className="block text-lg font-medium mb-2">Estado:</label>
                    <select
                        value={estado}
                        onChange={handleEstadoChange}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Seleccionar Estado</option>
                        <option value="BUEN_ESTADO">Buen estado</option>
                        <option value="NECESITA_REVISION">Necesita revisión</option>
                        <option value="NECESITA_REEMPLAZO">Necesita reemplazo</option>
                    </select>
                </div>
            </div>

            {/* Tabla de Equipos */}
            <div className="overflow-x-auto bg-white rounded shadow-lg">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-400 text-white">
                            <th className="p-3">ID</th>
                            <th className="p-3">Nombre</th>
                            <th className="p-3">Tipo</th>
                            <th className="p-3">Descripción</th>
                            <th className="p-3">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipos.length > 0 ? (
                            equipos.map((equipo) => (
                                <tr key={equipo.id} className="hover:bg-gray-100 border-b">
                                    <td className=" px-4 py-2">{equipo.id}</td>
                                    <td className=" px-4 py-2">{equipo.nombre}</td>
                                    <td className=" px-4 py-2">{equipo.tipo}</td>
                                    <td className=" px-4 py-2">{equipo.descripcion}</td>
                                    <td className=" px-4 py-2">{equipo.estado}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center px-4 py-2">
                                    No hay equipos que coincidan con los filtros.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default ListarEquipos;

