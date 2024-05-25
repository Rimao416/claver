import { useState } from "react";
import Poste from "../../assets/img/images.jpeg";
import "./login.css";
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"

import { toast } from "react-toastify";
import { login } from "../../redux/slice/authSlice";

function Login() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [credentials, setCredentails] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setCredentails({ ...credentials, [name]: value });
  };
  const handleSubmit = async (event) => {
    
    // console.log(credentials);
    event.preventDefault();
    try {
      const response=await dispatch(login(credentials))
      console.log(response.payload)
      if(response.type==="auth/login/fulfilled"){
        if(response.payload.data.user.role==="admin"){
          navigate("/admin/user")
        }else{
          navigate("/profile")
        }
      }
      // const token = window.localStorage.getItem("authToken");
      // const decodeToken = jwtDecode(token).roles;
      // if (decodeToken.includes("ROLE_ADMIN")) {
      //   history.replace("/admin/user");
      // } else if (decodeToken.includes("ROLE_USER")) {
      //   history.replace("profile");
      // } else {
      //   <h1>ERREUR 403</h1>
      //   // <p>Erreur</p>
      //   // history.replace("/agent/creation");
      // }
      // console.log(decodeToken)
      // if(decodeToken=="ROLE_USER"){

      // }else{

      // }
    } catch (error) {
      console.log(error.response);
      toast.error("Adresse Mail ou Mot de passe Invalide");
    }
  };
  return (
    <>
      <div className="login_main"></div>
      <div className="clipath">
        {/* <img src="https://images.pexels.com/photos/12815872/pexels-photo-12815872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
         */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login">
          <div className="wrapper">
            <img src={Poste} alt="" className="logo_poste" />
            <div className="connexion_wrapper">
              <div className="sub_wrapper">
                <label htmlFor="username">Entrez votre adresse</label>
                <input
                  defaultValue={credentials.username}
                  onChange={handleChange}
                  className="input100"
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Entrer votre mail"
                />
              </div>
              <div className="sub_wrapper">
                <label htmlFor="password">Entrez votre mot de passe</label>
                <input
                  defaultValue={credentials.password}
                  onChange={handleChange}
                  className="input100"
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="Tapez votre mot de passe"
                />
              </div>
              <button type="submit">Connexion</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
