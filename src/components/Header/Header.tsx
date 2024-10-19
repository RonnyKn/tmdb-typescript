import { useSelector } from "react-redux";
import "./Header.css";
import { RootState } from "../../redux/store";

const Header = () => {
  const { username } = useSelector((state: RootState) => state.login);

  return (
    <header className="header">
      <span onClick={() => window.scroll(0, 0)}>🎬 THE MOVIE DB 🎥</span>
      {username && <p>-=Logged in as {username}=-</p>}
    </header>
  );
};
export default Header;
