import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';

const Conjuntos = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [equipos, setEquipos] = useState([]);
    const [selectedEquipos, setSelectedEquipos] = useState([]);
    const [conjuntos, setConjuntos] = useState([]);
    const [showCrearConjunto, setShowCrearConjunto] = useState(false);
    const [conjuntoSeleccionado, setConjuntoSeleccionado] = useState(null);
    const [modalConjuntoVisible, setModalConjuntoVisible] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        fetchData('/api/equipos', setEquipos);
        fetchData('/api/conjuntos', setConjuntos);
    }, []);

    const fetchData = async (url, setter) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setter(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
        }
    };

    const handleOpenCrearConjunto = () => setShowCrearConjunto(true);
    const handleCloseCrearConjunto = () => setShowCrearConjunto(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = { name, description, equipos: selectedEquipos };
        const response = await fetch('/api/conjuntos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            toast.success("Conjunto creado con éxito");
            setShowCrearConjunto(false);
            fetchData('/api/conjuntos', setConjuntos);
        } else {
            toast.error("Error al crear el conjunto");
        }
    };

    const handleEditConjunto = (conjunto) => {
        setConjuntoSeleccionado(conjunto);
        setModalConjuntoVisible(true);
    };

    const handleCloseConjuntoModal = () => {
        setModalConjuntoVisible(false);
        setConjuntoSeleccionado(null);
    };

    const handleSaveConjunto = async () => {
        try {
            const equiposIds = conjuntoSeleccionado.equipos.map(equipo => equipo.id);
            const response = await updateConjunto(conjuntoSeleccionado.id, {
                name: conjuntoSeleccionado.name,
                description: conjuntoSeleccionado.description,
                equipos: equiposIds,
            });

            if (response.ok) {
                toast.success("Conjunto actualizado correctamente");
                setModalConjuntoVisible(false);
                setConjuntoSeleccionado(null);
                fetchData('/api/conjuntos', setConjuntos);
            } else {
                toast.error("Error al actualizar el conjunto");
            }
        } catch (error) {
            toast.error("Error al actualizar el conjunto");
            console.error("Error:", error);
        }
    };

    const updateConjunto = async (id, data) => {
        return await fetch(`/api/conjuntos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    };

    const handleInputChangeConjunto = (e) => {
        const { name, value } = e.target;
        setConjuntoSeleccionado(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEquiposChange = (selectedEquipos) => {
        setConjuntoSeleccionado(prevState => ({ ...prevState, equipos: selectedEquipos }));
    };

    const handleDeleteConjunto = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este conjunto?");
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/conjuntos/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    toast.success("Conjunto eliminado con éxito");
                    fetchData('/api/conjuntos', setConjuntos);
                } else {
                    toast.error("Error al eliminar el conjunto");
                }
            } catch (error) {
                console.error("Error al eliminar el conjunto:", error);
                toast.error("Error al eliminar el conjunto");
            }
        }
    };



    const indexOfLastConjunto = currentPage * itemsPerPage;
    const indexOfFirstConjunto = indexOfLastConjunto - itemsPerPage;
    const currentConjuntos = conjuntos.slice(indexOfFirstConjunto, indexOfLastConjunto);

    const totalPages = Math.ceil(conjuntos.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    return (
        <>
            <section className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Conjuntos De Equipos Armados</h1>
                    <button
                        onClick={handleOpenCrearConjunto}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition shadow-lg"
                    >
                        Crear Conjunto
                    </button>
                </div>

                <div className="overflow-x-auto bg-white rounded shadow-lg">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-400 text-white">
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Nombre</th>
                                <th className="p-3 text-left">Descripción</th>
                                <th className="p-3 text-left">Equipos</th>
                                <th className="p-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentConjuntos.length > 0 ? (
                                currentConjuntos.map((conjunto) => (
                                    <tr key={conjunto.id} className="border-b hover:bg-gray-100">
                                        <td className="p-3">{conjunto.id}</td>
                                        <td className="p-3">{conjunto.name}</td>
                                        <td className="p-3">{conjunto.description || "Sin descripción"}</td>
                                        <td className="p-3">
                                            {conjunto.equipos.length > 0 ? (
                                                <ul className="list-disc list-inside">
                                                    {conjunto.equipos.map((equipo) => (
                                                        <li key={equipo.id} className="text-gray-700">
                                                            ID: {equipo.id} - {equipo.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span className="text-gray-500">Sin equipos</span>
                                            )}
                                        </td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => handleEditConjunto(conjunto)}
                                                className="text-blue-500 hover:text-blue-700 mr-2"
                                                title="Editar conjunto"
                                            >
                                                <span className="material-icons">edit_square</span>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteConjunto(conjunto.id)}
                                                className="text-red-500 hover:text-red-700"
                                                title="Eliminar conjunto"
                                            >
                                                <span className="material-icons">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center px-4 py-2">
                                        No hay conjuntos armados para listar
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-200 hover:bg-blue-400 rounded"
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage * itemsPerPage >= conjuntos.length}
                        className="px-4 py-2 bg-blue-200 hover:bg-blue-400 rounded"
                    >
                        Siguiente
                    </button>
                </div>
            </section>
            {modalConjuntoVisible && conjuntoSeleccionado && (
                <div className="fixed inset-0 bg-slate-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
                        <h2 className="text-xl font-bold mb-4">Editar Conjunto</h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveConjunto();
                            }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-lg font-medium text-gray-700">Nombre del conjunto:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={conjuntoSeleccionado.name}
                                    onChange={handleInputChangeConjunto}
                                    required
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nombre del conjunto"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-lg font-medium text-gray-700">Descripción:</label>
                                <textarea
                                    name="description"
                                    value={conjuntoSeleccionado.description || ""}
                                    onChange={handleInputChangeConjunto}
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Descripción opcional"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-lg font-medium text-gray-700">Seleccionar Equipos:</label>
                                <div className="space-y-2">
                                    {equipos.map((equipo) => (
                                        <div key={equipo.id} className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                checked={conjuntoSeleccionado.equipos.some((e) => e.id === equipo.id)}
                                                onChange={(e) => {
                                                    const isSelected = e.target.checked;
                                                    let updatedEquipos = [...conjuntoSeleccionado.equipos];

                                                    if (isSelected) {
                                                        updatedEquipos.push(equipo);
                                                    } else {
                                                        updatedEquipos = updatedEquipos.filter((e) => e.id !== equipo.id);
                                                    }

                                                    handleEquiposChange(updatedEquipos);
                                                }}
                                                className="h-5 w-5 text-blue-500 focus:ring-blue-500"
                                            />
                                            <div className="flex items-center space-x-3">
                                                <span className="text-gray-800 font-medium">ID: {equipo.id}</span>
                                                <span className="text-gray-800">{equipo.nombre}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCloseConjuntoModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showCrearConjunto && (
                <div className="fixed inset-0 bg-slate-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white rounded shadow-lg p-6 relative w-full max-w-2xl">
                        <section className="w-full flex flex-col items-center">
                            <h1 className="text-center text-4xl m-4 font-semibold">Crear Conjunto</h1>

                            <form onSubmit={handleSubmit} className="space-y-6 w-full">
                                <div className="space-y-2">
                                    <label className="text-lg font-medium text-gray-700">Nombre del conjunto:</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nombre del conjunto"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-lg font-medium text-gray-700">Descripción:</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Descripción opcional"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-lg font-medium text-gray-700">Seleccionar Equipos:</label>
                                    <div className="space-y-2">
                                        {equipos.map((equipo) => (
                                            <div key={equipo.id} className="flex items-center space-x-3">
                                                <input
                                                    type="checkbox"
                                                    value={equipo.id}
                                                    onChange={(e) => {
                                                        const newSelectedEquipos = [...selectedEquipos];
                                                        if (e.target.checked) {
                                                            newSelectedEquipos.push(equipo.id);
                                                        } else {
                                                            const index = newSelectedEquipos.indexOf(equipo.id);
                                                            newSelectedEquipos.splice(index, 1);
                                                        }
                                                        setSelectedEquipos(newSelectedEquipos);
                                                    }}
                                                    className="h-5 w-5 text-blue-500 focus:ring-blue-500"
                                                />
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-gray-800 font-medium">ID: {equipo.id}</span>
                                                    <span className="text-gray-800">{equipo.nombre}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        onClick={handleCloseCrearConjunto}
                                        className="bg-gray-500 text-white  px-4 py-2 rounded shadow-md hover:bg-gray-600 transition duration-200"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white  px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-200"
                                    >
                                        Crear Conjunto
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            )}

        </>
    );
};

export default Conjuntos;
