import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate 
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import ClientesDetails from "./pages/ClientDetails";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Navigate to={"/dashboard"} replace/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/clientes" element={<Clients/>}/>
          <Route path="/clientes/:id" element={<ClientesDetails/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App