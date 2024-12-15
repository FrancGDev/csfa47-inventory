import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { nombre, tipo, descripcion, estado } = body;

        if (!nombre || !tipo || !estado) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        const nuevoEquipo = await prisma.equipo.create({
            data: {
                nombre,
                tipo,
                descripcion,
                estado,
            },
        });

        return NextResponse.json(nuevoEquipo, { status: 201 });
    } catch (error) {
        console.error("Error al agregar el equipo:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const tipo = url.searchParams.get("tipo");
        const estado = url.searchParams.get("estado");

        const filters = {};
        if (tipo) {
            filters.tipo = tipo;
        }
        if (estado) {
            filters.estado = estado;
        }

        const equipos = await prisma.equipo.findMany({
            where: filters,
        });

        return NextResponse.json(equipos, { status: 200 });
    } catch (error) {
        console.error("Error al obtener los equipos:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}