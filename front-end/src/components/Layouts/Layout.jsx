<<<<<<< HEAD
import { Outlet, Link } from "react-router-dom"
import Navbar from "../NavBar"
=======
import { Outlet } from "react-router-dom"
>>>>>>> editAuthFE

export default function Layout(){
    return (
        <>
<<<<<<< HEAD
            <Navbar />
=======
            
>>>>>>> editAuthFE
            <main>
                <Outlet />
            </main>
            <footer>
                &copy; 2025 Retro Team
            </footer>
        </>
    )
}