import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { Outlet } from 'react-router-dom';
export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    return(
        <>
            <div className={`flex flex-col min-h-screen ${darkMode ? "dark" : ""}`}>
                <Navbar
                    darkMode={darkMode} 
                    toggleDarkMode={() => setDarkMode(!darkMode)} 
                />
                <main className="flex-grow dark:bg-gray-800">
                    <Outlet/>
                </main>
                <Footer />
            </div>
            
        </>
    )
    
}
