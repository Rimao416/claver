import axios from "axios";
import { useState, useEffect } from "react";
// import Header from "../../../Components/header/Header";
import Modal from "../../../Components/modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import TableLoader from "../../../Components/loaders/TableLoader";
import { Link } from "react-router-dom";
import Navbar from "../../../Components/navbar/Navbar";
import SideBar from "../../../Components/sidebar/SideBar";
import Header from "../../../Components/header/Header";
import "./useradmin.css";
import { getAllUsers } from "../../../redux/slice/userSlice";
function UserAdmin() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


  const fetchEmployes = async () => {
    try {
      const data = await axios
        .get("http://localhost:8000/api/users")
        .then((response) => response.data);
      setUsers(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      // console.log(error.response);
    }
  };
  useEffect(() => {
    fetchEmployes();
  }, []);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [depid, setDepid] = useState(0);
  const [type, setType] = useState("");
  return (
    <>
      <div className="useradmin flex_main color_main">
        <SideBar />
        <div className="user main_details">
          <Navbar />
          <div className="user_main main_padding">
            <div className="users_headers">
              <Header title="Gestion des utilisateurs">
                <button
                  onClick={() => {
                    setDepid(0);
                    setIsModalOpened(true);
                    setType("AJOUTER_UTILISATEUR");
                  }}
                >
                  Ajouter des utilisateurs
                </button>
              </Header>

              {/*  */}
            </div>

            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Genre</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              {!loading && (
                <tbody>
                  {users?.map((user) => (
                    <tr key={user.id}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.sexe}</td>
                      <td>{user.telephone ? user.telephone : "-------"}</td>
                      <td>{user.email}</td>
                      <td className="actions_users">
                        <button>
                          <Link to={"/profile/" + user._id}>Consulter</Link>
                        </button>
                        <button
                          onClick={() => {
                            setIsModalOpened(true);
                            setDepid(user._id);
                            setType("SUPPRIMER_UTILISATEUR");
                          }}
                          id={user._id}
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
      </div>
      <Modal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        Type={type}
        id={depid}
      />
    </>
  );
}

export default UserAdmin;
