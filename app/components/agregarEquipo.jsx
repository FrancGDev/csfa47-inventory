"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const AgregarEquipo = ({ handleCloseAgregarEquipo }) => {
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("");
    const [estado, setEstado] = useState("BUEN_ESTADO");
    const [descripcion, setDescripcion] = useState("");

    const [errors, setErrors] = useState({
        nombre: "",
        tipo: "",
        estado: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ nombre: "", tipo: "", estado: "" });

        let hasError = false;

        if (!nombre.trim()) {
            setErrors((prev) => ({ ...prev, nombre: "El nombre del equipo es obligatorio." }));
            hasError = true;
        }

        if (!tipo.trim()) {
            setErrors((prev) => ({ ...prev, tipo: "El tipo de equipo es obligatorio." }));
            hasError = true;
        }

        if (!estado.trim()) {
            setErrors((prev) => ({ ...prev, estado: "El estado del equipo es obligatorio." }));
            hasError = true;
        }

        if (hasError) return;

        try {
            const response = await fetch("/api/equipos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    tipo,
                    estado,
                    descripcion: descripcion.trim() || null,
                }),
            });

            if (response.ok) {
                toast.success("Equipo agregado correctamente");
                setNombre("");
                setTipo("");
                setEstado("BUEN_ESTADO");
                setDescripcion("");
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Error al agregar el equipo");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            toast.error("Error interno del servidor");
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded shadow-lg p-6 relative w-full max-w-2xl">
                <h1 className="text-center text-4xl m-4 font-semibold">Agregar Equipo</h1>
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    <div>
                        <label className="text-lg font-medium">Nombre del equipo:</label>
                        <input
                            type="text"
                            className="border p-2 rounded w-full"
                            placeholder="Ejemplo: Teclado Logitech"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                    </div>

                    <div>
                        <label className="text-lg font-medium">Tipo de equipo:</label>
                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            className="border p-2 rounded w-full"
                        >
                            <option value="" disabled hidden>
                                Seleccione un tipo
                            </option>
                            <option value="PC">PC</option>
                            <option value="RATON">RATÓN</option>
                            <option value="TECLADO">TECLADO</option>
                            <option value="PARLANTES">PARLANTES</option>
                            <option value="MONITOR">MONITOR</option>
                            <option value="IMPRESORA">IMPRESORA</option>
                            <option value="OTROS">OTROS</option>
                        </select>

                        {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo}</p>}
                    </div>

                    <div>
                        <label className="text-lg font-medium">Estado del equipo:</label>
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            className="border p-2 rounded w-full"
                        >
                            <option value="BUEN ESTADO">Buen estado</option>
                            <option value="NECESITA REVISION">Necesita revisión</option>
                            <option value="NECESITA MANTENIMIENTO">Necesita mantenimiento</option>
                            <option value="NECESITA REEMPLAZO">Necesita reemplazo</option>
                        </select>
                        {errors.estado && <p className="text-red-500 text-sm">{errors.estado}</p>}
                    </div>

                    <div>
                        <label className="text-lg font-medium">Descripción (opcional):</label>
                        <textarea
                            className="border p-2 rounded w-full"
                            placeholder="Describe el equipo (opcional)"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={handleCloseAgregarEquipo}
                            className="bg-gray-500 text-white  px-4 py-2 rounded shadow-md hover:bg-gray-600 transition duration-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white  px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-200"
                        >
                            Agregar Equipo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgregarEquipo;
