import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/Vistock-removebg-preview.png";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="font-bold hover:cursor-pointer primary-text flex justify-center items-center "
      onClick={() => navigate("/dashboard")}
    >
      <img src={logo} alt="" className="size-32" />
      {/* <p>POS Inventory</p> */}
    </div>
  );
};

export default Logo;
