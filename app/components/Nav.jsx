'use client'

import { signOut } from "next-auth/react";
import Link from 'next/link';


export default function Nav() {
    return (
        <div className="h-screen w-60 bg-zinc-900 text-white top-0 left-0 flex flex-col justify-between drop-shadow-[0_0px_6px_rgba(0,0,0,0.9)] z-20 fixed">
            <div>
                <div className="p-4 text-2xl font-semibold">
                    <a href="/dashboard">CSFA 47 INVENTARIO</a>
                </div>
                <nav className="mt-10 mx-2">

                    <Link href="/dashboard" className="block py-3 px-4 my-4 rounded transition duration-100 bg-blue-800 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]  hover:scale-[1.02]">
                        Pagina Principal
                    </Link>
                    <Link href="/agregarEquipo" className="block py-3 px-4 my-4 rounded transition duration-100 bg-blue-800 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]  hover:scale-[1.02]">
                        Agregar Equipo
                    </Link>
                    <Link href="/mantenimiento" className="block py-3 px-4 my-4 rounded transition duration-100 bg-blue-800 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]  hover:scale-[1.02]">
                        Mantenimiento
                    </Link>
                    <Link href="/historialMantenimiento" className="block py-3 px-4 my-4 rounded transition duration-100 bg-blue-800 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]  hover:scale-[1.02]">
                        Historial Mantenimiento
                    </Link>
                </nav>
            </div>
            <div>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        signOut({ callbackUrl: '/login' });
                    }}
                    className="block py-3 px-4 m-2 rounded text-xl transition duration-100 bg-red-500 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)] hover:scale-[1.02]"
                >
                    Cerrar Sesión
                </a>

            </div>
        </div>
    );
};
