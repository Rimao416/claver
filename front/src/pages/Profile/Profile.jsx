import { useState, useEffect } from "react";
import Header from "../../Components/header/Header";
import Navbar from "../../Components/navbar/Navbar";
import SideBar from "../../Components/sidebar/SideBar";

import GithubProfile from "../../Components/loaders/GithubLoader";
import "./profile.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalEdit from "../../Components/modal/ModalEdit";
function Profile() {
  const { id } = useParams();
  // const user=useSelector(state=>state.authReducer?.user?.data.user)
  const { users } = useSelector((state) => state.userReducer);

  const [loading, setLoading] = useState(true);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const [user, setUser] = useState(null);
  useEffect(() => {
    if (id) {
      users.find((user) => {
        if (user._id === id) {
          console.log(user);
          setUser(user);
        }
      });
    }
    setLoading(false);
  }, []);

  return (
    <>
      <div className="useradmin flex_main color_main">
        <SideBar />
        {!loading && (
          <div className="profile main_details">
            <Navbar />
            <div className="profile_main main_padding">
              <Header title="Profile">
                <button
                  onClick={() => {
                    setIsModalOpened(true);
                  }}
                >
                  Modifier
                </button>
              </Header>
              <div className="users_informations">
                <div className="left_info">
                  <ul>
                    <li>Personnelle</li>
                    <li>Congés</li>
                  </ul>

                  <h3>Informations Personnelles</h3>
                  <p>Toutes les informatiions vous concernant sont ici</p>

                  <div className="sub_infos">
                    <div className="left_sub">
                      <h5>Mail</h5>
                      <h5>Nom</h5>
                      <h5>Prenom</h5>
                      <h5>Genre</h5>
                      <h5>Adresse</h5>
                      <h5>Telephone</h5>
                      <h5>Date de naissance</h5>
                    </div>
                    <div className="right_sub">
                      <h5>{user?.email}</h5>
                      <h5>{user?.first_name.toString()}</h5>
                      <h5>{user?.last_name}</h5>
                      <h5>{user?.sexe}</h5>
                      <h5>{user?.adresse}</h5>
                      <h5>
                        {user?.telephone === null ? "08" : user.telephone}
                      </h5>
                      <h5>{user?.date_naissance}</h5>
                    </div>
                  </div>
                </div>
                <div className="right_info">
                  <img src={user?.photo} alt="" />
                  <p>Utilisateur</p>
                  <h4>{user?.first_name + " " + user?.last_name}</h4>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading && <GithubProfile />}
      </div>
      <ModalEdit
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        table={user}
        Type="MODIFIER_UTILISATEUR"
      />
    </>
  );
}

export default Profile;
