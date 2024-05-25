import React, { useState } from 'react'
import SideBar from '../../../Components/sidebar/SideBar'
import Navbar from '../../../Components/navbar/Navbar'
import Header from '../../../Components/header/Header'
import './departement.css'
import {useDispatch} from "react-redux"
import { addDepartement } from '../../../redux/slice/departementSlice'
import  {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
function DepartementCreate() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [departement, setDepartement] = useState({
        name: "",
    });
const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(departement)
    const response=await dispatch(addDepartement(departement))
    if(response.type==="departement/addDepartement/fulfilled"){
        toast.success("Departement ajouter avec succes")
        navigate('/admin/departements')

    }
}
  return (
    <div className="projetadmin flex_main color_main">
    <SideBar/>
    <div className="projet main_details">
          <Navbar/>
          <div className="projet_main main_padding">
          <Header title="Gestion des départements"/>
          <form className="formulaire_create" onSubmit={handleSubmit}>
       
        <div className="form-grap">
          <div className="form-group">
            <label htmlFor="departement" className="label-input">
              Nom du département
            </label>
            <input
              className={"is-invalid"}
              type="text"
              placeholder="ex. Mariem"
              name="name"
              onChange={(e) => setDepartement({ ...departement, name: e.target.value })}
              value={departement.name}
            />
          
            <h6></h6>
           
          </div>
        </div>

        <button type="submit">Enregistrer</button>
      </form>
        </div>
      
    </div>
  </div>
  )
}

export default DepartementCreate
