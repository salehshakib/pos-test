import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/services/auth/authSlice";

const AdminDashboard = () => {
  const user = useSelector(useCurrentUser);

  console.log(user);
  return (
    <div className=" h-full">
      <div className="py-6 text-4xl text-center primary-text font-semibold">
        Dashboard Under Construction :(
      </div>
    </div>
  );
};

export default AdminDashboard;
