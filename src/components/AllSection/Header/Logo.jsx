import { useNavigate } from "react-router-dom";
import logo from "../../../assets/data/defaultLogo";
import { useGetGeneralSettingsQuery } from "../../../redux/services/settings/generalSettings/generalSettingsApi";

const Logo = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetGeneralSettingsQuery({});

  console.log(data);

  return (
    <div
      className="font-bold hover:cursor-pointer primary-text flex justify-center items-center "
      onClick={() => navigate("/dashboard")}
    >
      <img src={logo} alt="" className="w-32 h-16 object-cover" />
    </div>
  );
};

export default Logo;
