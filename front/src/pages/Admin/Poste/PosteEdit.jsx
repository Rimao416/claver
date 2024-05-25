import React, { useEffect, useState } from 'react'
import SideBar from '../../../Components/sidebar/SideBar'
import Navbar from '../../../Components/navbar/Navbar'
import Header from '../../../Components/header/Header'
import {toast} from "react-toastify"
import {useSelector,useDispatch} from "react-redux"
import {useParams,useNavigate} from "react-router-dom"
import { getAllDepartements, getSingleDepartement, updateDepartement } from '../../../redux/slice/departementSlice'
import { getSinglePoste, updatePoste } from '../../../redux/slice/posteSlice'
function PosteEdit() {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const {id}=useParams()
    console.log(id)
    const [poste, setPoste] = useState({
        name: "",
        departement:""
    });
    useEffect(() => {
        dispatch(getSinglePoste(id)).then((res)=>{
            setPoste(res.payload)
            // console.log(res.payload)
        })
    }, [dispatch,id]);
    useEffect(() => {
        dispatch(getAllDepartements())
    }, [dispatch,id]);
    const { departements, loading } = useSelector((state) => state.departementReducer);
    console.log(departements)
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await dispatch(updatePoste(poste))
        console.log(response)
        if(response.type==="poste/updatePoste/fulfilled"){
            toast.success("Poste modifié avec succès")
            // navigate('/admin/departements')
            window.location.replace('/admin/postes')
    
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
             Nom du poste
           </label>
           <input
             className={"is-invalid"}
             type="text"
             placeholder="ex. "
             name="name"
             onChange={(e) => setPoste({ ...poste, name: e.target.value })}
            //  onChange={(e) => setDepartement({ ...departement, name: e.target.value })}
            //  value={poste.name}
             defaultValue={poste.name}
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
                {/* <p>Poste actuel : {departements?.find((departement) => departement._id === poste.departement)?.name}</p> */}

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

export default PosteEdit
