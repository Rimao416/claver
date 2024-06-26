import { useState, useEffect } from "react";
import Header from "../../../Components/header/Header";
import Navbar from "../../../Components/navbar/Navbar";
import SideBar from "../../../Components/sidebar/SideBar";
import "./conge.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import TableLoader from "../../../Components/loaders/TableLoader";
import ModalConge from "../../../Components/modal/ModalConge";
import { getMyConge } from "../../../redux/slice/congeSlice";

function Conge() {
  const dispatch = useDispatch();
  const { conges, loading } = useSelector((state) => state.congeReducer);
  console.log(conges)
  const [isModalOpened, setIsModalOpened] = useState(false);
  useEffect(() => {
    dispatch(getMyConge());
  }, [dispatch]);
  const [type, setType] = useState("");
  const [depid, setDepid] = useState(0);
  // const [conges, setConges] = useState([]);

  return (
    <>
      <div className="congeadmin flex_main color_main">
        <SideBar />
        <div className="conge main_details">
          <Navbar />
          <div className="conge_main main_padding">
            <Header title="Gestion des conges">
              <button
                onClick={() => {
                  setDepid(0);
                  setIsModalOpened(true);
                  setType("AJOUTER_DEMANDE");
                }}
              >
                Demander un congé
              </button>
            </Header>
          </div>
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Date de Congé</th>
                <th>Raison</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {conges.map((conge, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {" "}
                      {moment(conge.debutConge).format("DD/MM/YYYY")} au{" "}
                      {moment(conge.finConge).format("DD/MM/YYYY")}
                    </td>
                    <td>{conge.raison}</td>
                    <td>{conge.statut}</td>
                    <td className="actions_users">
                      <button
                        onClick={() => {
                          setDepid(conge._id);
                          setIsModalOpened(true);
                          setType("AJOUTER_DEMANDE");
                        }}
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => {
                          setIsModalOpened(true);
                          setDepid(conge._id);
                          setType("SUPPRIMER_CONGE");
                        }}
                        id={conge._id}
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
      <ModalConge
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        Type={type}
        id={depid}
      />
    </>
  );
}

export default Conge;
