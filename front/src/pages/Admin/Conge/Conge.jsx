import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import "./conge.css";
import { Link } from "react-router-dom";
import SideBar from "../../../Components/sidebar/SideBar";
import Navbar from "../../../Components/navbar/Navbar";
import Header from "../../../Components/header/Header";
import DetailDemande from "../../../Components/modal/DetailDemande";
import TableLoader from "../../../Components/loaders/TableLoader";
import { useDispatch,useSelector } from "react-redux";
import { getAllConge } from "../../../redux/slice/congeSlice";
const Conge = () => {
  const dispatch = useDispatch();
  const { conges,loading } = useSelector((state) => state.congeReducer);
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    debutConge: "",
    finConge: "",
    raison: "",
    explication: "",
  });
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [search, setSearch] = useState("");
  function status(value) {
    if (value == "EN ATTENTE") {
      return "attente";
    } else if (value == "ACCEPTE") {
      return "accepte";
    } else if (value == "REJETEE") {
      return "refus";
    }
  }
  let i = 1;
  const [demande, setDemande] = useState([]);
  const handleSearch = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    console.log(search);
  };

  useEffect(() => {
    dispatch(getAllConge());
  }, [dispatch]);
  console.log(conges)
  // const filteredConge = demande.filter(
  //   (p) =>
  //     p.user.firstName.toLowerCase().includes(search.toLowerCase())||
  //     p.user.lastName.toLowerCase().includes(search.toLowerCase())||
  //     p.status.toLowerCase().includes(search.toLowerCase())
  // );
  return (
    <>
      <div className="congeadmin flex_main color_main">
        <SideBar />
        <div className="conge main_details">
          <Navbar />
          <div className="conge_main main_padding">
            <Header title="Gestion des conges"></Header>
          </div>
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Employé</th>
                <th>Date de Congé</th>
                <th>Raison</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {conges.map((conge, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{conge.user.first_name + " " + conge.user.last_name}</td>
                    <td>
                      {" "}
                      {moment(conge.debutConge).format("DD/MM/YYYY")} au{" "}
                      {moment(conge.finConge).format("DD/MM/YYYY")}
                    </td>
                    <td>{conge.raison}</td>
                    <td>{conge.statut}</td>
                    <td
                      onClick={() => {
                        setIsModalOpened(true);
                      }}
                      className="actions_users"
                    >
                      <button
                        onClick={() =>
                          setUser({
                            first_name: conge.user.first_name,
                            last_name: conge.user.last_name,
                            debutConge: conge.debutConge,
                            finConge: conge.finConge,
                            raison: conge.raison,
                            statut: conge.statut,
                            id: conge._id,
                            profile: conge.user.photo,
                            explication: conge.explication,
                          })
                        }
                      >
                        Modifier
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

      <DetailDemande
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        user={user}
        setUser={setUser}
        demande={demande}
      />
    </>
  );
};

export default Conge;
