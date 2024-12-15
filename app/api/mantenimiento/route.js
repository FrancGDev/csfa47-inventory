import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const equiposEnMantenimiento = await prisma.equipo.findMany({
            where: {
                estado: {
                    in: ['NECESITA REVISION', 'NECESITA MANTENIMIENTO', 'NECESITA REEMPLAZO'],
                },
            },
        });
        return NextResponse.json(equiposEnMantenimiento, { status: 200 });
    } catch (error) {
        console.error("Error al obtener equipos en mantenimiento:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { equipoId, falla, acciones, estado, } = body;

        if (!equipoId || !falla || !acciones || !estado) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        // Agregar registro de mantenimiento
        await prisma.mantenimiento.create({
            data: {
                equipoId,
                falla,
                acciones,
                estadoDejado: estado
            },
        });

        // Actualizar estado del equipo
        await prisma.equipo.update({
            where: { id: equipoId },
            data: { estado },
        });

        return NextResponse.json({ message: "Mantenimiento registrado con éxito" }, { status: 201 });
    } catch (error) {
        console.error("Error al registrar mantenimiento:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}




