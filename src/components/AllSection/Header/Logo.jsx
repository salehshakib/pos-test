import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="font-bold hover:cursor-pointer primary-text"
      onClick={() => navigate("/dashboard")}
    >
      POS Inventory
    </div>
  );
};

export default Logo;
