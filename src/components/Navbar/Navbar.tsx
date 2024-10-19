import { Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../pages/Login/authSlice";
const Navbar = () => {
  const { username } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const hadleLogOut = () => {
    dispatch(logout());
  };

  return (
    <nav className="navigation">
      <Link to={"/"}>
        <button>Home</button>
      </Link>

      {username && (
        <Link to={"/profile"}>
          <button>Profile</button>
        </Link>
      )}

      {username ? (
        <button onClick={hadleLogOut}>Logout</button>
      ) : (
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
