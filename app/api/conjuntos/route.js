import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, description, equipos } = body;

        if (!name || !equipos || equipos.length === 0) {
            return NextResponse.json({ error: "Faltan campos obligatorios o no hay equipos seleccionados" }, { status: 400 });
        }

        const newConjunto = await prisma.conjunto.create({
            data: {
                name,
                description,
            },
        });

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

export async function GET() {
    try {
        const conjuntos = await prisma.conjunto.findMany({
            include: {
                equipos: {
                    include: {
                        equipo: true,
                    },
                },
            },
        });

        const formattedConjuntos = conjuntos.map(conjunto => ({
            id: conjunto.id,
            name: conjunto.name,
            description: conjunto.description,
            equipos: conjunto.equipos.map(rel => ({
                id: rel.equipo.id,
                name: rel.equipo.nombre,
            })),
        }));

        return NextResponse.json(formattedConjuntos, { status: 200 });
    } catch (error) {
        console.error("Error al obtener los conjuntos:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
