import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
    const { id } = params;

    try {
        const body = await request.json();
        const { name, description, equipos } = body;

        // Validar que los campos requeridos estén presentes
        if (!name || !equipos || !Array.isArray(equipos) || equipos.some((e) => typeof e !== "number")) {
            return NextResponse.json(
                { error: "Faltan campos obligatorios o el formato de equipos no es válido" },
                { status: 400 }
            );
        }

        // Actualizar el conjunto
        const conjuntoActualizado = await prisma.conjunto.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
            },
        });

        // Eliminar relaciones actuales
        await prisma.conjuntoEquipo.deleteMany({
            where: { conjuntoId: parseInt(id) },
        });

        // Crear nuevas relaciones
        const nuevoConjuntoEquipos = equipos.map((equipoId) => ({
            conjuntoId: parseInt(id),
            equipoId, // Aquí ya esperamos solo IDs
        }));

        await prisma.conjuntoEquipo.createMany({
            data: nuevoConjuntoEquipos,
        });

        return NextResponse.json(conjuntoActualizado, { status: 200 });
    } catch (error) {
        console.error("Error al actualizar el conjunto:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        // Eliminar las relaciones de conjunto y equipo
        await prisma.conjuntoEquipo.deleteMany({
            where: { conjuntoId: parseInt(id) },
        });

        // Eliminar el conjunto
        const conjuntoEliminado = await prisma.conjunto.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json(conjuntoEliminado, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar el conjunto:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}