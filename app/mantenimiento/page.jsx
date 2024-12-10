"use client"

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import MainLayout from '../components/MainLayout';

const Mantenimiento = () => {
    const [equipos, setEquipos] = useState([]);
    const [selectedEquipo, setSelectedEquipo] = useState('');
    const [falla, setFalla] = useState('');
    const [acciones, setAcciones] = useState('');
    const [estado, setEstado] = useState('');

    useEffect(() => {
        const fetchEquipos = async () => {
            const response = await fetch('/api/mantenimiento');
            const data = await response.json();
            setEquipos(data);
        };
        fetchEquipos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedEquipo || !falla.trim() || !acciones.trim() || !estado) {
            toast.error('Por favor, completa todos los campos');
            return;
        }

        try {
            const response = await fetch('/api/mantenimiento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    equipoId: Number(selectedEquipo), // Asegurarnos de que sea un número
                    falla,
                    acciones,
                    estado,
                }),
            });

            if (response.ok) {
                toast.success('Mantenimiento registrado con éxito');
                setSelectedEquipo('');
                setFalla('');
                setAcciones('');
                setEstado('');
                // Refrescar la lista de equipos
                const updatedEquipos = equipos.filter(e => e.id !== Number(selectedEquipo));
                setEquipos(updatedEquipos);
            } else {
                toast.error('Error al registrar el mantenimiento');
            }
        } catch (error) {
            toast.error('Error al registrar el mantenimiento');
            console.error(error);
        }
    };



    return (
        <MainLayout>

            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Mantenimiento</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-lg font-medium mb-1">Equipo:</label>
                        <select
                            value={selectedEquipo}
                            onChange={(e) => setSelectedEquipo(Number(e.target.value))} // Convertir a número
                            className="border rounded p-2 w-full"
                        >
                            <option value="">Selecciona un equipo</option>
                            {equipos.map((equipo) => (
                                <option key={equipo.id} value={equipo.id}>
                                    {`${equipo.id} - ${equipo.nombre}`}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-1">Falla:</label>
                        <textarea
                            value={falla}
                            onChange={(e) => setFalla(e.target.value)}
                            className="border rounded p-2 w-full"
                            placeholder="Describe la falla"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-1">Acciones realizadas:</label>
                        <textarea
                            value={acciones}
                            onChange={(e) => setAcciones(e.target.value)}
                            className="border rounded p-2 w-full"
                            placeholder="Describe las acciones realizadas"
                        />
                    </div>
                    <div>

                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            className="border rounded p-2 w-full"
                        >
                            <option value="BUEN ESTADO">Buen estado</option>
                            <option value="NECESITA REVISION">Necesita revisión</option>
                            <option value="NECESITA MANTENIMIENTO">Necesita mantenimiento</option>
                            <option value="NECESITA REEMPLAZO">Necesita reemplazo</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Registrar Mantenimiento
                    </button>
                </form>
            </div>
        </MainLayout>
    );
};

export default Mantenimiento;
