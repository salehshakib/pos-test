import { FaBuilding, FaUsers } from "react-icons/fa";
import { MdPayment, MdTimeToLeave } from "react-icons/md";
import Department from "../../pages/Dashboard/Hrm/Department/Department";
import Employee from "../../pages/Dashboard/Hrm/Employee/Employee";
import Hrm from "../../pages/Dashboard/Hrm/Hrm";

export const hrmPaths = [
  {
    name: "Department",
    path: "department",
    icon: FaBuilding,
    element: <Department />,
  },
  {
    name: "Employee",
    path: "employee",
    icon: FaUsers,
    element: <Employee />,
  },
  {
    name: "Payroll",
    path: "payroll",
    icon: MdPayment,
    element: <Hrm />,
  },
  {
    name: "Holidays",
    path: "holidays",
    icon: MdTimeToLeave,
    element: <Hrm />,
  },
];
