import { Outlet, Link } from "react-router-dom"
import NAV from "../NAV.jsx" 

export default function Layout(){
    return (
        <>

<NAV />
            <main>
                <Outlet />
            </main>
            <footer>
                &copy; 2025 Retro Team
            </footer>
        </>
    )
}



