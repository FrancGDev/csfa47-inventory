
import Nav from './Nav';

export default function MainLayout({ children }) {
    return (
        <section className="flex">
            <Nav />
            <div className="text-md ml-60 flex-1">
                {children}
            </div>
        </section>
    );
}
