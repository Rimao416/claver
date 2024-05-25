import { useEffect } from "react";
import Header from "../../../Components/header/Header";
import Navbar from "../../../Components/navbar/Navbar"
import SideBar from "../../../Components/sidebar/SideBar"
import {useSelector,useDispatch} from "react-redux"
import { deleteDepartement, getAllDepartements } from "../../../redux/slice/departementSlice";
import TableLoader from "../../../Components/loaders/TableLoader";
import {Link} from "react-router-dom"
function Departement() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllDepartements());
    }, [dispatch]);
    const { departements, loading } = useSelector((state) => state.departementReducer);
    console.log(departements)
    const handleDelete =async (id) => {
        const message = "Voulez-vous vraiment supprimer ?";
        const confirmed = window.confirm(message);
        if (confirmed) {
        //   onDelete();
        // dispatch action 
        dispatch(deleteDepartement(id));
        window.location.reload();
        }
      };
  return (
    <div className="projetadmin flex_main color_main">
      <SideBar/>
      <div className="projet main_details">
            <Navbar/>
            <div className="projet_main main_padding">
            <Header title="Gestion des départements">
             <Link to={"/admin/departements/create"}>
              <button
                onClick={() => {
                //   setDepid(0);
                //   setIsModalOpened(true);
                //   setType("AJOUTER_PROJET");
                }}
              >
                Créer un département
              </button>
             </Link>
            </Header>
          </div>
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Nom</th>

                <th>Action</th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {departements.map((departement, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{departement.name}</td>
                 
                    <td
                    
                      className="actions_users"
                    >
                        <Link to={`/admin/departements/edit/${departement._id}`}>
                        <button
                        >
                          Modifier
                        </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(departement._id)}
                         
                        >
                          Supprimer
                        </button>
                  
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {loading && <TableLoader />}
      </div>
    </div>
  )
}

export default Departement
