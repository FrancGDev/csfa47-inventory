
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcrypt"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: { label: 'Name', type: 'text', },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials.name || !credentials.password) {
                    throw new Error('Por favor ingrese usuario y contraseña.');
                }

                const user = await prisma.user.findUnique({
                    where: { name: credentials.name },
                });

                if (!user) {
                    throw new Error('Usuario no encontrado.');
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

                if (!passwordMatch) {
                    throw new Error('Contraseña incorrecta.');
                }

                return user;
            },

        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
};

const handle = NextAuth(authOptions);

export { handle as GET, handle as POST }