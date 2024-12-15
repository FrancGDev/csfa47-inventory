import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';

const Conjuntos = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [equipos, setEquipos] = useState([]);
    const [selectedEquipos, setSelectedEquipos] = useState([]);

    const [conjuntos, setConjuntos] = useState([]);
    const [showCrearConjunto, setShowCrearConjunto] = useState(false);

    useEffect(() => {
        const fetchEquipos = async () => {
            const res = await fetch('/api/equipos');
            const data = await res.json();
            setEquipos(data);
        };

        fetchEquipos();
    }, []);


    useEffect(() => {
        const fetchConjuntos = async () => {
            const response = await fetch('/api/conjuntos');
            const data = await response.json();
            setConjuntos(data);
        };

        fetchConjuntos();
    }, []);

    const handleOpenCrearConjunto = () => setShowCrearConjunto(true);
    const handleCloseCrearConjunto = () => setShowCrearConjunto(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            name,
            description,
            equipos: selectedEquipos
        };

        const response = await fetch('/api/conjuntos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            toast.success("Conjunto creado con éxito");
            setShowCrearConjunto(false)

        } else {
            toast.error("Error al crear el conjunto");
        }
    };

    return (
        <>
            <section className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Conjuntos Armados</h1>
                    <button
                        onClick={handleOpenCrearConjunto}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 transition drop-shadow-[2px_3px_3px_rgba(0,0,0,0.3)]"
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
                            </tr>
                        </thead>
                        <tbody>
                            {conjuntos.length > 0 ? (
                                conjuntos.map((conjunto) => (
                                    <tr key={conjunto.id} className="border-b hover:bg-gray-100 ">
                                        <td className="p-3">{conjunto.id}</td>
                                        <td className="p-3">{conjunto.name}</td>
                                        <td className="p-3">{conjunto.description || 'Sin descripción'}</td>
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
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center px-4 py-2">
                                        No hay conjuntos armados para listar
                                    </td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </section>
            {showCrearConjunto && (
                <div className="fixed inset-0 bg-slate-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white rounded shadow-lg p-6 relative w-full max-w-2xl">
                        <section className="w-full flex flex-col items-center">
                            <h1 className="text-center text-4xl m-4 font-bold">Crear Conjunto</h1>

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
