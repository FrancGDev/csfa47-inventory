"use client";


import MainLayout from "../components/MainLayout";
import ListarEquipos from "../components/listarEquipos";

import Conjuntos from "../components/conjuntos";

const Dashboard = () => {
    return (
        <MainLayout>
            <ListarEquipos />
            <Conjuntos />
        </MainLayout>
    );
};

export default Dashboard;

