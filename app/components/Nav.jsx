'use client'

import { signOut } from "next-auth/react";


export default function Nav() {
    return (
        <div class="h-screen w-60 bg-slate-800 text-white top-0 left-0 flex flex-col justify-between drop-shadow-[0_0px_6px_rgba(0,0,0,0.9)] z-20">
            <div>
                <div class="p-4 text-2xl font-semibold">
                    <a href="/">CSFA 47 INVENTARIO</a>
                </div>
                <nav class="mt-10 mx-2">
                    <a href="#" class="block py-3 px-4 my-2 rounded transition duration-200 hover:bg-sky-600 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]">
                        Ver Inventario
                    </a>
                    <a href="#" class="block py-3 px-4 my-2 rounded transition duration-200 hover:bg-sky-600 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]">
                        Agregar equipo
                    </a>
                    <a href="#" class="block py-3 px-4 my-2 rounded transition duration-200 hover:bg-sky-600 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]">
                        algo
                    </a>
                </nav>
            </div>
            <div>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        signOut();
                    }}
                    class="block py-3 px-4 m-2 rounded text-xl transition duration-200 hover:bg-red-500 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]"
                >
                    Cerrar Sesión
                </a>

            </div>
        </div>
    );
};
