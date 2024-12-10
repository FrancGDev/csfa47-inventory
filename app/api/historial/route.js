import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const mantenimientos = await prisma.mantenimiento.findMany({
            include: {
                equipo: true, // Incluye la información del equipo asociado
            },
            orderBy: {
                fecha: 'desc', // Ordenar del más reciente al más antiguo
            },
        });

        return NextResponse.json(mantenimientos, { status: 200 });
    } catch (error) {
        console.error("Error al obtener el historial de mantenimiento:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
