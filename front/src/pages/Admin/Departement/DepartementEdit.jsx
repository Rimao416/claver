import React, { useEffect, useState } from 'react'
import SideBar from '../../../Components/sidebar/SideBar'
import Navbar from '../../../Components/navbar/Navbar'
import Header from '../../../Components/header/Header'
import {toast} from "react-toastify"
import {useSelector,useDispatch} from "react-redux"
import {useParams,useNavigate} from "react-router-dom"
import { getSingleDepartement, updateDepartement } from '../../../redux/slice/departementSlice'
function DepartementEdit() {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const {id}=useParams()
    console.log(id)
    const [departement, setDepartement] = useState({
        name: "",
    });
    useEffect(() => {
        dispatch(getSingleDepartement(id)).then((res)=>{
            setDepartement(res.payload)
        })
    }, [dispatch,id]);
    const { departements, loading } = useSelector((state) => state.departementReducer);
    console.log(departements)
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(departement)
        const response=await dispatch(updateDepartement(departement))
        if(response.type==="departement/updateDepartement/fulfilled"){
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

export default DepartementEdit
