import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/context/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CSFA 47",
  description: "Sistema de gestión de inventario del colegio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}