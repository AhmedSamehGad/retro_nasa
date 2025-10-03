export default function Layout({ children}){
    return (
        <>
            <header>
                <h1>Navbar</h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
                &copy; 2025 Retro Team
            </footer>
        </>
    )
}