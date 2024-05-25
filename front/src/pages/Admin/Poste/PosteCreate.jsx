import React, { useState,useEffect } from "react";
import SideBar from "../../../Components/sidebar/SideBar";
import Navbar from "../../../Components/navbar/Navbar";
import Header from "../../../Components/header/Header";
import "./poste.css";
import { useDispatch, useSelector } from "react-redux";
import { addDepartement, getAllDepartements } from "../../../redux/slice/departementSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addPoste } from "../../../redux/slice/posteSlice";

function PosteCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDepartements());
  }, [dispatch]);
  const { departements, loading } = useSelector(
    (state) => state.departementReducer
  );

  console.log(departements)
  const [poste, setPoste] = useState({
    name: "",
    department: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response=await dispatch(addPoste(poste))
    if(response.type==="poste/addPoste/fulfilled"){
        toast.success("Poste ajouter avec succes")
        // navigate('/admin/postes')
        window.location.replace('/admin/postes')

    }
  };
  return (
    <div className="projetadmin flex_main color_main">
      <SideBar />
      <div className="projet main_details">
        <Navbar />
        <div className="projet_main main_padding">
          <Header title="Création du poste" />
          <form className="formulaire_create" onSubmit={handleSubmit}>
            <div className="form-grap">
              <div className="form-group">
                <label htmlFor="departement" className="label-input">
                  Nom du poste
                </label>
                <input
                  className={"is-invalid"}
                  type="text"
                  placeholder="ex. Professeur"
                  name="name"
                  onChange={(e) => setPoste({ ...poste, name: e.target.value })}
                  value={poste.name}
                  required
                  // onChange={(e) => setDepartement({ ...departement, name: e.target.value })}
                  // value={departement.name}
                />

                <h6></h6>
              </div>
              <div className="form-group">
                <label htmlFor="departement" className="label-input">
                  Nom du Departement
                </label>
                <select name="department" id="" required onChange={(e) => setPoste({ ...poste, department: e.target.value })}>
                  <option value="">Choisir</option>
                  {departements.map((departement) => {
                    return (
                      <option value={departement._id} key={departement._id}>
                        
                        {departement.name}
                      </option>
                    );
                  })}
                </select>

                <h6></h6>
              </div>
            </div>

            <button type="submit">Enregistrer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PosteCreate;
