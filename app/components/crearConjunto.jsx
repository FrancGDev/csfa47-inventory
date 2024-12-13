import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';

const CrearConjunto = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [equipos, setEquipos] = useState([]);
    const [selectedEquipos, setSelectedEquipos] = useState([]);

    useEffect(() => {
        // Fetch equipos para mostrar en el formulario
        const fetchEquipos = async () => {
            const res = await fetch('/api/equipos');
            const data = await res.json();
            setEquipos(data);
        };

        fetchEquipos();
    }, []);

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

        } else {
            toast.error("Error al crear el conjunto");
        }
    };

    return (
        <section className=" h-full w-full flex flex-col items-center">
            <div className="">
                <h1 className="text-center text-4xl m-4 font-bold">Crear Conjunto</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <div>
                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                        >
                            Crear Conjunto
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CrearConjunto;
