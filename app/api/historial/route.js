import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const mantenimientos = await prisma.mantenimiento.findMany({
            include: {
                equipo: true,
            },
            orderBy: {
                fecha: 'desc',
            },
        });

        return NextResponse.json(mantenimientos, { status: 200 });
    } catch (error) {
        console.error("Error al obtener el historial de mantenimiento:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
