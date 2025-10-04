import { Outlet, Link } from "react-router-dom"
import Navbar from "../NavBar"

export default function Layout(){
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <footer>
                &copy; 2025 Retro Team
            </footer>
        </>
    )
}