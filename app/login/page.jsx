"use client"

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react"

export default function LoginPage() {
    const [error, setError] = useState('');

    const router = useRouter();
    const [data, setData] = useState({
        name: "",
        password: "",
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            ...data,
            redirect: false,
        });

        if (result?.error) {
            setError("Error en el inicio de sesión: " + result.error);
        } else {
            setError('');
            router.push("/dashboard");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
                {error && (
                    <div className="mb-4 text-red-500 text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={loginUser}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Usuario</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.name}
                            onChange={(e) => {
                                setData({ ...data, name: e.target.value })
                            }}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.password}
                            onChange={(e) => {
                                setData({ ...data, password: e.target.value })
                            }}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

