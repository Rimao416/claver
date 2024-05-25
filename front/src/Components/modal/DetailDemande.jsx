import React from "react";
import { BiX } from "react-icons/bi";
import { createPortal } from "react-dom";
import moment from "moment";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateConge } from "../../redux/slice/congeSlice";
const DetailDemande = ({ isOpened, onClose, user, setUser, demande }) => {
  const dispatch = useDispatch();
  console.log(user);
  if (!isOpened) {
    return null;
  }
  function buttonControl(value) {
    if (value == "ACCEPTE") {
      return (
        <>
          <button className="red" onClick={() => handleRefuse(user.id)}>
            Refuser
          </button>
          <button className="yellow" onClick={() => onClose()}>
            Annuler
          </button>
        </>
      );
    } else if (value == "EN ATTENTE") {
      return (
        <>
          <button className="green" onClick={() => handleAccept(user.id)}>
            Accepter
          </button>
          <button className="red" onClick={() => handleRefuse(user.id)}>
            Refuser
          </button>
          <button className="yellow" onClick={() => onClose()}>
            Annuler
          </button>
        </>
      );
    } else if ((value = "REJETEE")) {
      return (
        <>
          <button className="green" onClick={() => handleAccept(user.id)}>
            Accepter
          </button>
          <button className="yellow" onClick={() => onClose()}>
            Annuler
          </button>
        </>
      );
    }
  }
  const handleAccept = async (id) => {
    const response = await dispatch(
      updateConge({ statut: "ACCEPTE", _id: id })
    );
    if (response.type === "conge/updateConge/fulfilled") {
      toast.success("Demande acceptée avec succes");
      onClose();
      window.location.reload()
    }
  };
  const handleRefuse = async (id) => {
    
    const response = await dispatch(
      updateConge({ statut: "REJETEE", _id: id })
    );
    if (response.type === "conge/updateConge/fulfilled") {
      toast.success("Demande modifiée avec succes");
      onClose();
      window.location.reload()
    }
    
  };
  return createPortal(
    <div className="overlay">
      <div className="modal w-500">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
            }}
          />
        </span>
        <div className="modal-header">
          <h5 className="modal-title">
            <h3>Demande de Congé</h3>
          </h5>
        </div>
        <div className="modal-body demande">
          <div className="demande">
            <div className="header">
              <img src={user.profile} alt="" width="90" />
              <h5>{user.first_name + "|" + user.last_name}</h5>
              <hr />
            </div>
            <div className="body">
              <div className="flex-dialog">
                <h6>Demande allant </h6>
                <h6>
                  Du{" "}
                  {moment(user.dateDebut).format("DD-MM-YYYY") +
                    " au " +
                    moment(user.dateFin).format("DD-MM-YYYY")}
                </h6>
              </div>
              <hr />
              <div className="flex-dialog">
                <h6>Motif</h6>
                <h6>{user.raison}</h6>
              </div>
              <hr />
              {user.explication.length > 0 && (
                <>
                  <div className="flex-dialog">
                    <h6>Details</h6>
                    <h6>{user.explication}</h6>
                  </div>
                  <hr />
                </>
              )}
              <div className="button-control">{buttonControl(user.statut)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default DetailDemande;
