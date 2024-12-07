import Nav from "../components/Nav";


export const metadata = {
  title: "CSFA 47 - INVENTARIO",
};

export default function Layout({ children }) {
  return (
    <>
      <body class="flex">
        <Nav />
        <div class="text-md">
          {children}
        </div>
      </body>
    </>
  );
}
