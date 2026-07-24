import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"

function Layout(){
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                <Sidebar/>

                <main className="flex-1 p-8">
                    <Outlet/>    
                </main>
            </div>
        </div>
    )
}

export default Layout