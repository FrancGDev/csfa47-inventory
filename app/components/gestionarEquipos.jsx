import React, { useState, useEffect, useCallback } from "react";
import AgregarEquipo from "./agregarEquipo";
import toast from "react-hot-toast";

const GestionarEquipos = () => {
    const [equipos, setEquipos] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [tipo, setTipo] = useState("");
    const [estado, setEstado] = useState("");
    const [limit] = useState(5);

    const [showAgregarEquipo, setShowAgregarEquipo] = useState(false);
    const handleOpenAgregarEquipo = () => setShowAgregarEquipo(true);
    const handleCloseAgregarEquipo = () => setShowAgregarEquipo(false);

    const handleTipoChange = (e) => {
        setTipo(e.target.value);
    };

    const handleEstadoChange = (e) => {
        setEstado(e.target.value);
    };


    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleEdit = (equipo) => {
        setEquipoSeleccionado(equipo);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setEquipoSeleccionado(null);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/equipos/${equipoSeleccionado.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(equipoSeleccionado),
            });

            if (response.ok) {
                toast.success("Equipo actualizado correctamente");
                setModalVisible(false);
                setEquipoSeleccionado(null);
                const updatedEquipos = equipos.map((eq) =>
                    eq.id === equipoSeleccionado.id ? equipoSeleccionado : eq
                );
                setEquipos(updatedEquipos);
            } else {
                toast.error("Error al actualizar el equipo");
            }
        } catch (error) {
            console.error("Error al actualizar el equipo:", error);
            toast.error("Error al actualizar el equipo");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEquipoSeleccionado((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleDelete = async (id) => {
        const confirmation = window.confirm("¿Estás seguro de que deseas eliminar este equipo?");
        if (confirmation) {
            try {
                const response = await fetch(`/api/equipos/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    setEquipos(equipos.filter((equipo) => equipo.id !== id));
                    toast.success("Equipo eliminado exitosamente.");
                } else {
                    toast.error("Error al eliminar el equipo.");
                }
            } catch (error) {
                console.error("Error al eliminar el equipo:", error);
                toast.error("Error al eliminar el equipo.");
            }
        }
    };

    const fetchEquipos = useCallback(async () => {
        let url = `/api/equipos?paginacion=true&page=${currentPage}&limit=${limit}`;
        if (tipo) url += `&tipo=${tipo}`;
        if (estado) url += `&estado=${estado}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setEquipos(Array.isArray(data.equipos) ? data.equipos : []);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error al obtener equipos:", error);
        }
    }, [tipo, estado, currentPage, limit]);


    useEffect(() => {
        fetchEquipos();
    }, [fetchEquipos]);




    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Equipos en Inventario</h1>

            <div className="flex justify-between items-end mb-4">
                <div className="flex space-x-6">
                    <div>
                        <label className="block text-lg font-medium mb-2">Tipo:</label>
                        <select
                            value={tipo}
                            onChange={handleTipoChange}
                            className="border p-2 rounded w-full"
                        >
                            <option value="">Todos</option>
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
                            <option value="">Todo</option>
                            <option value="BUEN ESTADO">Buen estado</option>
                            <option value="NECESITA REVISION">Necesita revisión</option>
                            <option value="NECESITA MANTENIMIENTO">Necesita mantenimiento</option>
                            <option value="NECESITA REEMPLAZO">Necesita reemplazo</option>
                        </select>
                    </div>
                </div>
                <button
                    onClick={handleOpenAgregarEquipo}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Agregar Equipo
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded shadow-lg">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-400 text-white">
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Nombre</th>
                            <th className="p-3 text-left">Tipo</th>
                            <th className="p-3 text-left">Descripción</th>
                            <th className="p-3 text-left">Estado</th>
                            <th className="p-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipos.length > 0 ? (
                            equipos.map((equipo) => (
                                <tr key={equipo.id} className="hover:bg-gray-100 border-b">
                                    <td className="px-4 py-2">{equipo.id}</td>
                                    <td className="px-4 py-2">{equipo.nombre}</td>
                                    <td className="px-4 py-2">{equipo.tipo}</td>
                                    <td className="px-4 py-2">{equipo.descripcion}</td>
                                    <td className="px-4 py-2">{equipo.estado}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleEdit(equipo)}
                                            className="text-blue-500 hover:text-blue-700"
                                            title="Editar equipo"
                                        >
                                            <span className="material-icons">edit_square</span>

                                        </button>
                                        <button
                                            onClick={() => handleDelete(equipo.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <span className="material-icons">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center px-4 py-2">
                                    No hay equipos para listar
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 bg-blue-200 hover:bg-blue-400 rounded"
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2  bg-blue-200 hover:bg-blue-400 rounded"
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>

            {modalVisible && equipoSeleccionado && (
                <div className="fixed inset-0 bg-slate-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
                        <h2 className="text-xl font-bold mb-4">Editar Equipo</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={equipoSeleccionado.nombre}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Tipo:</label>
                            <select
                                name="tipo"
                                value={equipoSeleccionado.tipo}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            >
                                <option value="PC">PC</option>
                                <option value="RATON">RATÓN</option>
                                <option value="TECLADO">TECLADO</option>
                                <option value="PARLANTES">PARLANTES</option>
                                <option value="MONITOR">MONITOR</option>
                                <option value="IMPRESORA">IMPRESORA</option>
                                <option value="OTROS">OTROS</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Descripción:</label>
                            <input
                                type="text"
                                name="descripcion"
                                value={equipoSeleccionado.descripcion}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Estado:</label>
                            <select
                                name="estado"
                                value={equipoSeleccionado.estado}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            >
                                <option value="BUEN ESTADO">Buen estado</option>
                                <option value="NECESITA REVISION">Necesita revisión</option>
                                <option value="NECESITA MANTENIMIENTO">Necesita mantenimiento</option>
                                <option value="NECESITA REEMPLAZO">Necesita reemplazo</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showAgregarEquipo && (
                <AgregarEquipo handleCloseAgregarEquipo={handleCloseAgregarEquipo} fetchEquipos={fetchEquipos} />
            )}
        </div>
    );
};

export default GestionarEquipos;
