"use client";

import { useEffect, useState } from "react";

const HistorialMantenimiento = () => {
    const [historial, setHistorial] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

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
        return <section className="py-16"><p>Cargando historial de mantenimiento...</p></section>
    }

    if (historial.length === 0) {
        return <section className="py-16"><p>No hay registros de mantenimiento.</p></section>
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = historial.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(historial.length / itemsPerPage);




    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Historial de Mantenimiento</title>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h1>Historial de Mantenimiento</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Equipo</th>
                                <th>Falla</th>
                                <th>Acciones Realizadas</th>
                                <th>Estado Final</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${historial.map((registro) => `
                                <tr>
                                    <td>${registro.id}</td>
                                    <td>${registro.equipo.id} - ${registro.equipo.nombre}</td>
                                    <td>${registro.falla}</td>
                                    <td>${registro.acciones}</td>
                                    <td>${registro.estadoDejado}</td>
                                    <td>${new Date(registro.fecha).toLocaleString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <section className="py-16">
            <div className="flex justify-between items-center mb-4">

                <h1 className="text-2xl font-bold">Historial de Mantenimiento</h1>
                <button
                    onClick={handlePrint}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Imprimir
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded shadow-lg">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-400">
                            <th className="border-gray-300 p-2">ID</th>
                            <th className="border-gray-300 p-2">Equipo</th>
                            <th className="border-gray-300 p-2">Falla</th>
                            <th className="border-gray-300 p-2">Acciones Realizadas</th>
                            <th className="border-gray-300 p-2">Estado Final</th>
                            <th className="border-gray-300 p-2">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((registro) => (
                            <tr key={registro.id} className="hover:bg-gray-100 border-b">
                                <td className="border-gray-300 p-2">{registro.id}</td>
                                <td className="border-gray-300 p-2">{`${registro.equipo.id} - ${registro.equipo.nombre}`}</td>
                                <td className="border-gray-300 p-2">{registro.falla}</td>
                                <td className="border-gray-300 p-2">{registro.acciones}</td>
                                <td className="border-gray-300 p-2">{registro.estadoDejado}</td>
                                <td className="border-gray-300 p-2">{new Date(registro.fecha).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-200 hover:bg-blue-400 rounded"
                >
                    Anterior
                </button>
                <span className="px-4 py-2">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-200 hover:bg-blue-400 rounded"
                >
                    Siguiente
                </button>
            </div>

        </section>
    );
};

export default HistorialMantenimiento;
