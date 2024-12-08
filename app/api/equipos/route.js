import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        // Obtener la sesión del usuario
        const session = await getServerSession(authOptions);

        if (!session || !session.user.id) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        // Leer datos del cuerpo de la solicitud
        const body = await request.json();
        const { nombre, tipo, descripcion, estado, conjuntoId } = body;

        // Validar campos obligatorios
        if (!nombre || !tipo || !estado) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        // Crear el equipo en la base de datos
        const nuevoEquipo = await prisma.equipo.create({
            data: {
                nombre,
                tipo,
                descripcion,
                estado,
                conjuntoId: conjuntoId ? parseInt(conjuntoId) : null, // Relación opcional
            },
        });

        return NextResponse.json(nuevoEquipo, { status: 201 });
    } catch (error) {
        console.error("Error al agregar el equipo:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
