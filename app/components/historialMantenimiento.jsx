"use client";

import { useEffect, useState } from "react";


const HistorialMantenimiento = () => {
    const [historial, setHistorial] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const response = await fetch('/api/historial');
                const data = await response.json();

                if (response.ok) {
                    setHistorial(data);
                } else {
                    console.error("Error al obtener el historial:", data.error);
                }
            } catch (error) {
                console.error("Error al cargar el historial:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistorial();
    }, []);

    if (loading) {
        return <><p>Cargando historial de mantenimiento...</p></>
    }

    if (historial.length === 0) {
        return <><p>No hay registros de mantenimiento.</p></>
    }

    return (
        <section className="py-16">
            <h1 className="text-2xl font-bold mb-4">Historial de Mantenimiento</h1>
            <div className="overflow-x-auto bg-white rounded shadow-lg">

                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-400">
                            <th className=" border-gray-300 p-2">ID</th>
                            <th className=" border-gray-300 p-2">Equipo</th>
                            <th className=" border-gray-300 p-2">Falla</th>
                            <th className=" border-gray-300 p-2">Acciones Realizadas</th>
                            <th className=" border-gray-300 p-2">Estado Final</th>
                            <th className=" border-gray-300 p-2">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial.map((registro) => (
                            <tr key={registro.id} className="hover:bg-gray-100 border-b">
                                <td className=" border-gray-300 p-2">{registro.id}</td>
                                <td className=" border-gray-300 p-2">{`${registro.equipo.id} - ${registro.equipo.nombre}`}</td>
                                <td className=" border-gray-300 p-2">{registro.falla}</td>
                                <td className=" border-gray-300 p-2">{registro.acciones}</td>
                                <td className=" border-gray-300 p-2">{registro.equipo.estado}</td>
                                <td className=" border-gray-300 p-2">{new Date(registro.fecha).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

    );
};

export default HistorialMantenimiento;
