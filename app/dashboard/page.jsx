"use client";


import MainLayout from "../components/MainLayout";
import GestionarEquipos from "../components/gestionarEquipos";
import GestionarConjuntos from "../components/gestionarConjuntos";

const Dashboard = () => {
    return (
        <MainLayout>
            <GestionarEquipos />
            <GestionarConjuntos />
        </MainLayout>
    );
};

export default Dashboard;

