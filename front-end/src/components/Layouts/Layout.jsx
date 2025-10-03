import { Outlet, Link } from "react-router-dom"

export default function Layout(){
    return (
        <>
            <header className="p-4 bg-gray-900 text-white">
                <nav className="max-w-6xl mx-auto flex items-center justify-between">
                    <h1 className="text-lg font-semibold">Retro NASA</h1>
                    <div className="space-x-4">
                        <Link to="/" className="hover:underline">Home</Link>
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/register" className="hover:underline">Register</Link>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                &copy; 2025 Retro Team
            </footer>
        </>
    )
}