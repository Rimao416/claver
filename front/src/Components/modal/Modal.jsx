import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./modal.css";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
// import userApi from "../../services/userApi";
// import Ajouteruser from "../form/AjouterUser";

import { toast } from "react-toastify";
import Supprimeuser from "../form/Supprimeuser";
import { addUser, deleteUser } from "../../redux/slice/userSlice";
import { getAllPostes } from "../../redux/slice/posteSlice";

const Modal = ({ isOpened, onClose, Type, id }) => {
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
    poste: "",
  });
  const [title, setTitle] = useState("Ajouter un utilisateur");
  useEffect(() => {
    if (Type == "AJOUTER_UTILISATEUR" && id == 0) {
      setTitle("Ajouter un utilisateur");
    } else if (Type == "AJOUTER_UTILISATEUR" && id != 0) {
      setTitle("Modifier un utilisateur");
      // console.log(tables);
      // setUser({
      //   email:tables.email,
      //   nom:tables.firstName,
      //   prenom:tables.lastName,
      //   genre:tables.sexe,
      //   contact:tables.telephone
      // })
    } else if (Type == "SUPPRIMER_UTILISATEUR" && id != 0) {
      setTitle("Modifier un utilisateur");
    }
  }, [id]);

  useEffect(()=>{
    dispatch(getAllPostes())
  },[dispatch])
  const { postes, loading } = useSelector((state) => state.posteReducer);
  // const [errors, setError] = useState({
  //   Nom: "",
  // });
  console.log(postes)

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
      photo: `https://ui-avatars.com/api/?name=${user.name}+${user.lastName}`,
      // https://ui-avatars.com/api/?name=Elon+Musk
    });
    // setUser({
    //   ...user,
    //   [name]: value,
    // });
  };
  /*--------------------------------------------------------------MODIFICATION D'UN DEPARTEMENT------------------------------------*/
  const handleSubmit = async (event) => {
    toast.info("Traitement en cours");
    console.log(user)
    event.preventDefault();

     if(user.password != user.passwordConfirm){
      toast.warning("Les mots de passe ne sont pas identiques");
      return;
    }
    const response = await dispatch(addUser(user));
    console.log(response);
    if (response.payload.status == "success") {
      toast.success("Enregistrement effectue avec succes");
      onClose();
    }
  };

  //------------------------------------------------------------SUPPRESSION D'UN DEPARTEMENT-------------------------------------------------
  const onRemove = async () => {
    console.log("La vie qu'on mène");
    console.log(id);
    try {
      const response = await dispatch(deleteUser(id));
      console.log(response);
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
          <h5 className="modal-title">{title}</h5>
        </div>
        <div className="modal-body">
          {Type == "AJOUTER_UTILISATEUR" ? (
         

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
                    defaultValue={user.nom}
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
                    defaultValue={user.prenom}
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
                  {/* {id != 0 && <p style={{fontSize:"15px"}}>Le genre actuel {tables.sexe}</p> } */}
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
                    // defaultValue={tables.telephone}
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
                    // defaultValue={tables.adresse}
                    onChange={handleChange}
                  />
                  {/* {errors.lastName && (
                      <p className="error-input">{errors.lastName}</p>
                    )} */}
                </div>
              </div>
              {id == 0 && (
                <div className="form-grap">
                  <div className="form-group">
                    <label htmlFor="password" className="label-input">
                      Mot de passe de l&apos;employé
                    </label>
                    <input
                      // className={errors.firstName && "is-invalid"}
                      type="password"
                      placeholder="ex. +21656609671"
                      name="password"
                      defaultValue={user.password}
                      onChange={handleChange}
                    />
                    {/* {errors.firstName && (
                  <p className="error-input">{errors.firstName}</p>
                )} */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom" className="label-input">
                      Confirmez le mot de passe
                    </label>
                    <input
                      type="password"
                      placeholder="ex. Ennasr Res La coupole"
                      // className={errors.lastName && "is-invalid"}
                      name="passwordConfirm"
                      defaultValue={user.passwordConfirm}
                      onChange={handleChange}
                    />
                    {/* {errors.lastName && (
                      <p className="error-input">{errors.lastName}</p>
                    )} */}
                  </div>
                </div>
              )}
              <div className="form-grap">
                <div className="form-group">
                  <label htmlFor="password" className="label-input">
                    Date d&apos;anniversaire
                  </label>
                  <input
                    required
                    // className={errors.firstName && "is-invalid"}
                    type="date"
                    name="date_naissance"
                    // defaultValue={tables.dateAnniversaire}

                    onChange={handleChange}
                  />
                  {/* {id != 0 && <p style={{fontSize:"15px"}}>l&apos;anniversaire actuel {tables.dateAnniversaire}</p> } */}

                  {/* {errors.firstName && (
                  <p className="error-input">{errors.firstName}</p>
                )} */}
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="label-input">
                    Choisissez le poste
                  </label>
                  <select name="poste" id="" onChange={handleChange}>
                    <option value="-----">Choisissez le poste</option>
                    {postes.map((poste) => (
                      <option key={poste.id} value={poste._id}>
                        {poste?.name}
                      </option>
                    ))}
                  </select>
                  {/* {id != 0 && <p style={{fontSize:"15px"}}>l&apos;anniversaire actuel {tables.dateAnniversaire}</p> } */}

                  {/* {errors.firstName && (
                  <p className="error-input">{errors.firstName}</p>
                )} */}
                </div>
              </div>
              <button type="submit">{id === 0 ? "Envoyer" : "Modifier"}</button>
            </form>
          ) : (
            // <Supprimerdep onClose={onClose} onRemove={onRemove} />
            // <>
            //   <h6>Voulez vous réellement supprimer cet élément</h6>
            //   <div className="form-flex-button">
            //     <button className="btn-info" onClick={() => onClose()}>
            //       Annuler
            //     </button>
            //     <button className="btn-danger" onClick={() => onRemove()}>
            //       Supprimer
            //     </button>
            //   </div>
            // </>
            <Supprimeuser onClose={onClose} onRemove={onRemove} />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default Modal;
