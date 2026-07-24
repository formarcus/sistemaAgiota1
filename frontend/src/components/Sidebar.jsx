import { NavLink } from "react-router-dom"

function Sidebar() {
    {/* Sidebar */ }

    const links = [
        {
            name: "Dashboard",
            path: "/dashboard"
        },
        {
            name: "Clientes",
            path: "clientes"
        },
        {
            name: "Dívidas",
            path: "/dividas"
        },
        {
            name: "Pagamentos",
            path: "/pagamentos"
        }
    ]

    return (

        <aside className="w-64 min-h-screen bg-gray-900 text-white">

            <div className="p-6">

                <h1 className="text-xl font-bold">
                    Controle de Dívidas
                </h1>

            </div>

            <nav className="px-4">
                {links.map(link => (
                <NavLink 
                    key={link.path} 
                    to={link.path} className={({isActive}) => 
                        `
                            mb-2 block rounded-lg px-4 py-3 ${
                                isActive ? "bg-gray-700" 
                                         : "hover:bg-gray-800" 
                            }
                        
                        `
                    }
                >
                    {link.name}
                </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar