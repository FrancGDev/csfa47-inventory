import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
    const { id } = params;
    try {
        const data = await req.json();
        const equipoActualizado = await prisma.equipo.update({
            where: { id: parseInt(id) },
            data: {
                nombre: data.nombre,
                tipo: data.tipo,
                descripcion: data.descripcion,
                estado: data.estado,
            },
        });
        return NextResponse.json(equipoActualizado, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error actualizando el equipo' }, { status: 500 });
    }
}
export async function DELETE(req, { params }) {
    const { id } = params;
    try {
        await prisma.conjuntoEquipo.deleteMany({
            where: { equipoId: parseInt(id) },
        });

        const equipoEliminado = await prisma.equipo.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json(equipoEliminado, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error eliminando el equipo' }, { status: 500 });
    }
}
