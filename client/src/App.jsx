
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Medication from "./pages/Medication";
import Account from "./pages/Account";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import Admin from "./pages/Admin";
import Asha from "./pages/Asha";




const App = () =>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home"  element={<Home/>}/>
        <Route path = "/medication" element={<Medication/>}/>
        <Route path = "/account" element={<Account/>}/>
        <Route path = "/admin" element={<Admin/>}/>
        <Route path = "/adminr" element={<AdminRegister/>}/>
        <Route path = "/adminl" element={<AdminLogin/>}/>
        <Route path = "/asha" element={<Asha/>}/>
      </Routes>
    </Router>
    
    
  )
}

export default App;
