import {useSelector} from "react-redux"
import AdminSidebar from "./SideComponent/AdminSidebar";
import "./sidebar.css"
import UserSidebar from "./SideComponent/UserSidebar";
function SideBar() {
const user=useSelector(state=>state.authReducer?.user?.data.user)
console.log(user)
    const handleLogout = () => {
      localStorage.clear()
      window.location.href = "/"
    // authApi.logout();
    // setIsAuthenticated(false);
    // history.push("/login");
  };
  // const CheckRole = (role) => {
  //   console.log(role)
  //   if (role.includes("ROLE_ADMIN")) {
  //     return <AdminSidebar />;
  //   } else if (role.includes("ROLE_USER")) {
  //     return <UserSidebar />;
  //   }
  // };
  return (
    <div className="sidebar">
      <h4 className="sidebar_title">Time Université</h4>
      <hr />

      <ul>
        {user?.role==="admin" && <AdminSidebar/>}
        {user?.role==="personnel" && <UserSidebar/>}
      
        <li onClick={handleLogout} className="sidebarListItem">
          Me deconnecter
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
