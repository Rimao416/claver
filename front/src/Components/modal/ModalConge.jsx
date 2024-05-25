import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import AjouterDemande from "../form/AjouterDemande";
import SupprimerDemande from "../form/SupprimerDemande";
import {
  createConge,
  deleteConge,
  updateConge,
} from "../../redux/slice/congeSlice";
import { useSelector } from "react-redux";
function ModalConge({ isOpened, onClose, Type, id }) {
  const { conges, loading } = useSelector((state) => state.congeReducer);
  const dispatch = useDispatch();
  const [conge, setConge] = useState({
    debutConge: "",
    finConge: "",
    raison: "",
    explication: "",
    statut: "EN ATTENTE",
  });

  useEffect(() => {
    if (id != 0) {
      conges.find((conge) => {
        if (conge._id == id) {
          console.log("Oui j'ai trouvé");
          setConge({
            debutConge: moment(conge.debutConge).format("YYYY-MM-DD"),
            finConge: moment(conge.finConge).format("YYYY-MM-DD"),
            raison: conge.raison,
            explication: conge.explication,
            statut: conge.statut,
          });
        }
      });
    }
  }, [id]);

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setConge({ ...conge, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id == 0) {
      const response = await dispatch(createConge(conge));
      if (response.type === "conge/createConge/fulfilled") {
        toast.success("Demande effectuee avec succes");
        onClose();
      }
    } else {
      const response = await dispatch(updateConge({ ...conge, _id: id }));
      if (response.type === "conge/updateConge/fulfilled") {
        toast.success("Demande effectuee avec succes");
        onClose();
        window.location.reload();
      }
    }

    // try {
    //   if (id != 0) {
    //     const response = await axios.put(
    //       "http://localhost:8000/api/conges/" + id,
    //       conge
    //     );
    //     setConge({
    //       debutConge: "",
    //       finConge: "",
    //       raison: "",
    //       explication:""
    //     });
    //     tables.map((t) => {
    //       if (t.id == id) {
    //         t.debutConge = response.data.debutConge;
    //         t.finConge = response.data.finConge;
    //         t.raison = response.data.raison;
    //         t.explication=response.data.explication
    //       }
    //     });

    //     setDepid(0);
    //     onClose();
    //     toast.info("Modification effectuée avec Succès");
    //   } else {
    //     console.log(conge);

    //     const data = await axios
    //       .post("http://localhost:8000/api/conges", conge)
    //       .then((response) => response.data);
    //     tables.push({
    //       debutConge: conge.debutConge,
    //       finConge: conge.finConge,
    //       raison: data.raison,
    //       explication:data.explication,
    //       statut: "EN ATTENTE",
    //     });
    //     setConge({
    //       debutConge: "",
    //       finConge: "",
    //       raison: "",
    //       explication:""
    //     });
    //     setDepid(0);
    //     toast.success(
    //       "Demande de congé en attente, vous recevrez une réponse d'ici peu"
    //     );
    //     onClose();
    //   }
    // } catch (error) {
    //   // toast.error("Erreur lors de la demande de congé");
    //   //   console.log(error.response);
    // }
  };
  const onRemove = async (event) => {
    try {
      const response = await dispatch(deleteConge(id));

      if (response.type === "conge/deleteConge/fulfilled") {
        toast.success("Suppression avec Succès");
        onClose();
      }
      // setPoste({ designation: "" });
    } catch (error) {
      console.log("erreur");
    }
  };

  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
              setDepid(0);
              setConge({
                debutConge: "",
                finConge: "",
                raison: "",
                explication: "",
              });
            }}
          />
        </span>
        <div className="modal-header">
          <h5 className="modal-title">Demande de congé</h5>
        </div>
        <div className="modal-body">
          {Type == "AJOUTER_DEMANDE" ? (
            <AjouterDemande
              handleSubmit={handleSubmit}
              conge={conge}
              handleChange={handleChange}
              id={id}
            />
          ) : (
            <SupprimerDemande onClose={onClose} onRemove={onRemove} />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default ModalConge;
