import { Outlet } from "react-router-dom"

export default function Layout(){
    return (
        <>
            <header>
                <h1>Navbar</h1>
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