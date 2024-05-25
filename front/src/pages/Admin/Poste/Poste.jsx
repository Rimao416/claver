import { useEffect } from "react";
import Header from "../../../Components/header/Header";
import Navbar from "../../../Components/navbar/Navbar"
import SideBar from "../../../Components/sidebar/SideBar"
import {useSelector,useDispatch} from "react-redux"
import TableLoader from "../../../Components/loaders/TableLoader";
import {Link} from "react-router-dom"
import { deletePoste, getAllPostes } from "../../../redux/slice/posteSlice";
function Poste() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllPostes());
    }, [dispatch]);
    const { postes, loading } = useSelector((state) => state.posteReducer);
    console.log(postes)
    const handleDelete =async (id) => {
        const message = "Voulez-vous vraiment supprimer ?";
        const confirmed = window.confirm(message);
        if (confirmed) {
        //   onDelete();
        // dispatch action 
        dispatch(deletePoste(id));
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
             <Link to={"/admin/postes/create"}>
              <button
                onClick={() => {
                //   setDepid(0);
                //   setIsModalOpened(true);
                //   setType("AJOUTER_PROJET");
                }}
              >
                Créer un poste
              </button>
             </Link>
            </Header>
          </div>
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Nom</th>
                <th>Departement</th>

                <th>Action</th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {postes?.map((poste, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{poste.name}</td>
                    <td>{poste.department.name}</td>
                 
                    <td
                    
                      className="actions_users"
                    >
                        <Link to={`/admin/postes/edit/${poste._id}`}>
                        <button
                        >
                          Modifier
                        </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(poste._id)}
                         
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

export default Poste
