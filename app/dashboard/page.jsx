"use client";


import MainLayout from "../components/MainLayout";
import toast from "react-hot-toast";
import CrearConjunto from "../components/crearConjunto";
import ListarEquipos from "../components/listarEquipos";

import React, { useState, useEffect } from "react";

const Dashboard = () => {
    const [conjuntos, setConjuntos] = useState([]);

    useEffect(() => {
        const fetchConjuntos = async () => {
            const response = await fetch('/api/conjuntos');
            const data = await response.json();
            setConjuntos(data);
        };

        fetchConjuntos();
    }, []);
    return (
        <MainLayout>
            <ListarEquipos />

            <section className="p-6">
                <h1 className="text-3xl font-bold mb-4">Conjuntos Armados</h1>


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
                            {conjuntos.map((conjunto) => (
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <CrearConjunto />
        </MainLayout>
    );
};

export default Dashboard;

