"use client";

import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import toast from "react-hot-toast";

const AddEquipment = () => {
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("");
    const [estado, setEstado] = useState("BUEN_ESTADO");
    const [descripcion, setDescripcion] = useState("");
    const [conjuntoId, setConjuntoId] = useState("");

    const [errors, setErrors] = useState({
        nombre: "",
        tipo: "",
        estado: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ nombre: "", tipo: "", estado: "" });

        let hasError = false;

        // Validación de campos
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
                    descripcion: descripcion.trim() || null, // Descripción opcional
                    conjuntoId: conjuntoId ? parseInt(conjuntoId) : null, // Conjunto opcional
                }),
            });

            if (response.ok) {
                toast.success("Equipo agregado correctamente");
                setNombre("");
                setTipo("");
                setEstado("BUEN_ESTADO");
                setDescripcion("");
                setConjuntoId("");
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
        <MainLayout>
            <section className="p-4 h-full w-full flex flex-col items-center">
                <h1 className="text-center text-4xl m-4 font-bold">Agregar Equipo</h1>
                <form
                    onSubmit={handleSubmit}
                    className="m-4 w-full max-w-4xl bg-white drop-shadow-[2px_3px_3px_rgba(0,0,0,0.3)]"
                >
                    {/* Campo Nombre */}
                    <div className="m-4">
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

                    {/* Campo Tipo */}
                    <div className="m-4">
                        <label className="text-lg font-medium">Tipo de equipo:</label>
                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            className="border p-2 rounded w-full"
                        >
                            <option value="PC">PC</option>
                            <option value="RATON">RATON</option>
                            <option value="TECLADO">TECLADO</option>
                            <option value="PARLANTES">PARLANTES</option>
                            <option value="MONITOR">MONITOR</option>
                            <option value="IMPRESORA">IMPRESORA</option>
                            <option value="OTROS">OTROS</option>
                        </select>
                        {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo}</p>}
                    </div>

                    {/* Campo Estado */}
                    <div className="m-4">
                        <label className="text-lg font-medium">Estado del equipo:</label>
                        <select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            className="border p-2 rounded w-full"
                        >
                            <option value="BUEN_ESTADO">Buen estado</option>
                            <option value="NECESITA_REVISION">Necesita revisión</option>
                            <option value="NECESITA_REEMPLAZO">Necesita reemplazo</option>
                        </select>
                        {errors.estado && <p className="text-red-500 text-sm">{errors.estado}</p>}
                    </div>

                    {/* Campo Descripción */}
                    <div className="m-4">
                        <label className="text-lg font-medium">Descripción (opcional):</label>
                        <textarea
                            className="border p-2 rounded w-full"
                            placeholder="Describe el equipo (opcional)"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    {/* Campo Conjunto ID */}
                    <div className="m-4">
                        <label className="text-lg font-medium">Conjunto ID (opcional):</label>
                        <input
                            type="number"
                            className="border p-2 rounded w-full"
                            placeholder="Ejemplo: 1"
                            value={conjuntoId}
                            onChange={(e) => setConjuntoId(e.target.value)}
                        />
                    </div>

                    {/* Botón de enviar */}
                    <div className="m-4">
                        <button
                            type="submit"
                            className="p-2 w-full bg-gradient-to-r from-green-500 to-blue-500 text-white rounded drop-shadow-[2px_4px_0px_rgba(0,0,0,0.8)] active:drop-shadow-none transition duration-200 ease-out active:translate-y-[3px]"
                        >
                            Agregar Equipo
                        </button>
                    </div>
                </form>
            </section>
        </MainLayout>
    );
};

export default AddEquipment;
