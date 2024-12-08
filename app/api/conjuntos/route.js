import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user.id) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const body = await request.json();
        const { name, description, equipos } = body;

        if (!name || !equipos || equipos.length === 0) {
            return NextResponse.json({ error: "Faltan campos obligatorios o no hay equipos seleccionados" }, { status: 400 });
        }

        // Crear el conjunto
        const newConjunto = await prisma.conjunto.create({
            data: {
                name,
                description,
            },
        });

        // Crear las relaciones en ConjuntoEquipo
        const conjuntoEquipos = equipos.map(equipoId => ({
            conjuntoId: newConjunto.id,
            equipoId,
        }));

        await prisma.conjuntoEquipo.createMany({
            data: conjuntoEquipos,
        });

        return NextResponse.json(newConjunto, { status: 201 });
    } catch (error) {
        console.error("Error al crear el conjunto:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
