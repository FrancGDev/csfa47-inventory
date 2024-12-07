import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, password } = body?.data || {};
        console.log(body.data);

        if (!name || !password) {
            return NextResponse.json({ error: "Falta usuario o contraseña" }, { status: 400 });
        }

        const exist = await prisma.user.findUnique({
            where: {
                name: name
            }
        });

        if (exist) {
            return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                hashedPassword
            }
        });

        return NextResponse.json(user);

    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
