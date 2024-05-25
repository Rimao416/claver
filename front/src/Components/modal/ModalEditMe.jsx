import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./modal.css";
import { BiX } from "react-icons/bi";
import { useDispatch } from "react-redux";
// import userApi from "../../services/userApi";
// import Ajouteruser from "../form/AjouterUser";
import {useNavigate} from "react-router-dom"

import { toast } from "react-toastify";
import Supprimeuser from "../form/Supprimeuser";
import { addUser, updateMe, updateUser } from "../../redux/slice/userSlice";

const ModalEditMe = ({ isOpened, onClose, table, Type }) => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    date_naissance: "",
    first_name: "",
    last_name: "",
    sexe: "",
    telephone: "",
  });

  useEffect(() => {
    setUser(table);
  }, [table]);

  // const [errors, setError] = useState({
  //   Nom: "",
  // });

  if (!isOpened) {
    return null;
  }
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setUser({ ...user, [name]: value });
    setUser({
      ...user,
      [name]: value,
      photo: `https://avatars.dicebear.com/api/initials/${
        user.nom + " " + user.prenom
      }.svg`,
    });
    // setUser({
    //   ...user,
    //   [name]: value,
    // });
  };
  /*--------------------------------------------------------------MODIFICATION D'UN DEPARTEMENT------------------------------------*/
  const handleSubmit = async (event) => {
    // toast.info("Traitement en cours");
    event.preventDefault();

    const response = await dispatch(updateMe(user));
    console.log(response);
    if (response.type=== "user/updateUser/fulfilled") {
      toast.success("Enregistrement effectue avec succes");
      onClose();
      navigate("/admin/user")
    }
  };

  //------------------------------------------------------------SUPPRESSION D'UN DEPARTEMENT-------------------------------------------------
  const onRemove = async (id) => {
    console.log(id);
    // const originalDepartements=[...departement]
    try {
      // await userApi.delete(id);
      // toast.success("La suppression est un succès");
      // setTables(tables.filter((table) => table.id != id));
    } catch (error) {
      toast.warning("Erreur de suppression");
    }
    onClose();
    // setDepid(0);
    // setDepartement({ Nom: "" });
  };
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
              // setDepid(0);
              // setDepartement({ Nom: "" });
            }}
          />
        </span>

        <div className="modal-header">
          <h5 className="modal-title">MODIFIER UN UTILISATEUR</h5>
        </div>
        <div className="modal-body">
          {Type == "MODIFIER_UTILISATEUR" ? (
            // <Ajouteruser
            //   handleSubmit={handleSubmit}
            //   errors={errors}
            //   user={user}
            //   handleChange={handleChange}
            //   id={id}
            // />

            <form className="formulaire" onSubmit={handleSubmit}>
              <div className="form-grap">
                <div className="form-group">
                  <label htmlFor="email" className="label-input">
                    Email de l&apos;employé
                  </label>
                  <input
                    className={"is-invalid"}
                    type="email"
                    placeholder="ex. Exaucé@gmail.com"
                    name="email"
                    defaultValue={user.email}
                    onChange={handleChange}
                  />
                  {/* {errors.firstName && (
                  <p className="error-input">{errors.firstName}</p>
                )} */}
                </div>
                <div className="form-group">
                  <label htmlFor="nom" className="label-input">
                    Nom de l&apos;employé
                  </label>
                  <input
                    type="text"
                    placeholder="ex. Omari"
                    // className={errors.lastName && "is-invalid"}
                    name="first_name"
                    defaultValue={user.first_name}
                    onChange={handleChange}
                  />
                  {/* {errors.lastName && (
                      <p className="error-input">{errors.lastName}</p>
                    )} */}
                </div>
              </div>
              <div className="form-grap">
                <div className="form-group">
                  <label htmlFor="prenom" className="label-input">
                    Prenom de l&apos;employé
                  </label>
                  <input
                    // className={errors.firstName && "is-invalid"}
                    type="text"
                    placeholder="ex. Mariem"
                    name="last_name"
                    defaultValue={user.last_name}
                    onChange={handleChange}
                  />
                  {/* {errors.firstName && (
                  <p className="error-input">{errors.firstName}</p>
                )} */}
                </div>
                <div className="form-group">
                  <label htmlFor="genre" className="label-input">
                    Genre
                  </label>
                  <select name="sexe" id="" onChange={handleChange}>
                    <option value="-----">Choisissez un genre</option>
                    <option value="homme">Masculin</option>
                    <option value="femme">Féminin</option>
                  </select>

                  <p style={{ fontSize: "15px" }}>
                    Le genre actuel {user.sexe}
                  </p>
                </div>
              </div>
              <div className="form-grap">
                <div className="form-group">
                  <label htmlFor="email" className="label-input">
                    Contact de l&apos;employé
                  </label>
                  <input
                    // className={errors.firstName && "is-invalid"}
                    type="text"
                    placeholder="ex. +21656609671"
                    name="telephone"
                    defaultValue={user.telephone}
                    onChange={handleChange}
                  />
                  {/* {errors.firstName && (
                  <p className="error-input">{errors.firstName}</p>
                )} */}
                </div>
                <div className="form-group">
                  <label htmlFor="nom" className="label-input">
                    Adresse de l&apos;employé
                  </label>
                  <input
                    type="text"
                    placeholder="ex. Ennasr Res La coupole"
                    // className={errors.lastName && "is-invalid"}
                    name="adresse"
                    defaultValue={user.adresse}
                    onChange={handleChange}
                  />
                  {/* {errors.lastName && (
                      <p className="error-input">{errors.lastName}</p>
                    )} */}
                </div>
              </div>

              <div className="form-grap">
                <div className="form-group">
                  <label htmlFor="password" className="label-input">
                    Date d&apos;anniversaire
                  </label>
                  <input
                    required
                    // className={errors.firstName && "is-invalid"}
                    type="date"
                    name="dateAnniversaire"
                    // defaultValue={tables.dateAnniversaire}

                    onChange={handleChange}
                  />
                  <p style={{ fontSize: "15px" }}>
                    Date de naissance {user.date_naissance}
                  </p>

                  {/* {errors.firstName && (
                  <p className="error-input">{errors.firstName}</p>
                )} */}
                </div>
              </div>
              <button type="submit">MODIFIER</button>
            </form>
          ) : (
          
            <Supprimeuser onClose={onClose} onRemove={onRemove} />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default ModalEditMe;
