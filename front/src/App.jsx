import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import UserAdmin from "./pages/Admin/User/UserAdmin";
import Profile from "./pages/Profile/Profile";
import ProfileUser from "./pages/Profile/ProfileUser";
import Projet from "./pages/Admin/Projet/Projet";
import Conge from "./pages/Admin/Conge/Conge";
import CongeUser from "./pages/User/Conge/Conge";
import "./App.css";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Departement from "./pages/Admin/Departement/Departement";
import DepartementEdit from "./pages/Admin/Departement/DepartementEdit";
import DepartementCreate from "./pages/Admin/Departement/DepartementCreate";
import Poste from "./pages/Admin/Poste/Poste";
import PosteCreate from "./pages/Admin/Poste/PosteCreate";
import PosteEdit from "./pages/Admin/Poste/PosteEdit";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes roles={["admin"]} />}>
          <Route path="/admin/user" element={<UserAdmin />} />
          <Route path="/admin/projet" element={<Projet />} />
          <Route path="/admin/conge" element={<Conge />} />
          <Route path="/admin/departements" element={<Departement />} />
          <Route path="/admin/departements/create" element={<DepartementCreate />} />
          <Route path="/admin/departements/edit/:id" element={<DepartementEdit />} />
          <Route path="/admin/postes" element={<Poste />} />
          <Route path="/admin/postes/create" element={<PosteCreate />} />
          <Route path="/admin/postes/edit/:id" element={<PosteEdit />} />

        </Route>
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile" element={<ProfileUser />} />
        <Route path="/conge" element={<CongeUser />} />
      </Routes>
    </>
  );
}

export default App;
