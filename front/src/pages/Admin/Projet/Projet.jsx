import moment from "moment";
import { toast } from "react-toastify";
import Header from "../../../Components/header/Header";
import TableLoader from "../../../Components/loaders/TableLoader";
import { useSelector, useDispatch } from "react-redux";
// import ActionProjet from "../../../Components/modal/ActionProjet";
import ProjetModal from "../../../Components/modal/ProjetModal";
import Navbar from "../../../Components/navbar/Navbar";
import SideBar from "../../../Components/sidebar/SideBar";
import { useEffect, useState } from "react";
import {
  getAllProjects,
  updateProject,
} from "../../../redux/slice/projetSlice";
import { getAllUsers } from "../../../redux/slice/userSlice";
function Projet() {
  const dispatch = useDispatch();
  const { projets, loading } = useSelector((state) => state.projetReducer);
  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);
  const { users } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  console.log(projets);
  const handleAnnuler = async (id) => {
    try {
      console.log(id);
      await dispatch(
        updateProject({
          _id: id,
          statut: "ANNULE",
        })
      );
      window.location.reload();
      toast.success("Changement effectué");
      // toast.success(id);
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };
  const handleTerminer = async (id) => {
    try {
      console.log(id);
      await dispatch(
        updateProject({
          _id: id,
          statut: "TERMINE",
        })
      );
      window.location.reload();
      toast.success("Changement effectué");
      // toast.success(id);
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };
  const handleCours = async (id) => {
    try {
      console.log(id);
      // const data = projetApi.actionProjet(id,"EN COURS");
      await dispatch(
        updateProject({
          _id: id,
          statut: "EN COURS",
        })
      );
      window.location.reload();
      window.location.reload();
      toast.success("Changement effectué");
      // toast.success(id);
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };

  const [projetaction, setProjectaction] = useState({
    nom: "",
    dateDebut: "",
    dateSoumission: "",
    statut: "",
    id: "",
  });

  const [projet, setProjet] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isModalOpenedProjet, setIsModalOpenedProjet] = useState(false);
  const [depid, setDepid] = useState(0);
  const [type, setType] = useState("");

  let i = 1;
  return (
    <>
      <div className="projetadmin flex_main color_main">
        <SideBar />
        <div className="projet main_details">
          <Navbar />
          <div className="projet_main main_padding">
            <Header title="Gestion des projets">
              <button
                onClick={() => {
                  setDepid(0);
                  setIsModalOpened(true);
                  setType("AJOUTER_PROJET");
                }}
              >
                Assigner un projet
              </button>
            </Header>
          </div>
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Projet</th>
                <th>Date de Debut - Soumission</th>
                <th>Employés</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {projets?.map((proj, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{proj.nom}</td>
                    <td>
                      {" "}
                      {moment(proj.dateDebut).format("DD/MM/YYYY")} au{" "}
                      {moment(proj.dateSoumission).format("DD/MM/YYYY")}
                    </td>
                    <td>
                      {proj.user.map((u) => u.first_name + " " + u.last_name)}
                    </td>
                    <td>{proj.statut}</td>
                    <td
                      // onClick={() => {
                      //   setIsModalOpenedProjet(true);
                      // }}
                      className="actions_users"
                    >
                      {proj.statut === "EN COURS" ? (
                        <>
                          {" "}
                          <button onClick={() => handleTerminer(proj._id)}>
                            Terminer le projet
                          </button>
                          <button onClick={() => handleAnnuler(proj._id)}>
                            Annuler le projet
                          </button>
                        </>
                      ) : proj.statut === "ANNULE" ? (
                        <>
                          <button onClick={() => handleTerminer(proj._id)}>
                            Terminer le projet
                          </button>
                          <button onClick={() => handleCours(proj._id)}>
                            Mettre en cours
                          </button>
                        </>
                      ) : (
                        <button>Projet Terminé</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {loading && <TableLoader />}
        </div>
      </div>
      <ProjetModal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        Type={type}
        id={depid}
        tables={projet}
        setTables={setProjet}
        setDepid={setDepid}
        users={users}
      />
      {/*      <ActionProjet
        isOpenedProjet={isModalOpenedProjet}
        onCloseProjet={() => setIsModalOpenedProjet(false)}
      /> */}
    </>
  );
}

export default Projet;
